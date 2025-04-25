import React from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import ReactPaginate from 'react-paginate';
import './Moviepage.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useState,useEffect  } from 'react';


// 무비페이지 경로 2가지
// 네브바 클릭 => 인기영화 보여줌
// 키워드 입력해서 온경우 => 키워드와 관련된 영화보여줌

// 페이지네이션
// page state 만들기
// 페이지네이션 클릭할대마다 page 바꾸기
// page 값이 바뀔 때마다 useSearchMovieQuery 에 page까지 넣어서 fetch

// 최대 페이지 수 100 최상단에 넣어놔야 렌더링될때마다 재선언되지 않음
const MAX_PAGE = 500;

export default function Moviepage() {
  const [searchParams] = useSearchParams();
  const keyword     = searchParams.get('q')     || '';
  const [page, setPage]                 = useState(1);
  const [sortOption, setSortOption]     = useState('popularity.desc'); // 'popularity.desc' or 'popularity.asc'
  const [genreFilter, setGenreFilter]   = useState('');

  useEffect(() => {
    setPage(1);
  }, [keyword, sortOption, genreFilter]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, sortOption, genreFilter });
  console.log("무비데이터", data);
  const { data: genres, isLoading: isGenreLoading } = useMovieGenreQuery();
  //console.log("장르데이터", genres);

  if (isLoading || isGenreLoading) {
    return (
      <div className="spinner-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <Spinner animation="border" variant="secondary" style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const movies       = data?.results || [];
  const rawTotal     = typeof data?.total_pages === 'number'
                       ? data.total_pages
                       : 0;
  const pageCount    = Math.min(rawTotal, MAX_PAGE);

  if (keyword && movies.length === 0) {
    return (
      <Container className="py-5 no-results-container d-flex justify-content-center">
        <Alert
          variant="dark"
          className="text-center"
          style={{ backgroundColor: '#000', color: '#fff', border: 'none', maxWidth: '600px', width: '100%' }}
        >
          “{keyword}”에 대한 검색 결과가 없습니다.
        </Alert>
      </Container>
    );
  }

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = option => {
    setSortOption(option);
    setGenreFilter('');   // 정렬 변경 시 장르 초기화
  };

  const handleGenreChange = genre => {
    setGenreFilter(genre);
  };

  return (
    <div className="movie-movie">
      <Container>
        <Row>
          <div className="d-flex align-items-center gap-4 mb-4">
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-sort">
                {sortOption === 'popularity.desc' ? 'Popular' : 'Least Popular'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('popularity.desc')}>
                Popular
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('popularity.asc')}>
                Least Popular
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-genre">
                {genreFilter ? (genres.find(g => String(g.id) === genreFilter)?.name || 'Unknown') : 'Genres'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleGenreChange('')}>
                  ALL
                </Dropdown.Item>
                {genres.map(({ id, name }) => (
                  <Dropdown.Item key={id} onClick={() => handleGenreChange(String(id))}>
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Col lg={12} xs={12}>
            <Row className="g-4">
              {movies.map(movie => (
                <Col key={movie.id} lg={3} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>

            {pageCount > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
