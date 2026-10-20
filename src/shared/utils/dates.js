export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export const toIsoDate = (date) => new Date(date).toISOString().slice(0, 10);

/** Age in whole years on `on` (defaults to today). */
export function ageFrom(dateOfBirth, on = new Date()) {
  const dob = new Date(dateOfBirth);
  let age = on.getFullYear() - dob.getFullYear();
  const hadBirthday =
    on.getMonth() > dob.getMonth() || (on.getMonth() === dob.getMonth() && on.getDate() >= dob.getDate());
  if (!hadBirthday) age -= 1;
  return age;
}
