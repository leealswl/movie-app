import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchSearchMovie=({keyword,page,sortOption})=>{
    if (keyword) {
        // 검색 시 TMDB search/movie 에서는 sort_by 미지원 → 클라이언트 useMemo로 정렬
        return api.get("/search/movie", {
          params: { query: keyword, page },
        })
      } else {
        // 키워드 없으면 Discover API 사용 (서버에서 sort_by 적용)
        return api.get("/discover/movie", {
          params: {
            page,
            sort_by: sortOption,            // 'popularity.desc' or 'popularity.asc'
            // 만약 장르 필터도 사용한다면:
            // with_genres: genreFilter
          },
        })
      }
    }

export const useSearchMovieQuery=({keyword,page,sortOption = "popularity.desc"})=>{
    return useQuery({
        queryKey:['movie-search',{keyword,page,sortOption }],
        queryFn:()=>fetchSearchMovie({keyword,page,sortOption }),
        select:(item)=>item.data,
        keepPreviousData: true,
    })
}