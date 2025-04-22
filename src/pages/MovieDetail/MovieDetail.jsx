import React from 'react'
import { Alert,Spinner,Col,Row, Container,Image, Badge,Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useCredit } from '../../hooks/useCredit'
import { useDetailMovie } from '../../hooks/useDetailMovie'
import './MovieDetail.style.css'
import { FaStar, FaRegStar } from 'react-icons/fa';


const MovieDetail = () => {

  const {id}=useParams()
  const {data, isError, isLoading, error}=useDetailMovie(id)
  console.log("디테일데이타",data)

  const {data: credit,
    isLoading: isCreditLoading,
    isError: isCreditError,
    error: creditError
    } =useCredit(id)
    console.log("크레딧데이터",credit)

  
    
  if (isLoading || isCreditLoading) {
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
  const castUrl = `https://media.themoviedb.org/t/p/w276_and_h350_face/${credit.cast[0].profile_path}`

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
            <span className="release-year">({data?.release_date.slice(0, 4)})</span>
          </h1>
          <p className='detail-tagline'>{data?.tagline}</p>
          <p className='detail-overview'>{data?.overview}</p>
          
          <p className='detail-genre'>
          &#8226; Genres : {' '}
            {data?.genres.map((genre) => (
            <Badge key={genre?.id} bg="badge text-bg-secondary" className="moviecard-badge me-1">
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
          <p className='detail-run'>&#8226;  Run Time : {data?.runtime} minute </p>
          
          <p className='detail-crew'>&#8226; Director : {credit?.crew?.slice(0,2).map(crew => crew.name).join(", ")} </p>
          <Button >미리보기 url 유튜브 연결</Button>
          </Col>
        </Row>
      </Container>
      <Container className='detail-credit'>
        <div className='credit-cast'>&#8226; CAST</div>
      <div className=''>
      {credit?.cast?.length > 0 && (
        <Card style={{ width: '13rem', height: '22rem' }}>
          <Card.Img
            variant="top"
            src={`https://media.themoviedb.org/t/p/w276_and_h350_face/${credit.cast[0].profile_path}`}
            alt={credit.cast[0]?.name}
          />
          <Card.Body>
            <Card.Title>{credit.cast[0].character}</Card.Title>
            <Card.Text>{credit.cast[0].name}</Card.Text>
          </Card.Body>
        </Card>
          )}
          </div>
      </Container>
    </div>
    </div>
    
  )
}

export default MovieDetail