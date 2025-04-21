import React, {useState} from 'react'
import { Badge, Button } from 'react-bootstrap';
import "./MovieCard.style.css"
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TbNumber19Small } from "react-icons/tb";
import { FaStar } from 'react-icons/fa';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

//{movie}는 슬라이더에서 가져옴
const MovieCard = ({movie}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
      };

    const {data:genreData} = useMovieGenreQuery()
    //console.log("gg",genreData)

    const showGenre =(genreIdList)=>{
        if(!genreData) return [] //장르를 안보여줌
        const genreNameList=genreIdList.map((id)=>{
          const genreObj =genreData.find((genre)=>genre.id ===id)
          return genreObj.name;
        })

        return genreNameList

    }


      const posterUrl = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`;
  return (
    <div
    style={{
      backgroundImage: `url(${posterUrl})`,
    }}
    className='movie-card'>
        <div className='overlay'>
            <h2 className='moviecard-title'>{movie.title}</h2>
            {showGenre(movie?.genre_ids).map((id)=>(
            <Badge className='moviecard-badge' bg="danger">{id}</Badge>
            ))}
        <div>
                <FaStar color="gold" size={20} />
                 {movie.vote_average.toFixed(1)}
            </div>
            <div className='moviecard-adult'>
                {movie.adult?<TbNumber19Small /> : "ALL"}
            </div>
            <div className="heart-button-container">
        <Button variant="link" onClick={toggleFavorite} className="heart-button">
          {isFavorite ? <FaHeart color="red" size={24} /> : <FaRegHeart color="red" size={24} />}
        </Button>
      </div>
        </div>
    </div>
  )
}

export default MovieCard