import React from 'react'
import { Alert,Spinner  } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const PopularMovieSlide = () => {

    const{data,isLoading,isError,error}=usePopularMoviesQuery()

    if (isLoading) {
      return (
        <div className="spinner-container" style={{ textAlign: 'center', padding: '2rem' }}>
          <Spinner 
          animation="border" 
          variant="secondary"
          style={{ width: '5rem', height: '5rem' }} />
        </div>
      );
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
        title='popular movies' 
        movies={data.results} 
        responsive={responsive}/>
    </div>
  )
}

export default PopularMovieSlide