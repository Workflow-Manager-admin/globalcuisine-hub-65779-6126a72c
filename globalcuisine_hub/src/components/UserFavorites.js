import React from "react";
import { useAppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
function UserFavorites() {
  /**
   * UserFavorites: Renders current user's favorited recipes.
   * Allows removal (unfavorite); requires login. All local/context state only.
   */

  const { state, dispatch } = useAppContext();
  const { isAuthenticated, user, recipes = [] } = state;
  const favoriteIds = user ? user.favorites || [] : [];

  // Computed favorite recipes
  const favoriteRecipes = recipes.filter(r => favoriteIds.includes(r.id));

  function removeFavorite(id) {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <section
      className="stub"
      style={{
        background: "#FFF9EC",
        border: "1px solid var(--border-color)",
        borderRadius: 8,
        marginBottom: 24,
        marginTop: 22,
        maxWidth: 420,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      id="userfavorites-list"
    >
      <div style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.09rem", marginBottom: 9 }}>
        ⭐ Your Favorite Recipes
      </div>
      {favoriteRecipes.length === 0 ? (
        <div style={{ color: "var(--text-secondary)", fontSize: "0.97rem", padding: 10 }}>
          You haven't added any favorites yet.
        </div>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {favoriteRecipes.map(recipe => (
            <li key={recipe.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px dashed var(--border-color)",
              padding: "6px 0"
            }}>
              <span>
                <span style={{ color: "var(--secondary)", fontWeight: 500 }}>
                  {recipe.name}
                </span>
                <span style={{ color: "#555", fontSize: "0.96em", marginLeft: 8 }}>
                  ({recipe.cuisine})
                </span>
              </span>
              <button
                className="btn"
                style={{ fontSize: 13, padding: "4px 12px", background: "var(--primary)", marginLeft: 12 }}
                title="Remove from favorites"
                onClick={() => removeFavorite(recipe.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default UserFavorites;
