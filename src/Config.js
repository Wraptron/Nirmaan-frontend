// API Configuration
const isDevelopment = process.env.NODE_ENV === "development";

const API_URLS = {
  // DEVELOPMENT: "http://localhost:3003/api/v1/",
  PRODUCTION: "https://nirmaan-api-newalb-659762370.ap-south-1.elb.amazonaws.com/api/v1/",
};

const APP_URL = isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION;

console.log(`Using API URL: ${APP_URL} (${isDevelopment ? "Development" : "Production"} mode)`);

export default APP_URL;
