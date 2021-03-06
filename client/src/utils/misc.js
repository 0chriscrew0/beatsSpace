// SERVER ROUTES
export const USER_ROUTES = "/api/users";
export const PRODUCT_ROUTES = "/api/product";
export const SITE_ROUTES = "/api/site";

// Unique ID function

export const ID = () =>
  "a" +
  Math.random()
    .toString(36)
    .substr(2, 9);
