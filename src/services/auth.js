const TOKEN = "jwt";
const REFRESH_TOKEN = "refresh_jwt";

export const login = (token, refresh_token) => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
}

export const logout = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export const isAuthenticated = () => (localStorage.jwt ? true : false);

export const getToken = () => localStorage.getItem(TOKEN);
