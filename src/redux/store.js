import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./slices/teacher.slice";
import pdfSlice from "./slices/pdf.slice";
import printSlice from "./slices/print.slice";
import userSlice from "./slices/user.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserSlice = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    teacher: teacherSlice,
    pdf: pdfSlice,
    print: printSlice,
    user : persistedUserSlice
  },
});
