import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { schedulesType, scheduleType } from "../../type/schedule.stype";
import { RootState } from ".";
const initialState = {
  schedules: [] as scheduleType[], 
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSchedule: (state: schedulesType, action: PayloadAction<scheduleType>) => {
      state.schedules.push({
        ...action.payload, 
        id: state.schedules.length + 1,
      })
    },
    deleteSchedule: (state: schedulesType, action: PayloadAction<number>) => {
      const newSchedule = state.schedules.filter((item: scheduleType) => {
        return item.id !== action.payload;
      });
      state.schedules = newSchedule;
    }
  }
});

export const {addSchedule, deleteSchedule} = scheduleSlice.actions
export const currentSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer