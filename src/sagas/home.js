import {put, take, call, fork} from 'redux-saga/effects';
import {types} from '../actions/home';
import FakeRequest from '../utils/FakeRequest';

function* getHomeInfo(payload) {
  try {
    const homeInfo = yield call(FakeRequest, {
      home: 'testHome'
    }, 2000);

    yield put({
      type: types.GET_HOME_INFO_SUCCESS,
      allGoods: homeInfo
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return homeInfo;
  } catch (error) {
    if (error && error.message !== '') {
      console.log(error);
    }
  }
}

export function* watchGetHomeInfo() {
  while (true) {
    const {data, success} = yield take(types.GET_HOME_INFO);
    yield fork(getHomeInfo, data, success);
  }
}
