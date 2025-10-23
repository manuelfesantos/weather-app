const weekDayMap = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export const getCurrentDateString = (): string => {
  const utcDateString = new Date().toUTCString();
  const utcWeekDay = utcDateString.substring(0, 3);
  const weekDay = Object.entries(weekDayMap).find(
    ([key]) => key === utcWeekDay,
  )?.[1];
  if (!weekDay) {
    throw new Error("Invalid date");
  }
  const month = utcDateString.substring(8, 11);
  const monthDay = utcDateString.substring(5, 7);
  const year = utcDateString.substring(12, 16);

  return `${weekDay}, ${month} ${monthDay}, ${year}`;
};

export const getWeekDayName = (weekDay: string): string => {
  const weekDayName = Object.entries(weekDayMap).find(
    ([day]) => day === weekDay,
  )?.[1];
  if (!weekDayName) {
    throw new Error("Invalid day");
  }
  return weekDayName;
};
