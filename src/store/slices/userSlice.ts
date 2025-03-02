import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Define the user type
interface User {
  email: string | null;
  username: string | null;
  photoURL: string | null;
}

// Define the initial state type
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk<User | null>(
  "auth/fetchUser",
  async () => {
    return new Promise<User | null>((resolve, reject) => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          const userData: User = {
            email: currentUser.email,
            username: currentUser.displayName,
            photoURL: currentUser.photoURL || "DEFAULT_PHOTO_URL",
          };

          resolve(userData);
        } else {
          resolve(null);
        }
      });
    });
  }
);

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload?.email;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
