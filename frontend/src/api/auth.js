import { post, get } from "./client.js";

export const login = (username, password) =>
  post("/auth/login", { username, password });

export const me = () => get("/auth/me");