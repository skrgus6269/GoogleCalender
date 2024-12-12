import { calendarType, currentDateType } from "../calender.type"; 

//문자열을 date로 변환하는 함수
export const createCurrentDate = (date: string) : currentDateType=> {
    const currentDate = new Date(date);
    return {
      days: getWeekDays(currentDate.toString()),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      currentDate: currentDate
    }
}

//선택한 주의 날짜 배열을 리턴하는 함수
export const getWeekDays = (selectedDay: string) : number[]=> {
    const currentDay = new Date(selectedDay);
    const currentYear = currentDay.getFullYear();
    const currentMonth = currentDay.getMonth();
    const currentDate = currentDay.getDate();
    const currentIndexOfDayOfWeek = currentDay.getDay();
  
    const weekDays = Array.from({ length: 7 }, (_, day) => (
    new Date(currentYear, currentMonth, currentDate + (day - currentIndexOfDayOfWeek)).getDate()
)); 
    return weekDays;
}

// 날짜 관련 공통 로직을 함수로 분리
export const updateCalendarState = (state: calendarType, selectedDate: Date) : void => {
    state.selectedDay = selectedDate;
    state.current = createCurrentDate(selectedDate.toString());
};