import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calender';
import scheduleReducer from './schedule';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer, 
    schedule: scheduleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;