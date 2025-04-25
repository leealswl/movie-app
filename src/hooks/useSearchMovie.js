import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchSearchMovie=({keyword,page,sortOption,genreFilter })=>{
  return api.get('/discover/movie', {
    params: {
      page,
      include_adult: false,
      // 키워드 있으면 with_keywords, 없으면 with_genres
      ...(keyword ? { with_keywords: keyword } : {}),
      ...(genreFilter ? { with_genres: genreFilter } : {}),
      sort_by: sortOption,     // 'popularity.desc' 또는 'popularity.asc'
    },
  });
};

export const useSearchMovieQuery=({
  keyword='',
  page=1,
  genreFilter = '',
  sortOption = "popularity.desc"
})=>{
    return useQuery({
        queryKey:['movie-search',{keyword,page,sortOption,genreFilter }],
        queryFn:()=>fetchSearchMovie({keyword,page,sortOption,genreFilter }),
        select:(item)=>item.data,
        keepPreviousData: true,
    })
}