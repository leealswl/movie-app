import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchCredit=({movieId})=>{
    return api.get(`/movie/${movieId}/credits`)
}

export const useCredit=(movieId)=>{
    return useQuery({
        queryKey:['movie-credit',movieId],
        queryFn:()=>fetchCredit({movieId}),
        select:(result)=>result.data,
    })
}