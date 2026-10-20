import { createRng, hashString } from '../shared/utils/random';

/** A PRNG seeded by vessel + data domain, so each dataset is stable on its own. */
export const rngFor = (vesselId, domain) => createRng(hashString(`${vesselId}:${domain}`));
