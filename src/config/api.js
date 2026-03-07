const viteUrl =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.VITE_API_URL
    : undefined;

const craUrl =
  typeof process !== "undefined" && process.env
    ? process.env.REACT_APP_API_URL
    : undefined;

const API_BASE_URL = viteUrl || craUrl || "http://localhost:5000";

export default API_BASE_URL;
