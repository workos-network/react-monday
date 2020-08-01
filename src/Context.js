/**
 * @name EthersContext
 * @description Initialize Ethers context.
 */

import { createContext } from "react";

const Context = createContext({
  isClientAuthorized: false,
  isDevMode: false,
  client: undefined,
  url: undefined,
  token: undefined
});

export default Context;
