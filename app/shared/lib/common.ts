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
