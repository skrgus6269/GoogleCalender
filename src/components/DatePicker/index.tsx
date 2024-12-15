import { DayPicker } from "react-day-picker";
import "./datePicker.scss";
import { useDispatch, useSelector } from "react-redux";
import { currentCalendar, setDay } from "../../redux/store/calender";
import { useEffect, useState } from "react";

type DatePickerProps = {
  onClickDay?: () => void;
};

export default function DatePicker({ onClickDay }: DatePickerProps) {
  const dispatch = useDispatch();

  const { current, selectedDay } = useSelector(currentCalendar);

  //작은 달력의 월이 변해도 큰 달력의 월은 변하면 안됨 (이를 위한 월 상태)
  const [month, setMonth] = useState<Date>(current.currentDate);

  //큰 달력의 월이 변하면 작은 달력의 월이 변해야함
  useEffect(() => {
    setMonth(new Date(`${current.year}-${current.month}`));
  }, [current.month, current.year]);

  return (
    <>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={(event: unknown) => {
          dispatch(setDay((event as Date).toString()));
          if (onClickDay) onClickDay();
        }}
        month={month}
        onMonthChange={(event: unknown) => {
          setMonth(event as Date);
        }}
        showOutsideDays
        formatters={{
          formatMonthCaption: (date) =>
            date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
            }),
          formatWeekdayName: (date) =>
            date.toLocaleDateString("ko-KR", { weekday: "short" }),
        }}
        fixedWeeks
      />
    </>
  );
}
