/* --- Global --- */
import React, { useReducer } from "react";
import withMonday from "../withContext";
import { ITEMS_QUERY } from "../lib/graphql";

export const ITEMS_QUERY_REQUEST = "ITEMS_QUERY_REQUEST";
export const ITEMS_QUERY_SUCCESS = "ITEMS_QUERY_SUCCESS";
export const ITEMS_QUERY_FAILURE = "ITEMS_QUERY_FAILURE";

/**
 * @name useItemsQuery
 * @param {Integer} limit
 * @param {Integer} page
 */
export const useItemsQuery = ({ limit, page }) => {
  const monday = withMonday();
  const [, Set] = React.useState();
  const initialState = {
    data: undefined,
    error: undefined,
    loading: false
  };

  function reducer(state, action) {
    switch (action.type) {
      case ITEMS_QUERY_REQUEST:
        return {
          ...state,
          loading: true
        };
      case ITEMS_QUERY_SUCCESS:
        return {
          ...state,
          ...action.payload
        };
      case ITEMS_QUERY_FAILURE:
        return {
          ...state,
          error: action.payload
        };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  /* ------------------- */
  // Actions
  /* ------------------- */
  React.useEffect(
    inputs => {
      if (state.loading) {
        console.log("requesting");
        if (monday.client && monday.isClientAuthorized) {
          monday.client
            .request({
              query: ITEMS_QUERY,
              variables: {
                limit: 35
                // page: inputs.page
              }
            })
            .then(({ data, error }) => {
              dispatch({
                type: ITEMS_QUERY_SUCCESS,
                payload: {
                  data: data.items,
                  error
                }
              });
            })
            .catch(({ data, error }) => {
              console.log(data, error, "data, error");
              dispatch({
                type: ITEMS_QUERY_FAILURE,
                payload: error
              });
            });
        }
      }
    },
    [state.loading, monday.client, monday.isClientAuthorized]
  );

  const request = inputs =>
    dispatch({
      type: ITEMS_QUERY_REQUEST,
      payload: inputs
    });

  // const { loading, error, data, refetch, subscribeToMore } = useQuery(
  //   ITEMS_QUERY,
  //   {
  //     variables: {
  //       limit: 30,
  //       page: 1
  //     }
  //   }
  // );

  return {
    request,
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch: request
  };
};

export default useItemsQuery;
