import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.style.css'
import MovieCard from '../MovieCard/MovieCard';
import { FaFilm } from 'react-icons/fa';



const MovieSlider = ({title,movies,responsive}) => {
    
  return (
    <div className='main-movieslider'>
        <h3 className='main-moviename'>
        <FaFilm className="main-icon" />{'  '}
        {title}</h3>
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
            {movies.map((movie,index)=>
            (<MovieCard movie={movie} key={index}/>
            ))}
         </Carousel>
    </div>
  )
}

export default MovieSlider