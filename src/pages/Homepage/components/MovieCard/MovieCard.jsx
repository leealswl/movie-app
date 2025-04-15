import React from 'react'
import { Badge, Button } from 'react-bootstrap';
import "./MovieCard.style.css"

//{movie}는 슬라이더에서 가져옴
const MovieCard = ({movie}) => {
  return (
    <div
    style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`+")",
    }}
    className='movie-card'>
        <div className='overlay'>
            <h1>{movie.title}</h1>
            {movie.genre_ids.map((id)=>(
            <Badge bg="danger">{id}</Badge>
            ))}
        <div>
                {movie.vote_average}
            </div>
            <div>
                {movie.populartiy}
            </div>
            <div>
                {movie.adult?'over18':""}
            </div>
        </div>
        <div>
            <div>
                {movie.vote_average}
            </div>
            <div>
                {movie.populartiy}
            </div>
            <div>
                {movie.adult?'over18':""}
            </div>
        </div>
    </div>
  )
}

export default MovieCard