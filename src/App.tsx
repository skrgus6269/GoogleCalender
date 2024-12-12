import DatePicker from "./components/DatePicker";
import $ from "./app.module.scss";
import Calender from "./components/Calender";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className={$.container}>
        <Header />
        <div className={$.layout}>
          <DatePicker />
          <Calender />
        </div>
      </div>
    </Provider>
  );
}

export default App;
