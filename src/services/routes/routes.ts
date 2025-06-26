export const URL_API_ROUTES = {
  SHORTEN_URL: "/shorten",
  GET_URLS: "/urls",
  DELETE_URL: (id: string) => `/urls/${id}`,
  LOGOUT: "/logout",
};


export const AUTH_API_ROUTES = {
  REGISTER: '/register',
  LOGIN: '/login',
};