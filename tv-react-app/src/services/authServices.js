import http from "./httpServices";

export function login(email, password) {
  return http.post('http://localhost:3900/api/auth', { email: email, password: password })
}
