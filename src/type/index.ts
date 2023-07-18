export enum ActivityType {
  MINTED = "MINTED",
  LIST = "LIST",
  OFFER = "OFFER",
  CANCEL = "CANCEL",
  SELL = "SELL",
  TRANSFER = "TRANSFER",
  TXFAIL = "TXFAIL",
}

export enum MarketOrderEventType {
  CANCEL_ORDER = "CancelOrder",
  MATCH_ORDER = "MatchOrders",
  ALREADY_ORDER = "Pending",
  FAIL_ORDER = "FailOrders",
}
export enum MarketTransactionEventType {
  CREATED = "TransactionCreated",
  CONFIRMED = "TransactionConfirmed",
  FAILED = "TransactionFailed",
}

export enum OrderStatus {
  SALE = "SALE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  SOLD = "SOLD",
  ACCEPTED = "ACCEPTED",
  ORDFAIL = "ORDFAIL",
}

export const CategoryType = {
  ALL: { name: "All", value: 0 },
  ART: { name: "Art", value: 1 },
  GAME: { name: "Game", value: 2 },
  MUSIC: { name: "Music", value: 3 },
  PHOTOGRAPHY: { name: "Photography", value: 4 },
  // DOMAIN: { name: "Domain", value: 4 },
  MEMBERSHIP: { name: "Membership", value: 5 },
  VIRTUAL_WORLD: { name: "Virtual worlds", value: 6 },
  SPORTS: { name: "Sports", value: 7 },
  NO_CATEGORY: { name: "No category", value: 8 },
};

export enum WhiteListType {
  NONE,
  ACTIVE,
  INACTIVE,
}
