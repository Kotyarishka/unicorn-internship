export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const daysFromNow = (days: number) =>
  new Date(Date.now() + days * ONE_DAY_MS);

export const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000);
