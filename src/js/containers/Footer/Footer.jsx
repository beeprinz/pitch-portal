import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <footer className="clearfix card-footer text-muted">
            <div className="container">
                <div className="row">
                    <ul className="col col-md-5">
                        <li id="oca-address">350 Tenth Ave Suite #900<br />San Diego, CA 92101</li>
                        <li><a id="oca-phone" href="tel:858-633-7385">(858) 633-7385</a></li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col col-md-5 float-right">
                        <a id="twitter-icon" target="_blank" href="https://twitter.com/origincodeacad"><i className="fab fa-twitter fa-1x mr-2"></i></a>
                        <a id="facebook-icon" target="_blank" href="https://www.facebook.com/OriginCodeAcademy/"><i className="fab fa-facebook-f mr-2"></i></a>
                        <a id="instagram-icon" target="_blank" href="https://www.instagram.com/origin_code_academy/"><i className="fab fa-instagram mr-2"></i></a>
                        <a id="youtube-icon" target="_blank" href="https://www.youtube.com/channel/UC7u4iEq2XLUx4CHcvjp3nuQ"><i className="fab fa-youtube mr-2"></i></a>
                        <a id="linkedin-icon" target="_blank" href="https://www.linkedin.com/company/10687359/"><i className="fab fa-linkedin-in mr-2"></i></a>
                        <a id="google-icon" target="_blank" href="https://plus.google.com/108005976501611490766"><i className="fab fa-google-plus-g mr-2"></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-5">© Copyright 2017 - Origin Code Academy</div>
                </div>
            </div>
        </footer>

    );
  }
};
