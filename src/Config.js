
// API Configuration
const isDevelopment = process.env.NODE_ENV === "development";

const API_URLS = {
  DEVELOPMENT: "http://localhost:3003/api/v1/",
  PRODUCTION: "https://3.110.173.141/api/v1/", // Corrected IP address
};

const APP_URL = isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION;

console.log(`Using API URL: ${APP_URL} (${isDevelopment ? "Development" : "Production"} mode)`);

export default APP_URL;
