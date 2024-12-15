import $ from "./header.module.scss";
import { IoMenuOutline } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  currentCalendar,
  setDay,
  setNextWeek,
  setPrevWeek,
} from "../../redux/store/calender";
import logo from "/logo.png";

export default function Header() {
  const dispatch = useDispatch();
  const { current } = useSelector(currentCalendar);

  //오늘 날짜로 이동 버튼 클릭 함수
  const onClickTodayButton = () => {
    dispatch(setDay(new Date().toString()));
  };

  //이전 달로 이동 버튼 클릭 함수
  const onClickPrevMonthButton = () => {
    dispatch(setPrevWeek());
  };

  //다음 달로 이동 버튼 클릭 함수
  const onClickNextMonthButton = () => {
    dispatch(setNextWeek());
  };

  return (
    <div className={$.layout}>
      <div className={$.left}>
        <div className={$.menu}>
          <IoMenuOutline className={$.menuIcon} />
        </div>
        <div className={$.logo}>
          <img src={logo} />
          <h1>Calender</h1>
        </div>
      </div>
      <div className={$.middle}>
        <button onClick={onClickTodayButton} className={$.todayButton}>
          오늘
        </button>
        <div className={$.navigation}>
          <MdOutlineKeyboardArrowLeft onClick={onClickPrevMonthButton} />
          <MdOutlineKeyboardArrowRight onClick={onClickNextMonthButton} />
        </div>
        <div className={$.currentDate}>
          <h2>
            {current.year}년 {current.month}월
          </h2>
        </div>
      </div>
    </div>
  );
}
