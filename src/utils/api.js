import axios from "axios";

const API_KEY =process.env.REACT_APP_API_KEY;
// console.log('API_KEY:', process.env.REACT_APP_API_KEY);
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3', // 모든 요청의 기본 URL
    timeout: 1000, // 요청 타임아웃 설정 (밀리초 단위)
    headers: {
        Accept: 'application/json',
        Authorization:`Bearer ${API_KEY}`,
    } 
  });
  // checking netlify


  // 요청 인터셉터: 요청을 보내기 전에 토큰을 추가하는 예
// axiosInstance.interceptors.request.use(
//     config => {
//       // 예: 로컬 스토리지에서 토큰을 가져와서 헤더에 추가
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => Promise.reject(error)
//   );
  
//   // 응답 인터셉터: 응답 데이터를 처리하거나 에러 핸들링
//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       // 예: 에러 로그 기록 혹은 사용자에게 알림
//       console.error('API 요청 에러:', error);
//       return Promise.reject(error);
//     }
//   );
  
export default api;