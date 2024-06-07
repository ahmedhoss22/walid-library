import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/api";

export const getPdfs = createAsyncThunk(
  "teacher/getPdfs",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/pdf");
   
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTeacherPdf = createAsyncThunk(
  "teacher/getTeacherPdf",
  async (id, thunkAPI) => {
    console.log(id);
    if (!id) return
    try {
      const response = await Api.get("/pdf/" + id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  all:[]
};

export const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeacherPdf.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getPdfs.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const { } = pdfSlice.actions;

export default pdfSlice.reducer;
