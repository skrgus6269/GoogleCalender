import DatePicker from "./components/DatePicker";
import $ from "./app.module.scss";
import Calender from "./components/Calender";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useState } from "react";
import AddScheduleButton from "./components/AddScheduleButton";
import { scheduleType } from "./type/schedule.stype";

function App() {
  const [addScheduleModalIsOpen, setAddScheduleModalIsOpen] =
    useState<boolean>(false);

  const [selectedSchedule, setSelectedSchedule] = useState<scheduleType | null>(
    null
  );

  return (
    <Provider store={store}>
      <div
        className={$.container}
        onClick={() => {
          setSelectedSchedule(null);
          setAddScheduleModalIsOpen(false);
        }}
      >
        <Header />
        <div className={$.layout}>
          <div className={$.left}>
            <AddScheduleButton
              setAddScheduleModalIsOpen={setAddScheduleModalIsOpen}
            />
            <DatePicker />
          </div>
          <Calender
            selectedSchedule={selectedSchedule}
            setSelectedSchedule={setSelectedSchedule}
            addScheduleModalIsOpen={addScheduleModalIsOpen}
            setAddScheduleModalIsOpen={setAddScheduleModalIsOpen}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
