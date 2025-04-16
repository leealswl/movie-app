import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchTopratedMovies=()=>{
    return api.get('/movie/top_rated')
}

const useTopratedMovies = () => {
  return (
    useQuery({
        queryKey:['movie-top_rated'],
        queryFn:fetchTopratedMovies,
        select:(item)=>item.data,
    
    })
  )
}

export default useTopratedMovies