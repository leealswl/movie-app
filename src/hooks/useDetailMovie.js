import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchDetailMovie =({movie_id})=>{
    return api.get(`/movie/${movie_id}`)
}
export const useDetailMovie =(movie_id)=>{
    return useQuery({
        queryKey:['movie-detail',movie_id],
        queryFn:()=>fetchDetailMovie({movie_id}),
        select:(result)=>result.data,    
    })
}