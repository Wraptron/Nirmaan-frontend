// API Configuration
// const isDevelopment = process.env.NODE_ENV === "production";

const DEFAULT_API_ORIGIN = isDevelopment
  ? "http://localhost:3003"
  : "http://nirmaan-api-newalb-659762370.ap-south-1.elb.amazonaws.com";

const API_ORIGIN = (
  process.env.REACT_APP_API_BASE_URL || DEFAULT_API_ORIGIN
).replace(/\/+$/, "");
const APP_URL = `${API_ORIGIN}/api/v1/`;

console.log(`Using API URL: ${APP_URL} (${isDevelopment ? "Development" : "Production"} mode)`);

export default APP_URL;
