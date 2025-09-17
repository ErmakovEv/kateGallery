export const formatLongDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return date.toLocaleString('ru', options);
};

export const formatShortData = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return date.toLocaleString('ru', options);
};

export function generateTempPassword(length = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

export const sleep = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));
