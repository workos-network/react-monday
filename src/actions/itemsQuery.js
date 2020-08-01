import { ITEMS_QUERY } from "../lib/graphql";
import { ITEMS_QUERY_REQUEST } from "../lib/types";

export const itemsQuery = (state, dispatch) => async ({ limit, page }) => {
  if (state.isClientAuthorized) {
    try {
      dispatch({
        type: ITEMS_QUERY_REQUEST
      });
      const { data, error } = await client.request({
        query: ITEMS_QUERY,
        variables: { limit, page }
      });
      if (data && data.items) return { data: data.items, error };
      return { data, error };
    } catch (error) {}
  }
  return {
    data: [],
    error: "Unauthorized"
  };
};
