import { calendarType, currentDateType } from "../type/calender.type"; 

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

//숫자 시간을 한글 문자 시간으로 변경
export const getStringHourByNumberHour = (time: number) => {
    const hour = Math.floor(time);  
  const minute = Math.round((time % 1) * 60);  
  
  const isPM = hour >= 12;
  const hour12 = hour % 12 || 12;  
  const prefix = isPM ? "오후" : "오전";
  
  if (minute === 0) {
    return `${prefix}${hour12}시`;
  }
  
  return `${prefix}${hour12}시 ${minute}분`;
}

// 날짜 관련 공통 로직을 함수로 분리하는 함수
export const updateCalendarState = (state: calendarType, selectedDate: Date) : void => {
    state.selectedDay = selectedDate;
    state.current = createCurrentDate(selectedDate.toString());
};

// 날짜를 문자열로 변환 하는 함수
export const getYearMonthDayByDate = (dateString: Date) => {
    const date = new Date(dateString.toISOString());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    
    return `${year}${month}${day}`;
}

// YYYYMMDD 형식을 YYYY-MM-DD 형식으로 변환
export const getYearMonthDayToSlash = (date: string) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return  `${year}-${month}-${day}`;
}
export const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  
export const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
];

export const scheduleHours = new Array(96).fill(0).map((item, index) => index * 0.25);