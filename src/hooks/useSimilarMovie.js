import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSimilarMovie=({movieId})=>{
    return api.get(`/movie/${movieId}/similar`)
}

export const useSimilarMovie =(movieId)=>{
    return useQuery({
        queryKey:['movie-similar',movieId],
        queryFn:()=>fetchSimilarMovie({movieId}),
        select:(result)=>result.data,
    })
}