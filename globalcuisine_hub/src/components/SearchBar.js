import React from "react";
import { useAppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
function SearchBar() {
  /**
   * SearchBar: search for recipes by keyword and update shared search query in context.
   */
  const { state, dispatch } = useAppContext();
  const [input, setInput] = React.useState(state.searchQuery || "");

  // Sync with context if out of sync (e.g., reset)
  React.useEffect(() => {
    setInput(state.searchQuery || "");
  }, [state.searchQuery]);

  function onChange(e) {
    setInput(e.target.value);
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  }

  function handleClear() {
    setInput("");
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
  }

  return (
    <section style={{margin:"20px 0 12px 0", display:"flex", alignItems:"center"}}>
      <input
        type="text"
        value={input}
        placeholder="Search recipes..."
        onChange={onChange}
        style={{
          flex:1,
          fontSize:"1rem",
          padding:"7px 13px",
          border:"1px solid var(--border-color)",
          borderRadius: 4,
          marginRight: 8
        }}
      />
      {input && (
        <button className="btn accent" onClick={handleClear} style={{padding:"7px 14px"}}>Clear</button>
      )}
    </section>
  );
}

export default SearchBar;
