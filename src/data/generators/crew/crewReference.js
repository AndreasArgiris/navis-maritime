/** Reference data for generated crew: roster, names, nationalities, travel and medical options. */

export const CREW_ROSTER = [
  ['Master', 'Deck'],
  ['Chief Officer', 'Deck'],
  ['Second Officer', 'Deck'],
  ['Third Officer', 'Deck'],
  ['Bosun', 'Deck'],
  ['Able Seaman', 'Deck'],
  ['Able Seaman', 'Deck'],
  ['Able Seaman', 'Deck'],
  ['Ordinary Seaman', 'Deck'],
  ['Deck Cadet', 'Deck'],
  ['Chief Engineer', 'Engine'],
  ['Second Engineer', 'Engine'],
  ['Third Engineer', 'Engine'],
  ['Fourth Engineer', 'Engine'],
  ['Electro-Technical Officer', 'Engine'],
  ['Fitter', 'Engine'],
  ['Oiler', 'Engine'],
  ['Oiler', 'Engine'],
  ['Wiper', 'Engine'],
  ['Chief Cook', 'Catering'],
  ['Messman', 'Catering'],
  ['Steward', 'Catering'],
];

export const OFFICER_RANKS = new Set([
  'Master',
  'Chief Officer',
  'Second Officer',
  'Third Officer',
  'Chief Engineer',
  'Second Engineer',
  'Third Engineer',
  'Fourth Engineer',
  'Electro-Technical Officer',
]);

export const MALE_FIRST_NAMES = [
  'Marco', 'Jonas', 'Ravi', 'Andrei', 'Nikos', 'Piotr', 'Luka', 'Arief', 'Erik', 'Janis',
  'Miguel', 'Daniel', 'Samuel', 'Tomas', 'Kyaw', 'Ivan', 'Aditya', 'Joel', 'Stefan', 'Rafael',
];
export const FEMALE_FIRST_NAMES = ['Maria', 'Elena', 'Anna', 'Sofia', 'Ingrid', 'Priya', 'Katarzyna', 'Dewi'];
export const LAST_NAMES = [
  'Santos', 'Reyes', 'Kumar', 'Petrenko', 'Papadopoulos', 'Nowak', 'Horvat', 'Wijaya', 'Hansen',
  'Ozols', 'Cruz', 'Sharma', 'Kowalski', 'Aung', 'Bondarenko', 'Larsen', 'Novak', 'Georgiou',
  'Mendoza', 'Iyer',
];

/** Per-nationality details: home towns, nearest airport, phone code and languages. */
export const NATIONALITY_INFO = {
  Philippines: { towns: ['Manila', 'Cebu', 'Iloilo'], airport: 'MNL', dial: '63', languages: ['Filipino', 'English'] },
  India: { towns: ['Mumbai', 'Kochi', 'Chennai'], airport: 'BOM', dial: '91', languages: ['Hindi', 'English'] },
  Ukraine: { towns: ['Odesa', 'Mykolaiv', 'Izmail'], airport: 'WAW', dial: '380', languages: ['Ukrainian', 'English'] },
  Greece: { towns: ['Piraeus', 'Chios', 'Andros'], airport: 'ATH', dial: '30', languages: ['Greek', 'English'] },
  Poland: { towns: ['Gdynia', 'Szczecin', 'Gdańsk'], airport: 'GDN', dial: '48', languages: ['Polish', 'English'] },
  Croatia: { towns: ['Split', 'Rijeka', 'Zadar'], airport: 'SPU', dial: '385', languages: ['Croatian', 'English'] },
  Indonesia: { towns: ['Jakarta', 'Surabaya', 'Semarang'], airport: 'CGK', dial: '62', languages: ['Indonesian', 'English'] },
  Norway: { towns: ['Bergen', 'Ålesund', 'Stavanger'], airport: 'BGO', dial: '47', languages: ['Norwegian', 'English'] },
  Latvia: { towns: ['Riga', 'Liepāja', 'Ventspils'], airport: 'RIX', dial: '371', languages: ['Latvian', 'Russian', 'English'] },
  Myanmar: { towns: ['Yangon', 'Mawlamyine', 'Pathein'], airport: 'RGN', dial: '95', languages: ['Burmese', 'English'] },
};
export const NATIONALITIES = Object.keys(NATIONALITY_INFO);

/** Airport used for crew changes on each vessel's current trade. */
export const CREW_CHANGE_AIRPORTS = {
  'atlantic-meridian': 'JFK',
  'nordic-aurora': 'BRU',
  'pacific-horizon': 'LAX',
  'coral-voyager': 'SIN',
  'cape-sentinel': 'CPT',
  'arabian-star': 'DMM',
  'baltic-pioneer': 'GDN',
  'southern-cross': 'SYD',
  'gulf-navigator': 'IAH',
  'andes-trader': 'SCL',
  'mediterranean-pearl': 'ATH',
};

export const AIRLINES = [
  { name: 'SkyBridge Air', code: 'SB' },
  { name: 'Oceanic Airways', code: 'OA' },
  { name: 'Meridian Air', code: 'MA' },
];
export const PREVIOUS_VESSELS = ['Ocean Spirit', 'Blue Marlin', 'Star Navigator', 'Polar Express', 'Sea Harmony', 'Golden Trader'];
export const BLOOD_TYPES = ['O+', 'O+', 'A+', 'A+', 'B+', 'AB+', 'O-', 'A-'];
export const ALLERGIES = ['Penicillin', 'Peanuts', 'Shellfish', 'Pollen'];
export const CONDITIONS = ['Mild hypertension (controlled)', 'Mild asthma (inhaler)', 'Type 2 diabetes (diet-controlled)'];
export const RESTRICTIONS = ['No work aloft', 'No solo night watches', 'Requires quarterly blood pressure check'];
export const RELATIONS = ['Spouse', 'Parent', 'Sibling'];
export const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

export const REVIEW_COMMENTS = {
  high: [
    'Outstanding professional. Leads by example and keeps the team motivated.',
    'Excellent safety awareness and very reliable during cargo operations.',
    'Highly competent and always willing to help colleagues. Recommended for promotion.',
  ],
  mid: [
    'Solid performer who completes tasks to a good standard.',
    'Good teamwork. Could take more initiative during drills.',
    'Reliable crew member; should keep developing technical knowledge.',
  ],
  low: [
    'Needs closer supervision on paperwork and handovers.',
    'Performance met minimum requirements. Agreed on a training plan.',
  ],
};

export function certificatesFor(rank, department) {
  const list = ['STCW Basic Safety Training', 'Security Awareness Training', 'Elementary First Aid'];
  if (OFFICER_RANKS.has(rank)) list.push('Certificate of Competency', 'Advanced Fire Fighting', 'Medical First Aid');
  if (department === 'Deck' && OFFICER_RANKS.has(rank)) list.push('GMDSS General Operator', 'ECDIS');
  if (department === 'Engine' && OFFICER_RANKS.has(rank)) list.push('High Voltage Safety');
  if (department === 'Catering') list.push('Food Safety & Hygiene');
  if (rank === 'Master' || rank === 'Chief Officer') list.push('Ship Security Officer');
  return list;
}

export function reviewerFor(rank, department) {
  if (rank === 'Master') return 'Fleet Superintendent';
  if (rank === 'Chief Engineer') return 'Technical Superintendent';
  return department === 'Engine' ? 'Chief Engineer' : 'Master';
}
