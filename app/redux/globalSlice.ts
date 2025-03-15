import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repository, User } from "./types";

export interface CounterState {
  users: any[];
  loading: boolean;
  repos: any[];
}

const initialState: CounterState = {
  users: [],
  loading: false,
  repos: [],
};

export const globalSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    onGetUsers: (state, action: PayloadAction<string>) => {
      return state;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    onGetRepos: (state, action: PayloadAction<string>) => {
      return { ...state, repos: [] };
    },
    setRepos: (state, action: PayloadAction<Repository[]>) => {
      return { ...state, repos: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onGetUsers, setUsers, setLoading, onGetRepos } =
  globalSlice.actions;

export default globalSlice.reducer;
