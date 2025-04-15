import React from 'react'
import { Alert } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import "./Banner.style.css"

function MovieInfo({ movie }) {

    const {data, isLoading, isError,error }=usePopularMoviesQuery()
    console.log("dddd",data)
    if(isLoading){
        <h1>Loading --- 로딩스피너 넣기</h1>
    }
    if(isError){
        <Alert variant="danger">{error.message}</Alert>
    }

        // data?.results[1]를 movieItem 변수에 담음
    const movieItem = data?.results[1];

    // video 값이 false면 backdrop_path를, 그렇지 않다면 poster_path를 사용(필요에 따라 수정)
    // const backgroundUrl = movieItem && !movieItem.video
    //     ? `url(https://www.themoviedb.org/t/p/w533_and_h300_bestv2${movieItem.backdrop_path})`
    //     : `url(https://www.themoviedb.org/t/p/w533_and_h300_bestv2${movieItem.poster_path})`;

  return (
    <div style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${movieItem.video}`+")",
    }} 
    className="banner">
        <p>Video availability: {movieItem.video ? "Available" : "Not available"}</p>
  </div>
    );
  }

export default MovieInfo