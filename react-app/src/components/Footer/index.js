import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-wrapper footer">
      <div className="footer-container">
        <div className="content-container">
          <div className="content-info">
            <div className="info">
              <div className="name">Steven Sauseda</div>
              <ul className="link-list">
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/SSauseda"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                </li>

              </ul>
            </div>
            <div className="info">
              <div className="name">Erin Taylor</div>
              <ul className="link-list">
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/bergmazz"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                </li>

              </ul>
            </div>
            <div className="info">
              <div className="name">Lola Marrero</div>
              <ul className="link-list">
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/lola831"
                  >
                <i className="fab fa-github fa-2x"></i>
                  </a>
                </li>

              </ul>
            </div>
            <div className="info">
              <div className="name">Zakaria Abdullahi</div>
              <ul className="link-list">
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/ZakAbdu"
                  >
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
