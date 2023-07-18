export const ACCESS_TOKEN_KEY = "token";

export const path = {
  home: "/",
  profile: "/profile",
  login: "/login",
  register: "/register",
  logout: "/logout"
} as const;

export const sortBy = {
  createAt: "createAt",
  view: "view",
  sold: "sold",
  price: "price"
} as const;

export const order = {
  asc: "asc",
  desc: "desc"
} as const;
