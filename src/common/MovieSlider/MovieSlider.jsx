import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.style.css'
import MovieCard from '../MovieCard/MovieCard';
import { FaFilm } from 'react-icons/fa';




const MovieSlider = ({title,movies,responsive,showTitle=true}) => {
    
  return (
    <div className="main-movieslider">
      {showTitle && (
        <h3 className="main-moviename">
          <FaFilm className="main-icon" />{' '}
          {title}
        </h3>
      )}

{/*  <Carousel arrows={false} showDots={true} renderDotsOutside={renderButtonGroupOutside}> */}
         <Carousel
            partialVisible={true}
            swipeable={true}              // 터치 스와이프 활성화
            draggable={true}
            showDots={true}
            slidesToSlide={5}
            infinite={true} 
            centerMode={false}
            containerClass="carousel-container"
            itemClass="movie-slider"
            responsive={responsive}
            arrows={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            removeArrowOnDeviceType={['mobile']}
            >
            {movies?.map((movie,index)=>
            (<MovieCard movie={movie} key={index}/>
            ))}
         </Carousel>
    </div>
  )
}

export default MovieSlider