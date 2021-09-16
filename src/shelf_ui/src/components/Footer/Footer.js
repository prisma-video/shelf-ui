import React from 'react';

const Footer = () => (
<footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer__content">
            <a href="index.html" className="footer__logo">
              <img src="img/logo.svg" alt="" />
            </a>

            <span className="footer__copyright">© THE SHELF SA, 2021</span>

            <nav className="footer__nav">
              <a href="about.html">About Us</a>
              <a href="contacts.html">Contacts</a>
              <a href="contacts.html">Terms & Conditions</a>
              <a href="privacy.html">Privacy policy</a>
            </nav>

            <button className="footer__back" type="button">
              <i className="icon ion-ios-arrow-round-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;