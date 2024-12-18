import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  register: boolean;
}

const initialState: authState = {
  register: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterState: (state, action: PayloadAction<boolean>) => {
      state.register = action.payload;
    },
  },
});

export const { setRegisterState } = authSlice.actions;
export default authSlice.reducer;
