import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData, fetchAuthStatus } from "../../api/mediaApi";

export const getUserData = createAsyncThunk("auth/fetchUserData", async () => {
  const res = await fetchUserData();
  return res;
});

export const getAuthStatus = createAsyncThunk(
  "auth/fetchAuthStatus",
  async () => {
    const res = await fetchAuthStatus();
    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userData: null,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
    });
    builder.addCase(getAuthStatus.fulfilled, (state, action) => {
      state.isLoggedIn = Boolean(action.payload?.success);
    });
  },
});

export const { setIsLoggedIn, setUserData } = authSlice.actions;
export default authSlice.reducer;
