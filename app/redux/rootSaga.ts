import { call, put, takeLatest } from "@redux-saga/core/effects";
import { globalSlice } from "app/redux/globalSlice";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ErrorFetchUser,
  fetchUsersParams,
  ReposResponse,
  UserReponse,
} from "./types";

export function* fetchUsers({ payload }: fetchUsersParams) {
  yield put(globalSlice.actions.setLoading(true));
  try {
    const response: AxiosResponse<UserReponse> = yield call(
      axios.get,
      `https://api.github.com/search/users?per_page=10&q=${payload}&page=1`
    );
    if (response.status == 200) {
      yield put(
        globalSlice.actions.setUsers({
          items: response.data.items,
          totalCount: response.data.total_count,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
  yield put(globalSlice.actions.setLoading(false));
}

export function* fetchRepos({ payload }: fetchUsersParams) {
  yield put(globalSlice.actions.setLoading(true));
  try {
    const response: AxiosResponse<ReposResponse> = yield call(
      axios.get,
      `https://api.github.com/search/repositories?per_page=10&q=user:${payload}&page=1`
    );
    if (response.status == 200) {
      yield put(
        globalSlice.actions.setRepos({
          items: response.data.items,
          totalCount: response.data.total_count,
        })
      );
    }
  } catch (e) {
    const error = e as AxiosError<ErrorFetchUser>;
    const errorMessage = error.response?.data.errors
      .map((e) => e.message)
      .join(", ");
    yield put(
      globalSlice.actions.setErrorMessage({
        errorMessage: errorMessage || "",
        isError: true,
        errorCode: error.status || null,
      })
    );
    // console.log(error);
  }
  yield put(globalSlice.actions.setLoading(false));
}

export default function* rootSaga() {
  yield takeLatest(globalSlice.actions.onGetUsers, fetchUsers);
  yield takeLatest(globalSlice.actions.onGetRepos, fetchRepos);
}
