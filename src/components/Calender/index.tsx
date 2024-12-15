/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import $ from "./calender.module.scss";
import { currentCalendar } from "../../redux/store/calender";
import {
  getStringHourByNumberHour,
  hours,
  weekDays,
} from "../../utils/calender";
import { currentSchedule } from "../../redux/store/schedule";
import cn from "classnames";
import { scheduleType } from "../../type/schedule.stype";
import { Dispatch, SetStateAction } from "react";
import AddScheduleModal from "../AddScheduleModal";

type CalenderType = {
  addScheduleModalIsOpen: boolean;
  setAddScheduleModalIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedSchedule: scheduleType | null;
  setSelectedSchedule: Dispatch<SetStateAction<scheduleType | null>>;
};
export default function Calendar({
  selectedSchedule,
  setSelectedSchedule,
  addScheduleModalIsOpen,
  setAddScheduleModalIsOpen,
}: CalenderType) {
  const { current, today } = useSelector(currentCalendar);
  const { schedules } = useSelector(currentSchedule);

  // 선택된 일정 상태 관리

  //스케쥴 클릭 함수
  const handleEventClick = (schedule: scheduleType, event: any) => {
    event.stopPropagation();
    setSelectedSchedule(schedule);
    setAddScheduleModalIsOpen(true);
  };

  return (
    <div className={$.container}>
      {/* 요일 헤더 */}
      <div className={$.header}>
        <div className={$.standard}></div>
        {weekDays.map((weekDay, index) => (
          <div className={$.weekDays} key={index}>
            <span className={$.weekDay}>{weekDay}</span>
            <button
              className={cn($.weekDayButton, {
                [$.today]: today.getDate() === current.days[index],
              })}
            >
              {current.days[index]}
            </button>
          </div>
        ))}
      </div>

      <div className={$.main}>
        {/* 시간 라인 */}
        <div className={$.time}>
          {hours.map((hour) => (
            <div className={$.hour} key={hour}>
              {hour !== 0 && <span>{getStringHourByNumberHour(hour)}</span>}
            </div>
          ))}
        </div>

        {/* 일정 플랜 */}
        <div className={$.plan}>
          {current.days.map((plan, planIndex) => (
            <div className={$.dayPlan} key={planIndex}>
              {hours.map((hour) => (
                <div
                  className={$.hourLine}
                  style={{ top: `${hour * 48}px` }}
                  key={hour}
                />
              ))}
              {schedules
                .filter(
                  (schedule) =>
                    schedule.date === `${current.year}${current.month}${plan}`
                )
                .map((item) => (
                  <button
                    key={item.id}
                    className={$.planButton}
                    style={{
                      top: `${item.start * 48}px`,
                      height: `${(item.end - item.start) * 48}px`,
                    }}
                    onClick={(event: any) => handleEventClick(item, event)}
                  >
                    <span className={$.title}>{item?.title}</span>
                    <span className={$.times}>{`${item.end}-${item.end}`}</span>
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>
      {addScheduleModalIsOpen && (
        <AddScheduleModal
          schedule={selectedSchedule}
          setAddScheduleModalIsOpen={setAddScheduleModalIsOpen}
          setSelectedSchedule={setSelectedSchedule}
        />
      )}
    </div>
  );
}
