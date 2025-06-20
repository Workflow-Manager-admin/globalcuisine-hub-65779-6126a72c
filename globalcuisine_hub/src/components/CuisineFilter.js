import React from "react";
import { useAppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
function CuisineFilter() {
  /**
   * CuisineFilter: shows list of cuisine filters. Updates selectedCuisine filter in context.
   */
  const { state, dispatch } = useAppContext();
  const cuisines = state.cuisines || [];
  const selected = state.selectedCuisine;

  if (!cuisines.length) return null;

  return (
    <section style={{marginBottom:20}}>
      <label style={{fontWeight:"bold", marginRight:10}}>Filter by cuisine:</label>
      <button
        className="btn"
        style={{marginRight:8, background: !selected ? "var(--accent)" : ""}}
        onClick={() => {
          dispatch({ type: "SET_SELECTED_CUISINE", payload: null });
          dispatch({ type: "SET_SELECTED_RECIPE", payload: null });
        }}
      >
        All
      </button>
      {cuisines.map(c => (
        <button
          key={c}
          className="btn"
          style={{
            marginRight:8,
            background: selected===c ? "var(--secondary)" : ""
          }}
          onClick={() => {
            dispatch({ type: "SET_SELECTED_CUISINE", payload: c });
            dispatch({ type: "SET_SELECTED_RECIPE", payload: null });
          }}
        >
          {c}
        </button>
      ))}
    </section>
  );
}

export default CuisineFilter;
