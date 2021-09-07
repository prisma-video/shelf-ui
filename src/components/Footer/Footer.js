import React from 'react';

const Footer = () => (
<footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="footer__content">
            <a href="index.html" class="footer__logo">
              <img src="img/logo.svg" alt="" />
            </a>

            <span class="footer__copyright">© THE SHELF SA, 2021</span>

            <nav class="footer__nav">
              <a href="about.html">About Us</a>
              <a href="contacts.html">Contacts</a>
              <a href="contacts.html">Terms & Conditions</a>
              <a href="privacy.html">Privacy policy</a>
            </nav>

            <button class="footer__back" type="button">
              <i class="icon ion-ios-arrow-round-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;