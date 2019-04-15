export const types = {
  GET_LOGIN_INFO: 'GET_LOGIN_INFO',
  GET_LOGIN_INFO_SUCCESS: 'GET_LOGIN_INFO_SUCCESS',
  GET_LOGIN_INFO_FAIL: 'GET_LOGIN_INFO_FAIL',
};

export function getLoginInfo(payload) {
  return {
    type: types.GET_LOGIN_INFO,
    payload,
  };
}
