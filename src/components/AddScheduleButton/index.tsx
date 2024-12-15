/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlinePlus } from "react-icons/ai";
import $ from "./addScheduleButton.module.scss";
import { Dispatch, SetStateAction } from "react";

type AddScheduleButtonProps = {
  setAddScheduleModalIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function AddScheduleButton({
  setAddScheduleModalIsOpen,
}: AddScheduleButtonProps) {
  const onClickAddScheduleButton = (event: any) => {
    event.stopPropagation();
    setAddScheduleModalIsOpen(true);
  };
  return (
    <div className={$.layout}>
      <button
        className={$.addScheduleButton}
        onClick={onClickAddScheduleButton}
      >
        <AiOutlinePlus className={$.plusIcon} />
        <span className={$.font}>만들기</span>
      </button>
    </div>
  );
}
