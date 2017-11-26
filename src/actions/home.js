export const types = {
  GET_HOME_INFO: 'GET_HOME_INFO',
  GET_HOME_INFO_SUCCESS: 'GET_HOME_INFO_SUCCESS',
  GET_HOME_INFO_FAIL: 'GET_HOME_INFO_FAIL'
};

export function getHomeInfo(payload) {
  return {
    type: types.GET_HOME_INFO,
    payload
  };
}
