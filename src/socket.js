import {io} from 'socket.io-client';

const isDevelopment = process.env.NODE_ENV === "development";
const DEFAULT_SOCKET_URL = isDevelopment
  ? "http://localhost:5000"
  : "http://nirmaan-api-newalb-659762370.ap-south-1.elb.amazonaws.com";

const SOCKET_URL = (
  process.env.REACT_APP_SOCKET_URL ||
  DEFAULT_SOCKET_URL
).replace(/\/+$/, "");

export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});