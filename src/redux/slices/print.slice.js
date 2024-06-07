import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/api";

export const getPrints = createAsyncThunk(
  "teacher/getTeacherPrint",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/prints"); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
 

const initialState = {
  data: [],
};

export const printSlice = createSlice({
  name: "print",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrints.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { } = printSlice.actions;

export default printSlice.reducer;
