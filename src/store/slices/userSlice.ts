import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  register: boolean;
}

const initialState: UserState = {
  register: false, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRegisterState: (state, action: PayloadAction<boolean>) => {
      state.register = action.payload;
    },
  },
});

export const { setRegisterState } = userSlice.actions;
export default userSlice.reducer;
