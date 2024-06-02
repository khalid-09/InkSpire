/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect the user to the '/' route
 * @type {string[]}
 */
export const authRoutes = ["/login", "/signup"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route to redirect the user to after they login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
