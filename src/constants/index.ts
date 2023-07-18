export const BOA_SYMBOL = "BOA";

export enum ACTIVE_STATE {
  STATUS_OFFLINE_ACCOUNT = "STATUS_OFFLINE_ACCOUNT", // if wallet connection failed or locked
  STATUS_OFFLINE_CHAIN = "STATUS_OFFLINE_CHAIN", // if it is unsupported chain
  STATUS_OFFLINE_TOKEN = "STATUS_OFFLINE_TOKEN", // if jwt token isn't exist
  STATUS_ONLINE = "STATUS_ONLINE", // wallet connection && supported chain && jwt token
}
export enum ORDER_TYPE {
  LISTING,
  OFFERING,
}
