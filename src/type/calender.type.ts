export type calendarType = {
  today: Date;
  selectedDay: Date;
  current: currentDateType;
}

export type currentDateType = {
  days: number[];
  month: number;
  year: number;
  currentDate: Date
}