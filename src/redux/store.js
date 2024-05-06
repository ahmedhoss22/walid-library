import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./slices/teacher.slice";
import pdfSlice from "./slices/pdf.slice";
import printSlice from "./slices/print.slice";

export const store = configureStore({
  reducer: {
    teacher: teacherSlice,
    pdf: pdfSlice,
    print: printSlice,

  },
});
