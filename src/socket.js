// Socket.IO disabled — no server-side socket endpoint is configured yet.
// import {io} from 'socket.io-client';
//
// const isDevelopment = process.env.NODE_ENV === "development";
// const defaultSocketUrl = isDevelopment
//   ? "http://localhost:5000"
//   : (typeof window !== "undefined" ? window.location.origin : "");
//
// const URL = process.env.REACT_APP_SOCKET_URL || defaultSocketUrl;
//
// export const socket = io(URL);

export const socket = null;