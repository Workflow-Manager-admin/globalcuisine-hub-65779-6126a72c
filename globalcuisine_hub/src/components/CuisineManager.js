import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

/**
 * PUBLIC_INTERFACE
 * CuisineManager: Full management UI for modifying available cuisines (add, delete).
 * Only allows deletion if no recipe uses that cuisine.
 */
function CuisineManager() {
  const { state, dispatch } = useAppContext();
  const { cuisines = [], recipes = [] } = state;
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    const name = input.trim();
    if (!name) {
      setError("Cuisine name required.");
      return;
    }
    if (cuisines.some(c => c.toLowerCase() === name.toLowerCase())) {
      setError("Cuisine already exists.");
      return;
    }
    dispatch({ type: "ADD_CUISINE", payload: name });
    setInput("");
    setError("");
  }

  function handleDelete(cuisine) {
    // Prevent deletion if any recipe uses this cuisine
    if (recipes.some(r => r.cuisine === cuisine)) {
      setError(`Cannot delete: "${cuisine}" in use.`);
      return;
    }
    dispatch({ type: "DELETE_CUISINE", payload: cuisine });
    setError("");
  }

  function handleEditInit(idx, value) {
    setEditIndex(idx);
    setEditValue(value);
    setError("");
  }

  function handleEditSave(idx) {
    const oldValue = cuisines[idx];
    const newValue = editValue.trim();
    if (!newValue) {
      setError("Cuisine name required.");
      return;
    }
    if (cuisines.some((c, i) => i !== idx && c.toLowerCase() === newValue.toLowerCase())) {
      setError("Cuisine already exists.");
      return;
    }
    // Update all recipes with this cuisine to new value
    dispatch({
      type: "SET_RECIPES",
      payload: recipes.map(r =>
        r.cuisine === oldValue ? { ...r, cuisine: newValue } : r
      ),
    });
    // Replace cuisine in array
    dispatch({
      type: "SET_CUISINES",
      payload: cuisines.map((c, i) => (i === idx ? newValue : c)),
    });
    setEditIndex(-1);
    setEditValue("");
    setError("");
  }

  function handleEditCancel() {
    setEditIndex(-1);
    setEditValue("");
    setError("");
  }

  return (
    <section
      style={{
        background: "#f5f5fa",
        border: "1px solid var(--border-color)",
        borderRadius: 8,
        padding: "22px 22px 18px 22px",
        margin: "30px auto 30px auto",
        maxWidth: 385,
      }}
      id="cuisinemanager"
    >
      <div style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.09rem", marginBottom: 10 }}>
        Cuisine Manager
      </div>
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 15 }}
      >
        <input
          type="text"
          placeholder="Add cuisine type (e.g., Thai)"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, fontSize: "1rem", padding: "5px 10px" }}
          autoComplete="off"
        />
        <button type="submit" className="btn accent" style={{ padding: "7px 12px" }}>
          Add
        </button>
      </form>
      {cuisines.length === 0 ? (
        <div style={{ fontStyle: "italic", color: "var(--secondary)" }}>
          No cuisines defined.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cuisines.map((cuisine, idx) => (
            <li key={cuisine} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              {editIndex === idx ? (
                <>
                  <input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    style={{ flex: 1, fontSize: "1rem", padding: "3px 9px" }}
                    autoFocus
                  />
                  <button
                    className="btn"
                    style={{ marginLeft: 5, background: "var(--secondary)", padding: "3px 9px" }}
                    onClick={() => handleEditSave(idx)}
                    type="button"
                  >
                    Save
                  </button>
                  <button
                    className="btn"
                    style={{ marginLeft: 5, background: "#bbb", padding: "3px 9px" }}
                    onClick={handleEditCancel}
                    type="button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{cuisine}</span>
                  <button
                    className="btn"
                    style={{ marginLeft: 6, background: "#e6e6e6", color: "var(--primary)", padding: "3px 10px" }}
                    onClick={() => handleEditInit(idx, cuisine)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{ marginLeft: 4, background: "#e57373", color: "#fff", padding: "3px 10px" }}
                    onClick={() => handleDelete(cuisine)}
                    type="button"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      <div style={{ marginTop: 12, fontSize: "0.93em", color: "#777" }}>
        <b>Note:</b> You cannot delete a cuisine if any recipe uses it. Editing a cuisine name will update linked recipes.
      </div>
    </section>
  );
}

export default CuisineManager;
