import {types} from '../actions/home';

const initialState = {
  list: []
};

export default function home(state = initialState, action = {}) {
  switch (action.type) {

    case 'RESET_STATE':
      return {
        ...initialState
      };

    case types.GET_HOME_INFO:
      return {
        ...state,
        loading: true
      };

    case types.GET_HOME_INFO_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case types.GET_HOME_INFO_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}

