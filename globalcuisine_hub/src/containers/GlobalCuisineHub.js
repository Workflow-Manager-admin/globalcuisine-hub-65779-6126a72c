import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * Main container component for the GlobalCuisine Hub application.
 * This acts as the entry point for major features like navigation, search, and main recipe display.
 * Further subcomponents (Navbar, SearchBar, RecipeList, etc.) will be added/integrated here in upcoming steps.
 */
function GlobalCuisineHub() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="logo">
            <span className="logo-symbol" role="img" aria-label="globe">🌍</span>
            GlobalCuisine Hub
          </div>
          {/* Placeholder for future nav links & user actions */}
        </div>
      </nav>
      <main>
        <div className="container" style={{ paddingTop: 120 }}>
          <div className="hero">
            <span className="subtitle" style={{ color: "var(--base-light)" }}>
              Discover & Manage Cuisines from Around the World
            </span>
            <h1 className="title" style={{ color: "var(--base-light)" }}>GlobalCuisine Hub</h1>
            <div className="description">
              Welcome! This hub brings together global recipes, cuisine management, and a user-friendly recipe search engine. Start exploring the culinary world.
            </div>
            {/* Additional feature integration (search, filtering, auth, etc.) will appear here */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GlobalCuisineHub;
