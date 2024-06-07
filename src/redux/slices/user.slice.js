import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api from '../../config/api';


export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/api/v1/users/my-data");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    logedin: false,

  },
  reducers: {

    login: (state, action) => {
      state.logedin = true
    },
    logout: (state, action) => {
      state.logedin = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.logedin = true;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.logedin = false;
    });
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer