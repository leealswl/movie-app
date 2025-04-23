import React from 'react'
import { Alert,Spinner } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import "./Banner.style.css"
import { FaStar, FaRegStar } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import TrailerModal from '../../../MovieDetail/TrailerModal';
import { useMovieVideos } from '../../../../hooks/useVideoMovies';
import { useState } from 'react';


const Banner = () => {

    const {data, isLoading, isError,error }=usePopularMoviesQuery()
    
    const movieId = data?.results?.[0]?.id;
    const {data:trailer, 
          isLoading: isTrailerLoading} =useMovieVideos(movieId)
          //console.log("트레일러데이터",trailer)

    const [showModal, setShowModal] = useState(false);
    const [trailerKey, setTrailerKey] = useState('');

    if (isLoading || isTrailerLoading) {
      return (
        <div className="spinner-container" style={{ textAlign: 'center', padding: '2rem' }}>
          <Spinner animation="border" variant="secondary" style={{ width: '5rem', height: '5rem' }} />
        </div>
      );
    }
    if (isError) {
      return <Alert variant="danger">{error.message}</Alert>;
    }

    const movie = data?.results?.[0];
    if (!movie) {
        return <div>No movie data available</div>;
    }
    const posterUrl = `https://www.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}`;

    const handleShowTrailer = () => {
      if (!isTrailerLoading && trailer?.length > 0) {
        setTrailerKey(trailer[0].key);
        setShowModal(true);
      } else {
        alert('예고편 정보가 없습니다.');
      }
    };

    const rating = movie.vote_average; 
    const starCount = Math.round(rating / 2);
    const totalStars = 5;

    
    return (
    <div style={{
        backgroundImage: `url(${posterUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
    className="banner">
        <div className='text-white banner-text-area'>
        <h1 className="main-title">
            {movie.title}
            <span className="release-year">({movie.release_date.slice(0, 4)})</span>
        </h1>
            <div className="rating">
                {[...Array(totalStars)].map((_, i) => {
                  return i < starCount ? (
                    <FaStar key={i} color="gold" size={20} />
                  ) : (
                    <FaRegStar key={i} color="gold" size={20} />
                  );
                })}
            </div>
            <p className='main-overview'>{movie.overview}</p>
            <Button variant="light" onClick={handleShowTrailer}>Preview</Button>

            <TrailerModal
            show={showModal}
            onHide={() => setShowModal(false)}
            trailerKey={trailerKey}
            title={movie.title}
          />
        </div>
    </div>
  )
}

export default Banner