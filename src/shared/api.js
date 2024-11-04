// src/shared/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.36.158.33:3001', // EC2 인스턴스의 탄력적 IP와 JSON 서버 포트
});

export default api;
