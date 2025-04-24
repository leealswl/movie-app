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

// 최대 페이지 수 500 최상단에 넣어놔야 렌더링될때마다 재선언되지 않음
const TMDB_MAX_PAGE = 500

const Moviepage = () => {
  const [query] =useSearchParams()
  const keyword =query.get('q')
  const [page,setPage] = useState(1)
  

  const {data,isLoading,isError,error}=useSearchMovieQuery({keyword,page})
  console.log("무비데이터",data)

  
  const rawTotalPages = data?.total_pages ?? 0
  const pageCount = Math.min(rawTotalPages, TMDB_MAX_PAGE)
 
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

  
  if (keyword && data.results.length === 0) {
    return (
      <Container className="py-5 no-results-container d-flex justify-content-center">
        <Alert variant="dark" className="text-center" style={{ backgroundColor: '#000', color: '#fff', border: 'none' ,maxWidth: '600px', width: '100%' }}>
          “{keyword}”에 대한 검색 결과가 없습니다.
        </Alert>
      </Container>
    );
  }
  

  return (
    <div className='movie-movie'>
      <Container>
        <Row>
          <div className="d-flex align-items-center gap-4 mb-4">
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-sort">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/movies">Popularity</Dropdown.Item>
                <Dropdown.Item href="/">Top Rated</Dropdown.Item>
                <Dropdown.Item href="/">Upcoming</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-genre">
                Genre
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
  
            
          <Col lg={12} xs={12}>
            <Row className='g-4'>
              {data?.results.map((movie,index)=>(
          <Col key={index} lg={3} xs={12}>
            <MovieCard movie={movie}/>
          </Col>
          ))}
            </Row>
            {pageCount > 0 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={10}
              marginPagesDisplayed={1}
              pageCount={pageCount} //전체페이지가 몇개인지 콘솔에서 확인
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              // breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page-1}
              />
              )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Moviepage