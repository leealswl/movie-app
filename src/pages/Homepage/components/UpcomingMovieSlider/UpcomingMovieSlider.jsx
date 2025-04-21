import React from 'react'
import useUpcomingMovies from '../../../../hooks/useUpcomingMovies'
import { Alert } from 'react-bootstrap'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';



const UpcomingMovieSlider = () => {

    const {data,isLoading,isError,error}=useUpcomingMovies()
    //console.log("업커밍",data)

    if(isLoading) {
        return <h1>Loading</h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }
    // data 또는 data.results가 undefined인 경우 처리
    if (!data || !data.results) {
        return <div>No movie data available</div>;
    }
  return (
    <div>
        <MovieSlider 
        title ="upcoming movies"
        responsive={responsive}
        movies={data.results} 
        />
    </div>
  )
}

export default UpcomingMovieSlider