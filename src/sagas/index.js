import { fork } from 'redux-saga/effects';
import * as user from './user';

export default function* rootSaga() {
  yield [fork(user.watchGetLoginInfo)];
}
