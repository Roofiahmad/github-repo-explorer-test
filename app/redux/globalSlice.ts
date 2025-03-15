import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repository, User } from "./types";

export interface CounterState {
  users: any[];
  userTotalCount: number | null;
  loading: boolean;
  repos: any[];
  repoTotalCount: number | null;
  isError: boolean;
  errorMessage: string;
  errorCode: null | number;
}

const initialState: CounterState = {
  users: [],
  loading: false,
  repos: [],
  userTotalCount: null,
  repoTotalCount: null,
  isError: false,
  errorMessage: "",
  errorCode: null,
};

export const globalSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    onGetUsers: (state, action: PayloadAction<string>) => {
      return { ...state, userTotalCount: null };
    },
    setUsers: (
      state,
      action: PayloadAction<{ items: User[]; totalCount: number | null }>
    ) => {
      return {
        ...state,
        users: action.payload.items,
        userTotalCount: action.payload.totalCount,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    onGetRepos: (state, action: PayloadAction<string>) => {
      return { ...state, repos: [], repoTotalCount: null };
    },
    setRepos: (
      state,
      action: PayloadAction<{ items: Repository[]; totalCount: number }>
    ) => {
      return {
        ...state,
        repos: action.payload.items,
        repoTotalCount: action.payload.totalCount,
      };
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{
        errorMessage: string;
        isError: boolean;
        errorCode: null | number;
      }>
    ) => {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isError: action.payload.isError,
        errorCode: action.payload.errorCode,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onGetUsers, setUsers, setLoading, onGetRepos } =
  globalSlice.actions;

export default globalSlice.reducer;
