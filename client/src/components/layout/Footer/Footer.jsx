import React from 'react';
import playStore from './playstore.png';
import appStore from './Appstore.png';
import './footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Deep Coomer</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/deepcoomer07">Instagram</a>
        <a href="/">Linkedin</a>
        <a href="http://instagram.com/DeepCoomer">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer