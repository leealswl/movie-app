import React from 'react'
import { Alert } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import "./Banner.style.css"
import { FaStar, FaRegStar } from 'react-icons/fa';


const Banner = () => {

    const {data, isLoading, isError,error }=usePopularMoviesQuery()
    console.log("dddd",data)
    if(isLoading){
        <h1>Loading --- 로딩스피너 넣기</h1>
    }
    if(isError){
        <Alert variant="danger">{error.message}</Alert>
    }

    const movie = data?.results?.[0];
    if (!movie) {
        return <div>No movie data available</div>;
    }
    
    // vote_average는 0~10 사이의 값 5단계 별로 표현하기 위해 2로 나눕니다.
    const rating = movie.vote_average; 
    const starCount = Math.round(rating / 2); // 0~5 별
    const totalStars = 5;
    return (

    

    <div style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}`+")",
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
        </div>
    </div>
  )
}

export default Banner