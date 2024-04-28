import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./slices/teacher.slice";
import pdfSlice from "./slices/pdf.slice";

export const store = configureStore({
  reducer: {
    teacher: teacherSlice,
    pdf: pdfSlice,

  },
});
