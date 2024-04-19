import { configureStore } from "@reduxjs/toolkit";
import teacherSlice, { TeacherSlice } from "./slices/teacher.slice";
export const store = configureStore({
  reducer: {
    teacher: teacherSlice
  },
});
