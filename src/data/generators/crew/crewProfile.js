import { addDays, toIsoDate } from '../../../shared/utils/dates';
import {
  AIRLINES,
  ALLERGIES,
  BLOOD_TYPES,
  certificatesFor,
  CONDITIONS,
  CREW_CHANGE_AIRPORTS,
  FEMALE_FIRST_NAMES,
  LAST_NAMES,
  LETTERS,
  MALE_FIRST_NAMES,
  NATIONALITY_INFO,
  OFFICER_RANKS,
  PREVIOUS_VESSELS,
  RELATIONS,
  RESTRICTIONS,
  REVIEW_COMMENTS,
  reviewerFor,
} from './crewReference';

/*
 * Every function here draws from the same seeded `rng`, so the order of calls in
 * generateCrewProfile (and inside each function) decides the data. Keep it stable.
 */

const randomCode = (rng, length) => Array.from({ length }, () => rng.pick(LETTERS.split(''))).join('');
const randomPhone = (rng, dialCode) => `+${dialCode} ${rng.int(100, 999)} ${rng.int(100, 999)} ${rng.int(1000, 9999)}`;
/** "Ålesund" → "alesund", for email addresses. */
const asciiSlug = (value) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Cadets are young, masters and chief engineers senior, other officers mid-career. */
function generateAge(rng, rank) {
  if (rank === 'Deck Cadet') return rng.int(19, 24);
  if (rank === 'Master' || rank === 'Chief Engineer') return rng.int(42, 60);
  return OFFICER_RANKS.has(rank) ? rng.int(26, 48) : rng.int(21, 55);
}

/** Current (or planned) contract, then earlier ones walking back in time, on different vessels. */
function generateContracts(rng, member, vesselName) {
  const { rank, signOn, signOff, status } = member;
  const contracts = [{ id: 'c0', vessel: vesselName, rank, signOn, signOff, status: status === 'joining' ? 'planned' : 'current' }];

  let cursor = new Date(signOn);
  const formerVessels = [...PREVIOUS_VESSELS]; // drawn without replacement so names don't repeat
  const previousCount = rank === 'Deck Cadet' ? 1 : rng.int(2, 4);
  for (let i = 1; i <= previousCount; i += 1) {
    const end = addDays(cursor, -rng.int(60, 120));
    const start = addDays(end, -rng.int(4, 8) * 30);
    contracts.push({
      id: `c${i}`,
      vessel: formerVessels.splice(rng.int(0, formerVessels.length - 1), 1)[0],
      rank,
      signOn: toIsoDate(start),
      signOff: toIsoDate(end),
      status: 'completed',
    });
    cursor = start;
  }
  return contracts;
}

function generateTicket(rng, { id, type, from, to, departure, status }) {
  const airline = rng.pick(AIRLINES);
  return {
    id,
    type,
    airline: airline.name,
    flightNumber: `${airline.code} ${rng.int(100, 989)}`,
    from,
    to,
    departure,
    bookingRef: randomCode(rng, 6),
    status,
  };
}

/** Sign-off travel is booked once it's within 45 days; joiners don't have it booked yet. */
function signOffTicketStatus(member, referenceDate) {
  if (member.status === 'joining') return 'pending';
  return member.signOff <= toIsoDate(addDays(referenceDate, 45)) ? 'booked' : 'pending';
}

/** Flights to and from the vessel for the current contract and the last completed one. */
function generateTickets(rng, { member, previousContract, homeAirport, vesselId, referenceDate }) {
  const vesselAirport = CREW_CHANGE_AIRPORTS[vesselId] ?? 'SIN';
  const today = toIsoDate(referenceDate);
  const signOnTravel = toIsoDate(addDays(member.signOn, -1));
  const randomCrewChangeAirport = () => rng.pick(Object.values(CREW_CHANGE_AIRPORTS));

  return [
    generateTicket(rng, {
      id: 't1',
      type: 'Sign-on',
      from: homeAirport,
      to: vesselAirport,
      departure: signOnTravel,
      status: signOnTravel < today ? 'used' : 'booked',
    }),
    generateTicket(rng, {
      id: 't2',
      type: 'Sign-off',
      from: vesselAirport,
      to: homeAirport,
      departure: member.signOff,
      status: signOffTicketStatus(member, referenceDate),
    }),
    // The previous vessel's airport is drawn before the ticket itself.
    generateTicket(rng, {
      id: 't3',
      type: 'Sign-off',
      from: randomCrewChangeAirport(),
      to: homeAirport,
      departure: previousContract.signOff,
      status: 'used',
    }),
    generateTicket(rng, {
      id: 't4',
      type: 'Sign-on',
      from: homeAirport,
      to: randomCrewChangeAirport(),
      departure: toIsoDate(addDays(previousContract.signOn, -1)),
      status: 'used',
    }),
  ];
}

/** Seafarer medical: valid two years from the last exam; a few crew have restrictions or conditions. */
function generateMedical(rng, referenceDate) {
  const lastExam = addDays(referenceDate, -rng.int(30, 650));
  const isRestricted = rng.chance(0.1);
  const daysAgo = (min, max) => toIsoDate(addDays(referenceDate, -rng.int(min, max)));
  return {
    fitness: isRestricted ? 'restricted' : 'fit',
    restrictions: isRestricted ? [rng.pick(RESTRICTIONS)] : [],
    lastExam: toIsoDate(lastExam),
    nextExam: toIsoDate(addDays(lastExam, 730)),
    examinedBy: `Dr. ${rng.pick(['A.', 'M.', 'S.', 'K.'])} ${rng.pick(LAST_NAMES)}`,
    bloodType: rng.pick(BLOOD_TYPES),
    heightCm: rng.int(158, 192),
    weightKg: rng.int(55, 102),
    allergies: rng.chance(0.2) ? [rng.pick(ALLERGIES)] : [],
    conditions: rng.chance(0.15) ? [rng.pick(CONDITIONS)] : [],
    vaccinations: [
      { name: 'Yellow fever', date: daysAgo(400, 3000) },
      { name: 'Tetanus / diphtheria', date: daysAgo(100, 2500) },
      { name: 'Hepatitis A & B', date: daysAgo(300, 3000) },
      { name: 'Influenza', date: daysAgo(20, 400) },
    ],
  };
}

/** STCW and flag certificates for the rank, valid five years; some near expiry or expired. */
function generateCertificates(rng, { rank, department, nationality }, referenceDate) {
  return certificatesFor(rank, department).map((name, index) => {
    const issued = addDays(referenceDate, -rng.int(60, 1880));
    return {
      id: `cert-${index + 1}`,
      name,
      number: `${randomCode(rng, 2)}-${rng.int(100000, 999999)}`,
      issuedBy: `${nationality} Maritime Administration`,
      issued: toIsoDate(issued),
      expires: toIsoDate(addDays(issued, 5 * 365)),
    };
  });
}

const reviewTone = (rating) => (rating >= 4.5 ? 'high' : rating >= 3.5 ? 'mid' : 'low');

/** One appraisal per completed contract; the rating is the average score, to the nearest half star. */
function generateReviews(rng, contracts, { rank, department }) {
  return contracts
    .filter((contract) => contract.status === 'completed')
    .map((contract, index) => {
      const scores = {
        competence: rng.int(3, 5),
        teamwork: rng.int(3, 5),
        safety: rng.int(3, 5),
        reliability: rng.int(2, 5),
      };
      const rating = Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / 4) * 2) / 2;
      return {
        id: `rev-${index + 1}`,
        date: contract.signOff,
        vessel: contract.vessel,
        reviewer: reviewerFor(rank, department),
        rating,
        scores,
        comment: rng.pick(REVIEW_COMMENTS[reviewTone(rating)]),
      };
    });
}

/** Contact details, travel documents and emergency contact. */
function generatePersonalDetails(rng, { member, nationalityInfo, age, referenceDate }) {
  const { firstName, lastName, nationality } = member;
  const emergencyFirstName = rng.pick([...MALE_FIRST_NAMES, ...FEMALE_FIRST_NAMES]);
  const daysAhead = (min, max) => toIsoDate(addDays(referenceDate, rng.int(min, max)));
  return {
    email: `${asciiSlug(firstName)}.${asciiSlug(lastName)}@crew.navis.example`,
    phone: randomPhone(rng, nationalityInfo.dial),
    hometown: `${rng.pick(nationalityInfo.towns)}, ${nationality}`,
    languages: nationalityInfo.languages,
    yearsAtSea: Math.max(0, age - rng.int(18, 24)),
    passport: { number: `${randomCode(rng, 2)}${rng.int(1000000, 9999999)}`, expires: daysAhead(200, 3000) },
    seamansBook: { number: `SB-${rng.int(100000, 999999)}`, expires: daysAhead(100, 2500) },
    emergencyContact: {
      name: `${emergencyFirstName} ${lastName}`,
      relation: rng.pick(RELATIONS),
      phone: randomPhone(rng, nationalityInfo.dial),
    },
  };
}

/** Everything on the crew member page, built around the member's current contract. */
export function generateCrewProfile(rng, member, { vesselId, vesselName, referenceDate }) {
  const nationalityInfo = NATIONALITY_INFO[member.nationality];
  const age = generateAge(rng, member.rank);
  const dateOfBirth = toIsoDate(addDays(referenceDate, -(age * 365.25 + rng.int(0, 360))));

  const contracts = generateContracts(rng, member, vesselName);
  const tickets = generateTickets(rng, {
    member,
    previousContract: contracts[1],
    homeAirport: nationalityInfo.airport,
    vesselId,
    referenceDate,
  });
  const medical = generateMedical(rng, referenceDate);
  const certificates = generateCertificates(rng, member, referenceDate);
  const reviews = generateReviews(rng, contracts, member);
  const personal = generatePersonalDetails(rng, { member, nationalityInfo, age, referenceDate });

  return { dateOfBirth, ...personal, contracts, tickets, medical, certificates, reviews };
}
