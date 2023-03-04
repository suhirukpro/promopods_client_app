import React from "react";

import moment from "moment";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="text-center footer py-2 footer-text pl-3 pr-3">
      <div className="container-fluid">
        <p className="m-0">Copyright {moment().year()} - AdGiftsOnline </p>
      </div>
    </footer>
  );
};

export default Footer;
