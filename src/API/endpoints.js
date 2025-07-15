const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1/';

export const LOGIN_API = `${API_BASE_URL}${process.env.REACT_APP_LOGIN_API || 'login'}`;
export const FORGOT_PASSWORD_API = `${API_BASE_URL}${process.env.REACT_APP_FORGOT_PASSWORD_API || 'forgot-password'}`;
