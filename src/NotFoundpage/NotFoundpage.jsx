import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import './NotFoundpage.style.css';


const NotFoundPage = () => {
  useEffect(() => {
    const container = document.querySelector('.lottie-animation');
    if (container) {
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json'
      });
    }
  }, []);

  return (
    <div className="error-container">
      <div className="lottie-animation" style={{ width: '300px', height: '300px' }}></div>
      <div className="error-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">HOME</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
