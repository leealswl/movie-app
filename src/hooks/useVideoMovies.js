import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const fetchMovieVideos = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const useMovieVideos = (movieId) => {
  return useQuery({
    queryKey: ['movie-videos', movieId],
    queryFn: () => fetchMovieVideos(movieId),
    select: (data) => data.results,
   
    enabled: !!movieId,
  });
};
