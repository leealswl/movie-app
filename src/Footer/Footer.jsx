import React from 'react';
import './Footer.style.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const noop = (e) => e.preventDefault()
  return (
    <footer className="movie-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p>Experience the magic of cinema.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/movies/671">Detail</a>
          <a href="/" onClick={noop} >Contact</a>
        </div>
        <div className="footer-social">
          <a href="/" onClick={noop} target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="/" onClick={noop}  target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="/" onClick={noop} target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="/"onClick={noop}  target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieWeb. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
