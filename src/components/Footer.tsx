import React from 'react';
import '../styles/index.css';

/**
 * Отображает "подвал" страницы.
 * Он содержит несколько колонок с заголовками и списками ссылок.
 * Все ссылки - заглушки.
 *
 * @component
 * @returns {React.FC} Футер.
 */
const Footer: React.FC = () => {
  return (
    <footer>
      <div className='footer-top'>
        <div className='container'>
          <div className='footer-top-col'>
            <h2 className='footer-heading'>Company</h2>
            <ul className='footer-links'>
              <li><a href="#">About Last.fm</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Features</a></li>
            </ul>
          </div>
          <div className='footer-top-col'>
            <h2 className='footer-heading'>Help</h2>
            <ul className='footer-links'>
              <li><a href="#">Track My Music</a></li>
              <li><a href="#">Community Support</a></li>
              <li><a href="#">Community Guidelines</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
          <div className='footer-top-col'>
            <h2 className='footer-heading'>Goodies</h2>
            <ul className='footer-links'>
              <li><a href="#">Download Scrobbler</a></li>
              <li><a href="#">Developer API</a></li>
              <li><a href="#">Free Music Downloads</a></li>
              <li><a href="#">Merchandise</a></li>
            </ul>
          </div>
          <div className='footer-top-col'>
            <h2 className='footer-heading'>Account</h2>
            <ul className='footer-links'>
              <li><a href="#">Sign Up</a></li>
              <li><a href="#">Log In</a></li>
              <li><a href="#">Subscribe</a></li>
            </ul>
          </div>
          <div className='footer-top-col'>
            <h2 className='footer-heading'>Follow Us</h2>
            <ul className='footer-links'>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">X</a></li>
              <li><a href="#">Bluesky</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;