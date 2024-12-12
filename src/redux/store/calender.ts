import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { RootState } from './index';
import { calendarType, currentDateType } from '../../calender.type'; 
import { getWeekDays, updateCalendarState } from '../../utils/calender';

const today = new Date();

// 초기 상태 설정
const initialState: calendarType = {
    today,                    
    selectedDay: today,          
    current: {                  
        days: getWeekDays(today.toString()),  
        month: today.getMonth() + 1,        
        year: today.getFullYear(),          
        currentDate: today                    
    } as currentDateType
};

// 캘린더 관련 슬라이스
export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDay: (state, action: PayloadAction<string>) => { 
      const currentDate = new Date(action.payload);
      updateCalendarState(state, currentDate);
    },
    setMonth: (state, action: PayloadAction<string>) => {
      const currentDate = new Date(action.payload);
      updateCalendarState(state, currentDate);
    },
    setNextWeek: (state) => {
      const nextWeekDate = new Date(state.selectedDay);
      nextWeekDate.setDate(nextWeekDate.getDate() + 7);
      updateCalendarState(state, nextWeekDate);
    },
    setPrevWeek: (state) => {
      const prevWeekDate = new Date(state.selectedDay);
      prevWeekDate.setDate(prevWeekDate.getDate() - 7);
      updateCalendarState(state, prevWeekDate);
    }
  }
});

export const {  
  setDay,
  setMonth,
  setNextWeek,
  setPrevWeek
} = calendarSlice.actions;

export const currentCalendar = (state: RootState) => state.calendar;
export default calendarSlice.reducer;
