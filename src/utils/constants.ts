export const ACCESS_TOKEN_KEY = "token";

export const path = {
  home: "/",
  profile: "/profile",
  login: "/login",
  register: "/register",
  logout: "/logout",
  productDetail: ":nameId"
} as const;

export const sortBy = {
  createdAt: "createdAt",
  view: "view",
  sold: "sold",
  price: "price"
} as const;

export const order = {
  asc: "asc",
  desc: "desc"
} as const;

export const purchaseStatus = {
  inCart: -1,
  all: 0,
  waitForConfirmation: 1,
  waitForGetting: 2,
  inProgress: 3,
  delivered: 4,
  cancelled: 5
} as const;
