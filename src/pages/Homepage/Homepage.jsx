import React from 'react'
import Banner from './components/Banner/Banner';
import BannerVideo from './components/Banner/BannerVideo';
import './Homepage.style.css';


//배너만들기 =>인기영화 처음영화 보여주기
//인기영화 탑레이티드무비,업커밍무비
const Homepage = () => {
  return (
    <div className='main-home'>
      <Banner />
      {/* <BannerVideo /> */}
    </div>
  )
}

export default Homepage