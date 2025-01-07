// src/services/backend.js

import axios from "axios";

const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export let baseURL = isLocalhost ? "http://localhost:3000" : "";

// export let baseURL;
// if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
//   baseURL = "http://localhost:3000"; // For local development
// } else {
//   baseURL = "/"; // For production
// }
// console.log("service_baseURL", baseURL);

const axios_baseURL = axios.create({ baseURL });

export default axios_baseURL;
