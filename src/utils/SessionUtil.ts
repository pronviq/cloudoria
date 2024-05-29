const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const getDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const mins = date.getMinutes();

  let hourString = hours.toString();

  return `${day} ${month} в ${hourString}:${mins.toString().padStart(2, "0")}`;
};
