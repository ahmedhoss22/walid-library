import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/api";

export const getTeacherData= createAsyncThunk(
  "teacher/getTeacherData",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/teacher");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  all: [],
};

export const TeacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeacherData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {} = TeacherSlice.actions;

export default TeacherSlice.reducer;
