const pad = (value: number): string => String(value).padStart(2, '0');

/** The current local time as an "HH:mm" string. */
export const nowTimeValue = (): string => {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

/**
 * Converts an "HH:mm" local time into an absolute ISO 8601 instant by combining it with today's
 * date in the browser's time zone. The backend then derives the selected region's local time.
 */
export const timeToIsoInstant = (time: string): string => {
  const [hours = '0', minutes = '0'] = time.split(':');
  const date = new Date();
  date.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), 0, 0);
  return date.toISOString();
};

const ensureUtc = (iso: string): string => (/(Z|[+-]\d{2}:?\d{2})$/.test(iso) ? iso : `${iso}Z`);

export const formatDateTime = (iso: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(
    new Date(ensureUtc(iso)),
  );

export const formatTime = (iso: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(new Date(ensureUtc(iso)));
