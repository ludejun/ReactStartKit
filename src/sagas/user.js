import {
  put, take, call, fork,
} from 'redux-saga/effects';
import { types } from '../actions/user';
import FakeRequest from '../utils/FakeRequest';

function* getLoginInfo(payload) {
  try {
    console.log(payload);
    const loginInfo = yield call(
      FakeRequest,
      {
        name: payload.name,
      },
      2000,
    );

    yield put({
      type: types.GET_LOGIN_INFO_SUCCESS,
      loginInfo,
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return loginInfo;
  } catch (error) {
    if (error && error.message !== '') {
      console.log(error);
    }
  }
}

export function* watchGetLoginInfo() {
  while (true) {
    const { payload } = yield take(types.GET_LOGIN_INFO);
    yield fork(getLoginInfo, payload);
  }
}
