import React from 'react'
import { Alert } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import "./Banner.style.css"


const Banner = () => {

    const {data, isLoading, isError,error }=usePopularMoviesQuery()
    console.log("dddd",data)
    if(isLoading){
        <h1>Loading --- 로딩스피너 넣기</h1>
    }
    if(isError){
        <Alert variant="danger">{error.message}</Alert>
    }
  return (

    

    <div style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[1].backdrop_path}`+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
    className="banner">
        <div className='text-white banner-text-area'>
            <h1>{data?.results[0].title}</h1>
            <p>{data?.results[0].overview}</p>
        </div>
        Banner</div>
  )
}

export default Banner