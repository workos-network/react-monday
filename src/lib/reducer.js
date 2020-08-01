import {
  AUTHORIZE_CLIENT,
  ENABLE_DEV_MODE,
  DISABLE_DEV_MODE,
  CONNECT_CLIENT,
  SET_TOKEN
} from "./types";

const reducerActions = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ENABLE_DEV_MODE:
      return {
        ...state,
        isDevMode: true
      };
    case DISABLE_DEV_MODE:
      return {
        ...state,
        isDevMode: false
      };
    case SET_TOKEN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token
      };
    case AUTHORIZE_CLIENT:
      return {
        ...state,
        isClientAuthorized: true,
        client: state.client.setHeader("Authorization", payload.token)
      };
    case CONNECT_CLIENT:
      return {
        ...state,
        client: state.client.setHeader("Authorization", payload.token)
      };

    default:
      return state;
  }
};

export default reducerActions;
