import React from 'react'
import { Alert,Col,Container,Row,Spinner  } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import './Moviepage.style.css';



//무비페이지 경로 2가지
// 네브바 클릭 => 인기영화 보여줌
// 키워드 입력해서 온경우 => 키워드와 관련된 영화보여줌

//페이지네이션
//page state 만들기
//페이지네이션 클릭할대마다 page 바꾸기
/// page값이 바뀔대마다 useSearchmovie 에 page까지 넣어서 fetch
const Moviepage = () => {
  const [query, setQuery] =useSearchParams()
  const keyword =query.get('q')

  const {data,isLoading,isError,error}=useSearchMovieQuery({keyword})
  console.log("무비데이터",data)

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
  // data 또는 data.results가 undefined인 경우 처리
  if (!data || !data.results) {
      return <div>No movie data available</div>;
  }
  return (
    <div className='movie-movie'>
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            필터
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie,index)=>(
          <Col key={index} lg={4} xs={12}>
            <MovieCard movie={movie}/>
          </Col>
          ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Moviepage