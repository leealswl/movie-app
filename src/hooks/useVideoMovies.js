import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 1. 영화 비디오 데이터를 받아오는 함수
export const fetchMovieVideos = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

// 2. 영화 비디오 데이터를 관리하는 커스텀 훅
export const useMovieVideos = (movieId) => {
  return useQuery({
    queryKey: ['movie-videos', movieId],
    queryFn: () => fetchMovieVideos(movieId),
    select: (data) => data.results,
    // movieId가 있을 때만 쿼리 실행 (movieId가 undefined이면 쿼리가 실행되지 않음)
    enabled: !!movieId,
  });
};
