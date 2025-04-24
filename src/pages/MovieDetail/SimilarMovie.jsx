import React from 'react'
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import { responsive } from '../../constants/responsive';



const SimilarMovie = ({ similar }) => { 
  if (!similar?.results?.length) {
    return (
        <>
        <div className='detail-similar'>&#8226; Recommand</div>
        <p className="text-center">There are No Recommand movies.</p>
        </>
    )
     } 
  
  return (
    <div className="similar-section mb-5" style={{ overflow: 'hidden' }}>
      &#8226; Similar Movie
        <MovieSlider 
          movies={similar.results.slice(0, 10)} 
          responsive={responsive} 
          showTitle={false} 
          partialVisible={false} 
          containerClass="carousel-container no-pad"
          itemClass="movie-slider no-gutter"
        />
    </div>
  );
};


export default SimilarMovie