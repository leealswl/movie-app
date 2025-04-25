import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchSearchMovie=({keyword,page,sortOption,genreFilter })=>{
  const commonParams = {
    page,
    include_adult: false,
  };

  if (keyword) {
    return api.get("/search/movie", {
      params: {
        ...commonParams,
        query: keyword,
      },
    });
  }

  return api.get("/discover/movie", {
    params: {
      ...commonParams,
      ...(genreFilter ? { with_genres: genreFilter } : {}),
      sort_by: sortOption,
    },
  });
};

export const useSearchMovieQuery=({
  keyword='',
  page=1,
  sortOption = "popularity.desc",
  genreFilter = '',
})=>{
    return useQuery({
        queryKey:['movie-search',{keyword,page,sortOption,genreFilter }],
        queryFn:()=>fetchSearchMovie({keyword,page,sortOption,genreFilter }),
        select:(item)=>item.data,
        keepPreviousData: true,
    })
}