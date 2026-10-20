import { addDays, toIsoDate } from '../../../shared/utils/dates';
import { rngFor } from '../../rng';
import { generateCrewProfile } from './crewProfile';
import { CREW_ROSTER, FEMALE_FIRST_NAMES, LAST_NAMES, MALE_FIRST_NAMES, NATIONALITIES } from './crewReference';

/** Most crew are on board; a few are on leave or about to join. */
function crewStatus(roll) {
  if (roll > 0.92) return 'joining';
  if (roll > 0.85) return 'on-leave';
  return 'onboard';
}

/** Identity and current contract for one roster position. Draw order matters (seeded rng). */
function generateCrewMember(rng, { rank, department, index, vesselId, referenceDate }) {
  const status = crewStatus(rng.next());
  const signOn =
    status === 'joining' ? addDays(referenceDate, rng.int(3, 20)) : addDays(referenceDate, -rng.int(10, 160));
  const contractMonths = rng.int(4, 9);

  // Masters are always male in this data set, so no draw is made for them.
  const gender = rank !== 'Master' && rng.chance(0.15) ? 'Female' : 'Male';
  const firstName = rng.pick(gender === 'Female' ? FEMALE_FIRST_NAMES : MALE_FIRST_NAMES);
  const lastName = rng.pick(LAST_NAMES);

  return {
    id: `${vesselId}-crew-${index + 1}`,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    gender,
    rank,
    department,
    nationality: rng.pick(NATIONALITIES),
    signOn: toIsoDate(signOn),
    signOff: toIsoDate(addDays(signOn, contractMonths * 30)),
    status,
  };
}

/** The full crew of a vessel, each with a complete profile. */
export function generateCrew(vesselId, referenceDate, vesselName = 'Current vessel') {
  const rng = rngFor(vesselId, 'crew');
  return CREW_ROSTER.map(([rank, department], index) => {
    const member = generateCrewMember(rng, { rank, department, index, vesselId, referenceDate });
    const profileRng = rngFor(vesselId, `crew-profile-${index}`);
    return { ...member, ...generateCrewProfile(profileRng, member, { vesselId, vesselName, referenceDate }) };
  });
}
