import React from 'react'
import { Alert,Col,Container,Row,Spinner  } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import './Moviepage.style.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';


//무비페이지 경로 2가지
// 네브바 클릭 => 인기영화 보여줌
// 키워드 입력해서 온경우 => 키워드와 관련된 영화보여줌

//페이지네이션
//page state 만들기
//페이지네이션 클릭할대마다 page 바꾸기
/// page값이 바뀔대마다 useSearchmovie 에 page까지 넣어서 fetch
const Moviepage = () => {
  const [query] =useSearchParams()
  const keyword =query.get('q')
  const [page,setPage] = useState(1)

  const {data,isLoading,isError,error}=useSearchMovieQuery({keyword,page})
  console.log("무비데이터",data)


  const handlePageClick=({selected})=>{
    setPage(selected+1)
  }
    

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
              <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie,index)=>(
          <Col key={index} lg={4} xs={12}>
            <MovieCard movie={movie}/>
          </Col>
          ))}
            </Row>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages} //전체페이지가 몇개인지 콘솔에서 확인
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page-1}
              />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Moviepage