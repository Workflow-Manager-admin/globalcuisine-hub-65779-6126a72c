import React, { useState, useMemo } from "react";
import "../App.css";

// Sample local recipe data (mock data for demonstration purposes)
const SAMPLE_RECIPES = [
  {
    id: 1,
    name: "Margherita Pizza",
    cuisine: "Italian",
    ingredients: ["flour", "tomato", "mozzarella", "basil", "olive oil"],
    description: "Classic Neapolitan pizza with tomatoes, mozzarella, and basil.",
  },
  {
    id: 2,
    name: "Sushi Rolls",
    cuisine: "Japanese",
    ingredients: ["rice", "nori", "salmon", "cucumber", "soy sauce"],
    description: "Fresh sushi rolls with salmon and cucumber.",
  },
  {
    id: 3,
    name: "Tacos al Pastor",
    cuisine: "Mexican",
    ingredients: ["pork", "pineapple", "onion", "cilantro", "tortilla"],
    description: "Traditional tacos with marinated pork and pineapple.",
  },
  {
    id: 4,
    name: "Butter Chicken",
    cuisine: "Indian",
    ingredients: ["chicken", "tomato", "cream", "butter", "spices"],
    description: "Creamy spiced butter chicken with rich tomato gravy.",
  },
  {
    id: 5,
    name: "French Ratatouille",
    cuisine: "French",
    ingredients: ["eggplant", "zucchini", "tomato", "bell pepper", "onion"],
    description: "Provencal vegetable stew, a French classic.",
  }
];

// PUBLIC_INTERFACE
/**
 * Main container for the GlobalCuisine Hub application.
 * Provides layout: navigation bar, search bar (accent color), and recipe display area.
 * Uses a light, scalable design and reserves space for future features.
 */
function GlobalCuisineHub() {
  // State to hold value of search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter recipes based on search term (case-insensitive, on name, cuisine, or ingredients)
  const filteredRecipes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return SAMPLE_RECIPES;
    return SAMPLE_RECIPES.filter(recipe => {
      // Check name, cuisine, and ingredient matches
      return (
        recipe.name.toLowerCase().includes(term) ||
        recipe.cuisine.toLowerCase().includes(term) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(term))
      );
    });
  }, [searchTerm]);

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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            // No longer disabled: search is now functional
          />
          {/* Future: <button className="gch-search-btn">Search</button> */}
        </section>

        {/* Recipe Area */}
        <section className="gch-recipe-area">
          {filteredRecipes.length === 0 ? (
            <div className="gch-recipe-area-placeholder">
              <h2>No Recipes Found</h2>
              <p>
                We couldn&apos;t find any recipes matching your search.
              </p>
            </div>
          ) : (
            <div style={{width:'100%', display:'flex', flexWrap: 'wrap', gap:'1.2rem', justifyContent: 'center', padding: '24px 0'}}>
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} style={{
                  background: '#fffbe9',
                  border: '2px solid #FFC107',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px 0 rgba(250, 197, 33, 0.08)',
                  width: '275px',
                  padding: '16px 20px',
                  margin: '0',
                  marginBottom: '12px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <h3 style={{margin: '0 0 6px 0', color: '#FF6347', fontWeight: 600}}>
                    {recipe.name}
                  </h3>
                  <div style={{fontWeight: 500, fontSize:'1.01rem', color: '#444', marginBottom:'8px'}}>
                    <span role="img" aria-label="cuisine">🍽️</span> {recipe.cuisine}
                  </div>
                  <div style={{fontSize:'0.98rem', color:'#555'}}>Ingredients: <span style={{color:'#222'}}>{recipe.ingredients.join(', ')}</span></div>
                  <div style={{fontSize:'0.98rem', color:'#222', marginTop: '7px'}}>{recipe.description}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default GlobalCuisineHub;
