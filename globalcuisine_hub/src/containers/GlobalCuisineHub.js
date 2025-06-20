import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * Main container for the GlobalCuisine Hub application.
 * Provides layout: navigation bar, search bar (accent color), and recipe display area.
 * Uses a light, scalable design and reserves space for future features.
 */
function GlobalCuisineHub() {
  return (
    <div className="gch-app light-theme">
      {/* Navigation Bar */}
      <nav className="gch-navbar">
        <div className="gch-navbar-content">
          <div className="gch-logo">
            <span className="gch-logo-symbol" role="img" aria-label="globe">
              🌍
            </span>
            GlobalCuisine Hub
          </div>
          {/* Reserved for nav links or user actions */}
          <div className="gch-navbar-links">
            {/* e.g., <a href="#">Login</a> */}
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="gch-main">
        {/* Search Bar */}
        <section className="gch-searchbar-section">
          <input
            type="text"
            placeholder="Search for recipes, cuisines, or ingredients…"
            className="gch-searchbar"
            aria-label="Search recipes"
            disabled // Remove this once functionality is added
          />
          {/* Future: <button className="gch-search-btn">Search</button> */}
        </section>

        {/* Recipe Area */}
        <section className="gch-recipe-area">
          <div className="gch-recipe-area-placeholder">
            {/* Placeholder text for initial empty state */}
            <h2>Recipe Feed</h2>
            <p>
              Explore delicious recipes from around the world.<br />
              (Recipe results will appear here as features are added.)
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default GlobalCuisineHub;
