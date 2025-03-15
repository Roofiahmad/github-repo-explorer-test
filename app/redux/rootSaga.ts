import { call, put, takeLatest } from "@redux-saga/core/effects";
import { globalSlice } from "app/redux/globalSlice";
import axios, { AxiosResponse } from "axios";
import { fetchUsersParams, ReposResponse, UserReponse } from "./types";

export function* fetchUsers({ payload }: fetchUsersParams) {
  yield put(globalSlice.actions.setLoading(true));
  try {
    const response: AxiosResponse<UserReponse> = yield call(
      axios.get,
      `https://api.github.com/search/users?per_page=10&q=${payload}&page=1`
    );
    if (response.status == 200) {
      yield put(globalSlice.actions.setUsers(response.data.items));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(globalSlice.actions.setLoading(false));
}

export function* fetchRepos({ payload }: fetchUsersParams) {
  yield put(globalSlice.actions.setLoading(true));
  try {
    const response: AxiosResponse<ReposResponse> = yield call(
      axios.get,
      `https://api.github.com/search/repositories?per_page=50&q=user:${payload}&page=1`
    );
    if (response.status == 200) {
      yield put(globalSlice.actions.setRepos(response.data.items));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(globalSlice.actions.setLoading(false));
}

export default function* rootSaga() {
  yield takeLatest(globalSlice.actions.onGetUsers, fetchUsers);
  yield takeLatest(globalSlice.actions.onGetRepos, fetchRepos);
}
