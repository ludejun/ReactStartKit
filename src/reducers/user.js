import {types} from '../actions/user';

const initialState = {
  loading: false,
  name: null
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {

    case 'RESET_STATE':
      return {
        ...initialState
      };

    case types.GET_LOGIN_INFO:
      return {
        ...state,
        loading: true
      };

    case types.GET_LOGIN_INFO_SUCCESS:
      return {
        ...state,
        name: action.loginInfo.name,
        loading: false
      };

    case types.GET_LOGIN_INFO_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}

