import React from "react";
import { useAppContext } from "../context/AppContext";

/**
 * PUBLIC_INTERFACE
 * RecipeDetail: Shows info and actions for currently selected recipe.
 * Options: edit, delete, add to/remove from favorites
 */
function RecipeDetail() {
  const { state, dispatch } = useAppContext();
  const { recipes = [], selectedRecipeId, isAuthenticated, user } = state;
  const recipe = recipes.find(r => r.id === selectedRecipeId);

  if (!recipe) return null;

  function handleEdit() {
    dispatch({ type: "SET_SELECTED_RECIPE", payload: recipe.id });
    // Scroll to edit form if present
    setTimeout(() => {
      const el = document.getElementById("recipeform");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch({ type: "DELETE_RECIPE", payload: recipe.id });
      dispatch({ type: "SET_SELECTED_RECIPE", payload: null });
    }
  }

  function closeDetail() {
    dispatch({ type: "SET_SELECTED_RECIPE", payload: null });
  }

  const isFavorite = isAuthenticated && user && (user.favorites || []).includes(recipe.id);

  function handleFavorite() {
    if (!isAuthenticated) return;
    dispatch({ type: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: recipe.id });
  }

  return (
    <section
      style={{
        background: "#f2fff8",
        border: "1px solid var(--border-color)",
        borderRadius: 8,
        padding: "22px 26px 19px 22px",
        margin: "26px auto 36px auto",
        maxWidth: 500,
      }}
      id="recipedetail"
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 7 }}>
        <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.23rem", flex: 1 }}>
          {recipe.name}
        </span>
        <button
          className="btn"
          style={{ background: "#eee", color: "#111", padding: "2px 11px", marginLeft: 12 }}
          onClick={closeDetail}
          title="Close"
        >
          Close
        </button>
      </div>
      <div style={{fontWeight: 500, color: "var(--secondary)", fontSize:"1.01rem", marginBottom:6 }}>
        Cuisine: {recipe.cuisine}
      </div>
      <div style={{ fontSize: "0.97rem", color: "#444", marginBottom: 8 }}>
        {recipe.description}
      </div>
      <div style={{ fontSize: "1.01rem", color: "#333", fontWeight: 500, marginBottom: 4 }}>
        Ingredients:
      </div>
      <ul style={{ marginTop: 2, marginLeft: 18, color: "#333", fontSize: "0.98rem", marginBottom: 8 }}>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
      <div style={{ fontSize: "1.01rem", color: "#333", fontWeight: 500, marginBottom: 4 }}>
        Steps:
      </div>
      <ol style={{ marginTop: 2, marginLeft: 20, color: "#333", fontSize: "0.98rem", marginBottom: 8 }}>
        {recipe.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
      <div style={{ display: "flex", gap: 9 }}>
        {isAuthenticated && (
          <button
            className="btn accent"
            style={{
              padding: "6px 16px",
              background: isFavorite ? "var(--secondary)" : "var(--accent)",
              color: isFavorite ? "#fff" : "#222"
            }}
            onClick={handleFavorite}
          >
            {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
          </button>
        )}
        <button
          className="btn"
          style={{ background: "#ccf", color: "#222", padding: "6px 13px" }}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="btn"
          style={{ background: "#faa", color: "#222", padding: "6px 13px" }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </section>
  );
}

export default RecipeDetail;
