export type scheduleType = {
  id?: number;
  title: string;
  date: string;
  start: number;
  end: number;
}

export type schedulesType = {
  schedules: scheduleType[];
}