// API Configuration
const isDevelopment = process.env.NODE_ENV === "development";

const API_URLS = {
  DEVELOPMENT: "http://3.111.170.87/api/v1/",
  PRODUCTION: "http://3.111.170.87/api/v1/",
};

const APP_URL = isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION;

console.log(`Using API URL: ${APP_URL} (${isDevelopment ? "Development" : "Production"} mode)`);

export default APP_URL;
