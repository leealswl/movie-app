import React from 'react';
import { Alert } from 'react-bootstrap';
import { useMovieVideos } from '../../../../hooks/useVideoMovies';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import "./Banner.style.css";

function MovieInfo() {
  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
    error: popularErrorObj,
  } = usePopularMoviesQuery();


  const movieItem = popularData?.results?.[0];

  const movieId = movieItem?.id;

  
  const {
    data: videoData,
    isLoading: videoLoading,
    isError: videoError,
    error: videoErrorObj,
  } = useMovieVideos(movieId);

  if (popularLoading) {
    return <h1>Loading --- 로딩스피너 넣기</h1>;
  }
  if (popularError) {
    return <Alert variant="danger">{popularErrorObj.message}</Alert>;
  }
  if (!movieItem) {
    return <div>No movie data available</div>;
  }

  if (videoLoading) {
    return <div>Loading video data...</div>;
  }
  if (videoError) {
    return <Alert variant="danger">Video Error: {videoErrorObj.message}</Alert>;
  }

  // videoData는 useMovieVideos 훅에서 선택(select) 옵션에 따라 비디오 목록 배열을 반환한다고 가정합니다.
  // YouTube 트레일러 타입의 비디오 찾기
  const trailer = videoData?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  const youtubeUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

  return (
    <div className="banner" onClick={() => console.log('비디오 클릭됨!')}>
      {youtubeUrl ? (
        <iframe
          width="560"
          height="315"
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
}

export default MovieInfo;
