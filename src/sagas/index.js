import {fork} from 'redux-saga/effects';
import * as home from './home';

export default function* rootSaga() {
  yield [
    fork(home.watchGetHomeInfo)
  ];
}
