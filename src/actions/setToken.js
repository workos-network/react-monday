import { SET_TOKEN } from "../lib/types";

export const setToken = (state, dispatch) => async token => {
  dispatch({
    type: SET_TOKEN,
    payload: {
      token
    }
  });
};
