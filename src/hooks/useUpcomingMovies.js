import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../utils/api'


const fetchUpcomingMovies =() =>{
    return api.get('/movie/upcoming')
}

const useUpcomingMovies = () => {
  return useQuery({
    queryKey:['upcoming'],
    queryFn:fetchUpcomingMovies,
    select:(item)=>item.data,
  }
    
  )
}

export default useUpcomingMovies