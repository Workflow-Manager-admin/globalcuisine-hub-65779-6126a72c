import React from "react";
import { useAppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
function RecipeList() {
  /**
   * RecipeList: filtered and searched list of recipes from context.
   * Supports cuisine filter and text search.
   */
  const { state } = useAppContext();
  const { recipes = [], searchQuery, selectedCuisine } = state;

  function matchesFilters(recipe) {
    const name = recipe.name.toLowerCase();
    const ingredients = (recipe.ingredients || []).join(" ").toLowerCase();
    // Search by name or ingredient substring, case-insensitive
    const matchesText =
      !searchQuery ||
      name.includes(searchQuery.toLowerCase()) ||
      ingredients.includes(searchQuery.toLowerCase());
    const matchesCuisine =
      !selectedCuisine || recipe.cuisine === selectedCuisine;
    return matchesText && matchesCuisine;
  }

  const { isAuthenticated, user } = state;
  const { dispatch } = useAppContext();
  const favoriteIds = user?.favorites || [];

  const filtered = recipes.filter(matchesFilters);

  function handleFavorite(id, already) {
    if (!isAuthenticated) return;
    dispatch({ type: already ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: id });
  }

  if (!recipes.length) {
    return (
      <section className="stub" id="recipelist-stub">
        No recipes available.
      </section>
    );
  }
  return (
    <section style={{margin:"32px 0 30px 0"}}>
      <h2 style={{
        marginTop: "0",
        marginBottom: "16px",
        fontWeight: 600,
        color:"var(--primary)"
      }}>Recipes</h2>
      <button
        className="btn accent"
        style={{ marginBottom: 13 }}
        onClick={() => dispatch({ type: "SET_SELECTED_RECIPE", payload: null })}
      >
        Add New Recipe
      </button>
      {filtered.length === 0 ? (
        <div style={{padding:"32px", textAlign:"center", color:"var(--secondary)", background:"#fff9ec", borderRadius:8}}>
          No recipes match your filters.
        </div>
      ) : (
        <ul style={{
          listStyle:"none",
          padding:0,
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",
          gap:"18px"
        }}>
          {filtered.map(recipe => {
            const isFav = isAuthenticated && favoriteIds.includes(recipe.id);
            return (
              <li
                key={recipe.id}
                style={{
                  border:"1px solid var(--border-color)",
                  borderRadius: 8,
                  background: "var(--surface)",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.022)",
                  padding: "18px 18px 11px 18px",
                  cursor: "pointer",
                  transition: "box-shadow .13s"
                }}
                onClick={() => dispatch({ type: "SET_SELECTED_RECIPE", payload: recipe.id })}
                title="Click to view recipe details"
              >
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{fontSize:"1.13rem", fontWeight: 600, color:"var(--primary)", marginBottom:"4px"}}>
                    {recipe.name}
                  </div>
                  {isAuthenticated && (
                    <button
                      className="btn accent"
                      style={{
                        padding: "4px 9px",
                        fontSize: 13,
                        background: isFav ? "var(--secondary)" : "var(--accent)",
                        color: isFav ? "#fff" : "#222",
                        marginLeft: 10
                      }}
                      onClick={e => { e.stopPropagation(); handleFavorite(recipe.id, isFav); }}
                      title={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFav ? "★" : "☆"}
                    </button>
                  )}
                </div>
                <div style={{color:"var(--secondary)", fontSize:"0.98rem", marginBottom: 4}}>{recipe.cuisine}</div>
                <div style={{fontSize: "0.96rem", color:"var(--text-secondary)", marginBottom: 7}}>{recipe.description}</div>
                <div style={{fontSize: "0.90rem", color:"var(--text-secondary)", opacity: 0.7}}>
                  <strong>Ingredients:</strong> {recipe.ingredients && recipe.ingredients.join(", ")}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default RecipeList;
