import React from "react";
import { Link } from "react-router-dom";
//navbar, included links as opposed to href to avoid fully reloading the page
//toggle still not working still need to implement a proper react bootstrap. needs more research
function NavBar() {
  return (
    <div className="navContainer">
      <nav className="navMarginLeft navbar navbar-expand-sm navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          ProfileBook
        </Link>

        {/* toggle not working on page resizing - perhaps an issue with scripts */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Create Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link">
                Search Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
