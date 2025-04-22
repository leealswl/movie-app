import React from 'react'
import { Alert,Spinner,Col,Row, Container,Image, Badge,Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useCredit } from '../../hooks/useCredit'
import { useDetailMovie } from '../../hooks/useDetailMovie'
import './MovieDetail.style.css'


const MovieDetail = () => {

  const {id}=useParams()
  const {data, isError, isLoading, error}=useDetailMovie(id)
  console.log("디테일데이타",data)

  const {data: credit,
    } =useCredit(id)
    console.log("크레딧데이터",credit)

  if (isLoading) {
    return (
      <div className="spinner-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <Spinner 
        animation="border" 
        variant="secondary"
        style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }
  if(isError){
      return <Alert variant="danger">{error.message}</Alert>
  }
  const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`

  const castUrl = `https://media.themoviedb.org/t/p/w276_and_h350_face/${credit.cast[0].profile_path}`

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
          <p className='detail-release'>  &#8226; Release : {data?.release_date}  &#8226;  Run Time : {data?.runtime} minute </p>
          <p className='detail-crew'>&#8226; Director : {credit?.crew?.slice(0,2).map(crew => crew.name).join(", ")} </p>
          <div>
          <Card style={{ width: '10rem', height:'13rem' }}>
            <Card.Img variant="top" src={castUrl} />
            <Card.Body>
              <Card.Title>{credit?.cast[0].character}</Card.Title>
              <Card.Text>
              {credit?.cast[0].name}
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          
          
          
          

          </Col>
        </Row>
      </Container>
    </div>
    </div>
    
  )
}

export default MovieDetail