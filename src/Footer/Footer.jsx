import React from 'react';
import './Footer.style.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="movie-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p>Experience the magic of cinema.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/">Movies</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
        <div className="footer-social">
          <a href="/" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieVerse. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
