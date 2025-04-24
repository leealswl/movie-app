import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchSearchMovie=({keyword,page,sortOption,genreFilter })=>{
    if (keyword) {
        //  클라이언트 useMemo로 정렬
        return api.get("/search/movie", {
          params: { query: keyword, page },
        })
      } else {
        return api.get("/discover/movie", {
          params: {
            page,
            sort_by: sortOption,   // 'popularity.desc' or 'popularity.asc'
            ...(genreFilter ? { with_genres: genreFilter } : {}),
          },
        })
      }
    }

export const useSearchMovieQuery=({keyword,page,sortOption = "popularity.desc",genreFilter = "",})=>{
    return useQuery({
        queryKey:['movie-search',{keyword,page,sortOption,genreFilter }],
        queryFn:()=>fetchSearchMovie({keyword,page,sortOption,genreFilter }),
        select:(item)=>item.data,
        keepPreviousData: true,
    })
}