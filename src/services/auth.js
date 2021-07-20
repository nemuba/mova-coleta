const TOKEN = "jwt";

export const login = (token) => localStorage.setItem(TOKEN, token);

export const logout = () => localStorage.removeItem(TOKEN);

export const isAuthenticated = () => (localStorage.jwt ? true : false);

export const getToken = () => localStorage.getItem(TOKEN);
