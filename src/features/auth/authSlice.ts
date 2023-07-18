import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TOKEN_NAME } from "../../hooks/authToken";

export interface UserToken {
  address: string;
  token: "";
  createdAt?: number;
}

export interface AuthState {
  jwt: [UserToken];
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  jwt: [{ address: "", token: "", createdAt: 0 }],
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveJWT: (state, action: PayloadAction<UserToken>) => {
      state.jwt.push({ ...action.payload, createdAt: Date.now() });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeJWT: (state, action: PayloadAction<string>) => {
      localStorage.removeItem(TOKEN_NAME);
      state.jwt.splice(
        state.jwt.findIndex((ut) => ut.address === action.payload),
        1
      );
    },
  },
});

export const { saveJWT, removeJWT } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state: RootState, address: string) => {
  // console.debug("state.auth.jwt :", state.auth.jwt);
  const uts = state.auth ? state.auth.jwt.filter((ut: UserToken) => ut.address === address) : null;
  const ut: UserToken | "" = uts ? uts[0] : "";
  if (ut) {
    localStorage.setItem(TOKEN_NAME, ut.token);
  } else {
    localStorage.removeItem(TOKEN_NAME);
  }
  return ut;
};

export const getAuth = (state: RootState, address: string): UserToken => {
  const uts = state.auth ? state.auth.jwt.filter((ut: UserToken) => ut.address === address) : null;
  return uts ? uts[0] : undefined;
};

export default authSlice.reducer;
