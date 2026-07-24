// client/src/services/api.js
import axios from "axios";

const API = axios.create({
  // We will change this to your production URL later
  baseURL: "http://localhost:5000/api",
});

// Intercept requests to attach the JWT token if it exists
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("adminProfile");
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export default API;
