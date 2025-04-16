import React from 'react'
import useTopratedMovies from '../../../../hooks/useTopratedMovies'
import 'react-multi-carousel/lib/styles.css';
import { Alert } from 'react-bootstrap'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const TopratedMovieSlieder = () => {

    const {data, isLoading, isError, error}=useTopratedMovies()
    console.log("탑데이터",data)

    if(isLoading){
        return <h1>Loading </h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }
    // data 또는 data.results가 undefined인 경우 처리
    if (!data || !data.results) {
        return <Alert variant="danger">
            <div>No movie data available</div>
            </Alert>;
    }
    
  return (
    <div>
        <MovieSlider
        title='top rated movies' 
        movies={data.results} 
        responsive={responsive}/>
    </div>
  )
}

export default TopratedMovieSlieder