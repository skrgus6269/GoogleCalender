/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import $ from "./addScheduleModal.module.scss";
import { currentCalendar, setDay } from "../../redux/store/calender";
import { addSchedule, deleteSchedule } from "../../redux/store/schedule";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getStringHourByNumberHour,
  getYearMonthDayByDate,
  getYearMonthDayToSlash,
  scheduleHours,
  weekDays,
} from "../../utils/calender";
import DatePicker from "../DatePicker";
import { AiOutlineClockCircle } from "react-icons/ai";
import { scheduleType } from "../../type/schedule.stype";

type AddScheduleModalProps = {
  setAddScheduleModalIsOpen: Dispatch<SetStateAction<boolean>>;
  schedule: scheduleType | null;
  setSelectedSchedule: Dispatch<SetStateAction<scheduleType | null>>;
};

export default function AddScheduleModal({
  setAddScheduleModalIsOpen,
  schedule,
  setSelectedSchedule,
}: AddScheduleModalProps) {
  const dispatch = useDispatch();
  const { selectedDay } = useSelector(currentCalendar);
  const [title, setTitle] = useState<string>(schedule ? schedule.title : ""); //이벤트 제목
  const [startTime, setStartTime] = useState<number>(
    schedule ? schedule.start : 0
  ); //시작 시간
  const [endTime, setEndTime] = useState<number>(schedule ? schedule.end : 0); //종료 시간
  const [startTimeHourDropDownIsOpen, setStartTimeHourDropDownIsOpen] =
    useState<boolean>(false); //시작 시간 드롭다운 렌더링 여부
  const [endTimeHourDropDownIsOpen, setEndTimeHourDropDownIsOpen] =
    useState<boolean>(false); //종료 시간 드롭다운 렌더링 여부
  const [dayPickerIsOpen, setDayPickerIsOpen] = useState<boolean>(false); //날짜 선택 피커 렌더링 여부

  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLDivElement>(null);
  const endTimeRef = useRef<HTMLDivElement>(null);

  //모달 진입 시 자동으로 input 포커싱
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // YYYYMMDD 형식을 YYYY-MM-DD 형식으로 변환
  useEffect(() => {
    if (schedule?.date) {
      const date = getYearMonthDayToSlash(schedule.date);
      dispatch(setDay(date));
    }
  }, [schedule]);

  //시간 선택 버튼 클릭 시 선택한 시간으로 스크롤 이동
  useEffect(() => {
    if (startTimeHourDropDownIsOpen && startTimeRef.current) {
      startTimeRef.current.scrollTo({
        top: scheduleHours.indexOf(startTime) * 40,
      });
    }
    if (endTimeHourDropDownIsOpen && endTimeRef.current) {
      endTimeRef.current.scrollTo({
        top: scheduleHours.indexOf(endTime) * 40,
      });
    }
  }, [startTimeHourDropDownIsOpen, endTimeHourDropDownIsOpen]);

  //날짜가 선택될 때마다 한글명으로 변경해서 저장
  const renderingDate = useMemo(() => {
    return `${selectedDay.getMonth() + 1}월 ${selectedDay.getDate()}일 (${
      weekDays[selectedDay.getDay()]
    }요일)`;
  }, [selectedDay]);

  //삭제 함수
  const onClickDeleteButton = () => {
    if (schedule) {
      dispatch(deleteSchedule(schedule.id!));
      setAddScheduleModalIsOpen(false);
      setSelectedSchedule(null);
    }
  };

  //저장 함수
  const onClickSubmitButton = () => {
    dispatch(
      addSchedule({
        title: title.length > 0 ? title : "[제목없음]",
        date: getYearMonthDayByDate(selectedDay),
        start: startTime,
        end: endTime,
      })
    );
    setAddScheduleModalIsOpen(false);
    setSelectedSchedule(null);
  };

  //타이틀 인풋 입력
  const onChangeTitleInput = (event: any) => {
    setTitle(event.target.value);
  };

  //시간 선택 함수
  const onClickHour = (variant: "start" | "end", hour: number) => {
    if (variant === "start") {
      setStartTime(hour);
      setStartTimeHourDropDownIsOpen(false);
      //유저의 편의를 위해 시작 시간이 종료시간 보다 크다면 종료시간을 선택 시간과 같게 만듦
      if (hour > endTime) {
        setEndTime(hour);
      }
    } else {
      setEndTime(hour);
      setEndTimeHourDropDownIsOpen(false);
      //유저의 편의를 위해 시작 시간이 종료시간 보다 크다면 시작 시간을 선택 시간과 같게 만듦
      if (startTime > hour) {
        setStartTime(hour);
      }
    }
  };

  //날짜 선택 버튼 클릭 함수
  const onClickRenderingDate = (event: any) => {
    event.stopPropagation();
    setDayPickerIsOpen(!dayPickerIsOpen);
  };

  //모달창의 빈 부분을 선택하면 떠있는 모달을 모두 닫는 함수
  const onClickEdge = (event: any) => {
    event.stopPropagation();
    setDayPickerIsOpen(false);
    setStartTimeHourDropDownIsOpen(false);
    setEndTimeHourDropDownIsOpen(false);
  };

  //시작 시간 클릭 함수
  const onClickStartTimeButton = (event: any) => {
    event.stopPropagation();
    setStartTimeHourDropDownIsOpen(!startTimeHourDropDownIsOpen);
  };

  //종료 시간 클릭 함수
  const onClickEndTimeButton = (event: any) => {
    event.stopPropagation();
    setEndTimeHourDropDownIsOpen(!endTimeHourDropDownIsOpen);
  };

  return (
    <div className={$.container} onClick={onClickEdge}>
      <div className={$.title}>
        <input
          className={$.titleInput}
          onChange={onChangeTitleInput}
          placeholder="제목 추가"
          ref={inputRef}
          value={title}
        />
      </div>
      <div className={$.schedule}>
        <div className={$.row}>
          <AiOutlineClockCircle className={$.icon} />
          <div className={$.content}>
            <div onClick={onClickRenderingDate} className={$.renderingDate}>
              {renderingDate}
            </div>
            {dayPickerIsOpen && (
              <div className={$.datePicker}>
                <DatePicker onClickDay={() => setDayPickerIsOpen(false)} />
              </div>
            )}
            <div className={$.time}>
              <div className={$.startTime} onClick={onClickStartTimeButton}>
                {getStringHourByNumberHour(startTime)}
              </div>
              {startTimeHourDropDownIsOpen && (
                <div className={$.hourList} ref={startTimeRef}>
                  {scheduleHours.map((hour) => {
                    return (
                      <span
                        className={$.hour}
                        onClick={() => onClickHour("start", hour)}
                      >
                        {getStringHourByNumberHour(hour)}
                      </span>
                    );
                  })}
                </div>
              )}
              -
              <div className={$.endTime} onClick={onClickEndTimeButton}>
                {getStringHourByNumberHour(endTime)}
              </div>
              {endTimeHourDropDownIsOpen && (
                <div className={$.hourList} ref={endTimeRef}>
                  {scheduleHours.map((hour) => {
                    return (
                      <span
                        className={$.hour}
                        onClick={() => onClickHour("end", hour)}
                      >
                        {getStringHourByNumberHour(hour)}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={$.buttonLayout}>
        {schedule && (
          <button className={$.delete} onClick={onClickDeleteButton}>
            삭제
          </button>
        )}
        <button className={$.submit} onClick={onClickSubmitButton}>
          저장
        </button>
      </div>
    </div>
  );
}
