import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchSearchMovie = ({ keyword, page, sortOption, genreFilter }) => {
  const common = { page, include_adult: false };

  if (keyword) {
    return api.get("/search/movie", {
      params: { ...common, query: keyword }
    });
  }

  return api.get("/discover/movie", {
    params: {
      ...common,
      ...(genreFilter ? { with_genres: genreFilter } : {}),
      sort_by: sortOption,
    }
  });
};

export const useSearchMovieQuery = ({
  keyword = "",
  page = 1,
  sortOption = "popularity.desc",
  genreFilter = "",
}) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortOption, genreFilter }],
    queryFn: () =>
      fetchSearchMovie({ keyword, page, sortOption, genreFilter })
        .then(res => res.data),
    keepPreviousData: true,
    select: data => {
      if (keyword) {
        const sorted = [...(data.results || [])].sort((a, b) =>
          sortOption === "popularity.desc"
            ? b.popularity - a.popularity
            : a.popularity - b.popularity
        );
        return { ...data, results: sorted };
      }
      return data;
    },
  });
};