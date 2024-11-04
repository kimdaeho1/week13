// src/shared/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // JSON Server의 포트에 맞춰 설정
});

export default api;
