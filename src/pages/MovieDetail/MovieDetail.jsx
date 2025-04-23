import React from 'react'
import { Alert,Spinner,Col,Row, Container,Image, Badge, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useCredit } from '../../hooks/useCredit'
import { useDetailMovie } from '../../hooks/useDetailMovie'
import './MovieDetail.style.css'
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useState } from 'react'
import { useMovieVideos } from '../../hooks/useVideoMovies'
import TrailerModal from './TrailerModal'
import { FaPlayCircle } from 'react-icons/fa';
import Review from './Review'
import { useReview } from '../../hooks/useReview'
import MovieCast from './MovieCast'



const MovieDetail = () => {

  const {id}=useParams()
  const {data, isError, isLoading, error}=useDetailMovie(id)
  //console.log("디테일데이타",data)

  const {data: credit,
    isLoading: isCreditLoading,
    isError: isCreditError,
    error: creditError
    } =useCredit(id)
    console.log("크레딧데이터",credit)

  const {data:trailer, 
    isLoading: isTrailerLoading} =useMovieVideos(id)
    //console.log("트레일러데이터",trailer)

  const {data:reviewData,
  isLoading:isReviewLoading}=useReview(id)
  //console.log("리뷰",reviewData)

  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const handleShowTrailer = () => {
    if (!isTrailerLoading && trailer?.length > 0) {
      setTrailerKey(trailer[0].key);
      setShowModal(true);
    } else {
      alert('예고편 정보가 없습니다.');
    }
  };
    
  if (isLoading || isCreditLoading ||isReviewLoading) {
    return (
      <div className="spinner-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <Spinner 
        animation="border" 
        variant="secondary"
        style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }
  if(isError || isCreditError){
    const message = isError ? error.message : creditError.message;
    return <Alert variant="danger">{message}</Alert>;
  }
  const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`

  const rating = data.vote_average; 
  const starCount = Math.round(rating / 2);
  const totalStars = 5;

  return (
    <div>

    <div>
      <Container  className="py-5">
        <Row className="justify-content-center detail-row">
          <Col lg={4} xs={12}>
            <Image
                src={posterUrl}
                alt={data.title}
                fluid                     
                rounded                    
              />
          </Col>
          <Col lg={6} xs={12}>
          <h1>
            <span className="fw-bold">{data?.title}</span>{' '}
            <Button variant="link" className="p-0" onClick={handleShowTrailer} 
            style={{ 
              cursor: 'pointer', 
              verticalAlign: 'middle'   
            }}>
            <FaPlayCircle size={40} color="#E50914" />
            </Button>

          <TrailerModal
            show={showModal}
            onHide={() => setShowModal(false)}
            trailerKey={trailerKey}
            title={data?.title}
          />
          </h1>
          <p className='detail-tagline'>{data?.tagline}</p>
          <p className='detail-overview'>{data?.overview}</p>
          
          <p className='detail-genre'>
          &#8226; Genres : {' '}
            {data?.genres.map((genre) => (
            <Badge key={genre?.id} bg="badge text-bg-secondary" className="moviecard-badge me-1"
            style={{ 
              fontSize: '1rem',
            }}>
              {genre?.name}
            </Badge>
            ))}
          </p>
          <p className="rating"> &#8226;  Rating :
                {[...Array(totalStars)].map((_, i) => {
                  return i < starCount ? (
                    <FaStar key={i} color="gold" size={20} />
                  ) : (
                    <FaRegStar key={i} color="gold" size={20} />
                  );
                })}
          </p>
          <p className='detail-release'>  &#8226; Release : {data?.release_date}  </p>
          <p className='detail-run'>&#8226;  Run Time : {data?.runtime} minute   </p>
          <p className='detail-budget'>&#8226;  Budget : $ {data?.budget}</p>
          <p className='detail-crew'>&#8226; Director : {credit?.crew?.slice(0,2).map(crew => crew.name).join(", ")} </p>
          </Col>
        </Row>
      </Container>
      <Container className='detail-section'>
          <MovieCast credit={credit}/>
          <div>&#8226; Recommand movie 영역</div>
          <Review reviews={reviewData}/>
      </Container>
    </div>
    </div>
    
  )
}

export default MovieDetail