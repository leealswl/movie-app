import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"


const fetchReview=({movieId}) =>{
    return api.get(`/movie/${movieId}/reviews`)
}

export const useReview =(movieId) =>{
    return useQuery({
        queryKey:['movie-review',movieId],
        queryFn:()=>fetchReview({movieId}),
        select:(result)=>result.data,
    })
}