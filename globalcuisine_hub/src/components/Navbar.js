import React from "react";

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navbar: Top navigation bar for logo/brand and navigation links.
   * Will include auth controls and nav links in full implementation.
   */
  return (
    <nav className="navbar">
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="logo">
          <span className="logo-symbol" role="img" aria-label="globe">🌎</span>
          <span>GlobalCuisine Hub</span>
        </div>
        <div className="nav-links">
          {/* Placeholder for navigation + auth buttons */}
          <button className="btn btn-small accent">Login</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
