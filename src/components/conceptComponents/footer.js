import React from 'react'

const Footer = ({MozLight}) => <>
  <footer className="mzp-c-footer">
    <div className="mzp-l-content">
      <nav className="mzp-c-footer-secondary">
        <a href="https://www.mozilla.org/">
          <img src={MozLight} alt="mozilla" height="32px" width="auto"/>
        </a>
        <div className="mzp-c-footer-legal">
          <ul className="mzp-c-footer-terms">
            <li><a href="https://www.mozilla.org/privacy/websites/" target="_blank" rel="noopener noreferrer">Privacy</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </footer>
</>

export default Footer
