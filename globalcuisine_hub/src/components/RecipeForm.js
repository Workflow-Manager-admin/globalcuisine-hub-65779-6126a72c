import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

/**
 * PUBLIC_INTERFACE
 * RecipeForm: For adding and editing (and deleting) recipes in-memory. 
 * Displays as "add new" if no recipe is selected, or "edit" if editing.
 */
function RecipeForm() {
  const { state, dispatch } = useAppContext();
  const { recipes = [], cuisines = [], selectedRecipeId, user } = state;
  const editingRecipe = recipes.find(r => r.id === selectedRecipeId) || null;

  // Local state for form
  const [form, setForm] = useState(
    editingRecipe
      ? {
          name: editingRecipe.name,
          cuisine: editingRecipe.cuisine,
          ingredients: (editingRecipe.ingredients || []).join(", "),
          steps: (editingRecipe.steps || []).join("\n"),
          description: editingRecipe.description || "",
        }
      : {
          name: "",
          cuisine: cuisines[0] || "",
          ingredients: "",
          steps: "",
          description: "",
        }
  );
  const [error, setError] = useState("");

  // Update form fields if editingRecipe changes
  React.useEffect(() => {
    if (editingRecipe) {
      setForm({
        name: editingRecipe.name,
        cuisine: editingRecipe.cuisine,
        ingredients: (editingRecipe.ingredients || []).join(", "),
        steps: (editingRecipe.steps || []).join("\n"),
        description: editingRecipe.description || "",
      });
    } else {
      setForm({
        name: "",
        cuisine: cuisines[0] || "",
        ingredients: "",
        steps: "",
        description: "",
      });
    }
    setError("");
  }, [editingRecipe, cuisines]);

  function onInput(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function validate(form) {
    if (!form.name.trim()) return "Recipe name is required.";
    if (!form.cuisine.trim()) return "Cuisine type is required.";
    if (!form.ingredients.trim()) return "At least one ingredient required.";
    if (!form.steps.trim()) return "At least one step required.";
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const problem = validate(form);
    if (problem) {
      setError(problem);
      return;
    }
    const recipe = {
      ...editingRecipe,
      name: form.name.trim(),
      cuisine: form.cuisine.trim(),
      ingredients: form.ingredients.split(",").map(s => s.trim()).filter(Boolean),
      steps: form.steps.split("\n").map(s => s.trim()).filter(Boolean),
      description: form.description.trim(),
    };
    if (editingRecipe) {
      // edit mode
      dispatch({ type: "UPDATE_RECIPE", payload: { ...recipe, id: editingRecipe.id } });
    } else {
      // new id: max+1
      const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
      dispatch({ type: "ADD_RECIPE", payload: { ...recipe, id: newId } });
    }
    // Clear form or exit edit mode
    setForm({
      name: "",
      cuisine: cuisines[0] || "",
      ingredients: "",
      steps: "",
      description: "",
    });
    setError("");
    dispatch({ type: "SET_SELECTED_RECIPE", payload: null }); // exit edit mode
  }

  function handleDelete() {
    if (!editingRecipe) return;
    if (window.confirm("Delete this recipe?")) {
      dispatch({ type: "DELETE_RECIPE", payload: editingRecipe.id });
      dispatch({ type: "SET_SELECTED_RECIPE", payload: null });
      setError("");
    }
  }

  function handleCancel() {
    dispatch({ type: "SET_SELECTED_RECIPE", payload: null });
    setError("");
  }

  return (
    <section
      style={{
        background: "#fafdff",
        border: "1px solid var(--border-color)",
        borderRadius: 8,
        padding: "22px 22px 18px 22px",
        margin: "28px auto 32px auto",
        maxWidth: 500,
      }}
      id="recipeform"
    >
      <div style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.13rem", marginBottom: 7 }}>
        {editingRecipe ? "Edit Recipe" : "Add a New Recipe"}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onInput}
            style={{ width: "100%", fontSize: "1rem", padding: "4px 7px" }}
            required
          />
        </label>
        <label>
          Cuisine:
          <select
            name="cuisine"
            value={form.cuisine}
            onChange={onInput}
            style={{ width: "100%", fontSize: "1rem", padding: "5px" }}
            required
          >
            <option value="">--Select--</option>
            {cuisines.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ingredients (comma-separated):
          <input
            type="text"
            name="ingredients"
            value={form.ingredients}
            onChange={onInput}
            placeholder="e.g. Rice, Nori, Fish, Soy sauce"
            style={{ width: "100%", fontSize: "1rem", padding: "4px 7px" }}
            required
          />
        </label>
        <label>
          Steps (one per line):
          <textarea
            name="steps"
            value={form.steps}
            onChange={onInput}
            rows={4}
            style={{ width: "100%", fontSize: "1rem", padding: "4px 7px", minHeight: 48 }}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={onInput}
            style={{ width: "100%", fontSize: "1rem", padding: "3px 7px", minHeight: 30 }}
          />
        </label>
        {error && <div style={{ color: "red", marginTop: 5 }}>{error}</div>}
        <div style={{ display: "flex", gap: 13, marginTop: 7 }}>
          <button className="btn accent" type="submit">
            {editingRecipe ? "Save Changes" : "Add Recipe"}
          </button>
          {editingRecipe && (
            <>
              <button
                className="btn"
                style={{ background: "#faa", color: "#222" }}
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn"
                style={{ background: "#ddd" }}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
}

export default RecipeForm;
