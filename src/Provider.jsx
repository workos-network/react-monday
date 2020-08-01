/* --- Global --- */
import React, { useContext, useReducer, useEffect, useState } from "react";
import { GraphQLClient, ClientContext } from "graphql-hooks";

/* --- Local --- */
import * as actionList from "./actions";
import Context from "./Context";
import reducer from "./lib/reducer";
import { enhanceActions } from "./lib/middleware";
import { AUTHORIZE_CLIENT, ENABLE_DEV_MODE, CONNECT_CLIENT } from "./lib/types";

const API_MONDAY = "https://api.monday.com/v2/";
const initialState = {
  isClientAuthorized: false,
  isDevMode: false,
  url: API_MONDAY,
  client: new GraphQLClient({
    url: API_MONDAY
  }),
  token: undefined
};

/**
 * @function Provider
 * @param {Array<React.Component>} children
 * @param {String} url
 * @param {String} token
 */
const Provider = ({ children, url, token, devMode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    if (devMode) {
      dispatch({
        type: ENABLE_DEV_MODE
      });
    }
    if (!url && token) {
      dispatch({
        type: AUTHORIZE_CLIENT,
        payload: { token }
      });
    }
    if (url && token) {
      dispatch({
        type: CONNECT_CLIENT,
        payload: {
          url,
          token
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (state.token) {
      dispatch({
        type: AUTHORIZE_CLIENT,
        payload: { token }
      });
    }
  }, [state.token]);

  React.useMemo(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: AUTHORIZE_CLIENT,
        payload: { token }
      });
    }
  }, [state.isDevMode]);

  const { isClientAuthorized } = state;
  const actions = enhanceActions(actionList, state, dispatch);

  console.log(actions, "actionsactions");

  React.useEffect(() => {
    console.log(state, "monday state");
  }, [state]);

  return (
    <ClientContext.Provider value={state.client}>
      <Context.Provider
        value={{
          love: true,
          ...actions,
          ...state
        }}
      >
        {children}
      </Context.Provider>
    </ClientContext.Provider>
  );
};

export default Provider;
