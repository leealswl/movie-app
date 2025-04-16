import React from 'react'
import { Alert } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovieSlide.style.css'
import { BiSolidCameraMovie } from "react-icons/bi";

const PopularMovieSlide = () => {

    const{data,isLoading,isError,error}=usePopularMoviesQuery()

    if(isLoading){
        return <h1>Loading --- 로딩스피너 넣기</h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }
    // data 또는 data.results가 undefined인 경우 처리
    if (!data || !data.results) {
        return <div>No movie data available</div>;
    }
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5 //보여질 갯수
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };

  return (
    <div>
        <h3 className='main-popular-movie'>
        <BiSolidCameraMovie  style={{ fontSize: '3rem' }}/>{' '}
             popular movies</h3>
             <Carousel
            infinite={true} 
            centerMode={false}
            containerClass="carousel-container"
            itemClass="movie-slider"
            responsive={responsive}
            arrows={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            >
            {data.results.map((movie,index)=>
            (<MovieCard movie={movie} key={index}/>
            ))}
        </Carousel>
    </div>
  )
}

export default PopularMovieSlide