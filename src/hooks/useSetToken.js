/* --- Global --- */
import React, { useReducer } from "react";
import withMonday from "../withContext";
import { ITEMS_QUERY } from "../lib/graphql";

export const ITEMS_QUERY_REQUEST = "ITEMS_QUERY_REQUEST";
export const ITEMS_QUERY_SUCCESS = "ITEMS_QUERY_SUCCESS";
export const ITEMS_QUERY_FAILURE = "ITEMS_QUERY_FAILURE";

/**
 * @name useSetToken
 * @param {Integer} limit
 * @param {Integer} page
 */
export const useSetToken = ({ limit, page }) => {
  const monday = withMonday();
  const [, Set] = React.useState();

  const setToken = token => {
    monday.setToken(token);
  };

  return {
    isAuthorized: monday.isClientAuthorized,
    setToken
  };
};

export default useSetToken;
