import React, { useState, useMemo } from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * AuthModal component for Login/Register.
 * Shows a modal with controlled form, mode switches, and UI validation (frontend only).
 */
function AuthModal({ show, mode, onClose, onSubmit, errorMessage }) {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });

  // Reset form when modal opens/closes/mode changes
  React.useEffect(() => {
    setForm({ username: "", password: "", confirm: "" });
  }, [show, mode]);

  if (!show) return null;
  // Validate inputs simple: All fields filled, and password match (register)
  const canSubmit =
    mode === "login"
      ? form.username.trim() && form.password
      : form.username.trim() && form.password && (form.confirm === form.password);

  return (
    <div
      style={{
        position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.28)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff", padding: 32, borderRadius: 14, minWidth: 330, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.17)", position: "relative"
        }}
      >
        <button style={{
          position: "absolute", right: 15, top: 13, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#aaa"
        }} aria-label="Close" onClick={onClose}
        >&times;</button>
        <div style={{ fontWeight: 600, fontSize: "1.2rem", marginBottom: 12 }}>
          {mode === "login" ? "Login to GlobalCuisineHub" : "Register for GlobalCuisineHub"}
        </div>
        <form
          onSubmit={e => { e.preventDefault(); onSubmit(form); }}
          style={{ display: "flex", flexDirection: "column", gap: 13 }}
        >
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            autoFocus
            required
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            style={{
              padding: "9px 12px", borderRadius: 6,
              border: "1.5px solid #d4d4d4", marginBottom: 2, fontSize: "1rem"
            }}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            style={{
              padding: "9px 12px", borderRadius: 6,
              border: "1.5px solid #d4d4d4", marginBottom: 2, fontSize: "1rem"
            }}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirm password"
              value={form.confirm}
              required
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              style={{
                padding: "9px 12px", borderRadius: 6,
                border: "1.5px solid #d4d4d4", marginBottom: 2, fontSize: "1rem"
              }}
              autoComplete="new-password"
            />
          )}
          {errorMessage &&
            <div style={{ color: "#c11", background: "#ffecec", padding: "5px 9px", borderRadius: 5, fontSize: "0.98rem", marginBottom: 0 }}>
              {errorMessage}
            </div>
          }
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn"
            style={{ marginTop: 6, fontWeight: 600, fontSize: "1.05rem" }}
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <div style={{ fontSize: "0.99rem", marginTop: 12, color: "#444" }}>
          {mode === "login" ?
            <>
              No account?
              <button
                style={{ background: "none", border: 0, color: "#FF6347", fontWeight: 600, cursor: "pointer", marginLeft: 8 }}
                onClick={() => onSubmit(null, "register")}
                type="button"
              >Register</button>
            </>
            :
            <>
              Have an account?
              <button
                style={{ background: "none", border: 0, color: "#FF6347", fontWeight: 600, cursor: "pointer", marginLeft: 8 }}
                onClick={() => onSubmit(null, "login")}
                type="button"
              >Login</button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

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

/**
 * Main container for the GlobalCuisine Hub application.
 * Provides layout: navigation bar, search bar (accent color), authentication (mock), and recipe display area.
 * Uses a light, scalable design and reserves space for future features.
 */
function GlobalCuisineHub() {
  // Search/filter UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  // ===== AUTH STATE =====
  // user: null if not logged in, {username: "..."} if logged in
  const [user, setUser] = useState(null);
  // Show modal, and which mode (login/register)
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");

  // For demo: Simulated "users" database (store only usernames, passwords)
  // This does not persist across page reloads!
  const usersDb = React.useRef({});

  // Handler for AuthModal submit:
  // formArg: {username, password, [confirm]}
  // mode: optional, to toggle login/register (when clicking link inside modal)
  const handleAuthSubmit = (formArg, modeOverride) => {
    setAuthError("");
    if (modeOverride) {
      // Switch mode, clear error
      setAuthMode(modeOverride);
      setAuthError("");
    } else if (authMode === "register") {
      // Registration logic: simulate uniqueness, password match is handled by modal
      const uname = formArg.username.trim();
      if (usersDb.current[uname]) {
        setAuthError("Username already exists.");
        return;
      }
      usersDb.current[uname] = formArg.password;
      setUser({ username: uname });
      setShowAuth(false);
      setAuthError("");
    } else if (authMode === "login") {
      // Login logic
      const uname = formArg.username.trim();
      if (!usersDb.current[uname]) {
        setAuthError("No such user. Please register.");
        return;
      }
      if (usersDb.current[uname] !== formArg.password) {
        setAuthError("Incorrect password.");
        return;
      }
      setUser({ username: uname });
      setShowAuth(false);
      setAuthError("");
    }
    // else, ignore
  };

  // Handler for logout
  const handleLogout = () => {
    setUser(null);
  };

  // Cuisine dropdown
  const cuisineOptions = useMemo(() => {
    const cuisines = SAMPLE_RECIPES.map(r => r.cuisine);
    return ["All", ...Array.from(new Set(cuisines)).sort()];
  }, []);

  // Filter recipes - NO change
  const filteredRecipes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let filtered = SAMPLE_RECIPES;

    if (selectedCuisine && selectedCuisine !== "All") {
      filtered = filtered.filter(recipe => recipe.cuisine === selectedCuisine);
    }
    if (!term) return filtered;
    return filtered.filter(recipe =>
      recipe.name.toLowerCase().includes(term) ||
      recipe.cuisine.toLowerCase().includes(term) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(term))
    );
  }, [searchTerm, selectedCuisine]);

  return (
    <div className="gch-app light-theme">
      {/* NAVIGATION BAR */}
      <nav className="gch-navbar">
        <div className="gch-navbar-content">
          <div className="gch-logo">
            <span className="gch-logo-symbol" role="img" aria-label="globe">
              🌍
            </span>
            GlobalCuisine Hub
          </div>
          {/* Nav/user actions */}
          <div className="gch-navbar-links">
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span style={{ fontWeight: "500", letterSpacing: 0.2, background: "#FFE5B4", color: "#D2691E", borderRadius: 7, padding: "4px 12px", marginRight: 2 }}>
                  <span role="img" aria-label="user" style={{ marginRight: 3 }}>👤</span>
                  {user.username}
                </span>
                <button className="btn" style={{ padding: "7px 15px", fontWeight: "500", fontSize: "0.99rem", background: "#FF6347", borderRadius: 6 }}
                  onClick={handleLogout}
                >Logout</button>
              </div>
            ) : (
              <>
                <a
                  href="#login"
                  style={{ fontWeight: 600, fontSize: "1.05rem" }}
                  onClick={e => { e.preventDefault(); setShowAuth(true); setAuthMode("login"); setAuthError(""); }}
                >Login</a>
                <span style={{ color: "#fff", fontSize: 17, padding: "0 7px" }}>|</span>
                <a
                  href="#register"
                  style={{ fontWeight: 600, fontSize: "1.05rem" }}
                  onClick={e => { e.preventDefault(); setShowAuth(true); setAuthMode("register"); setAuthError(""); }}
                >Register</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* AUTH MODAL (overlay) */}
      <AuthModal
        show={showAuth}
        mode={authMode}
        onClose={() => setShowAuth(false)}
        onSubmit={handleAuthSubmit}
        errorMessage={authError}
      />

      {/* Main content area */}
      <main className="gch-main">
        {/* Search & Filter Bar */}
        <section className="gch-searchbar-section" style={{ gap: "18px" }}>
          <input
            type="text"
            placeholder="Search for recipes, cuisines, or ingredients…"
            className="gch-searchbar"
            aria-label="Search recipes"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            disabled={!user}
            style={user ? {} : { opacity: 0.85, background: "#fff3cd" }}
          />
          {/* Cuisine filter dropdown */}
          <select
            aria-label="Filter by cuisine"
            value={selectedCuisine}
            onChange={e => setSelectedCuisine(e.target.value)}
            style={{
              marginLeft: 10,
              padding: "10px 15px",
              borderRadius: "8px",
              border: "2px solid var(--secondary)",
              background: "#f3fff2",
              fontSize: "1rem",
              color: "var(--text-color)",
              fontWeight: 500,
              minWidth: "125px"
            }}
            disabled={!user}
          >
            {cuisineOptions.map(cuisine => (
              <option value={cuisine} key={cuisine}>{cuisine}</option>
            ))}
          </select>
        </section>

        {/* Recipe Area */}
        <section className="gch-recipe-area">
          {!user ? (
            <div className="gch-recipe-area-placeholder" style={{ padding: 56 }}>
              <h2>Welcome to GlobalCuisineHub!</h2>
              <p>
                Please login or register to browse delicious recipes from around the world.
              </p>
              <button
                className="btn"
                style={{ marginTop: 18, fontSize: "1.08rem", fontWeight: 600, padding: "11px 38px", background: "#FF6347", borderRadius: 7 }}
                onClick={() => { setShowAuth(true); setAuthMode("login"); setAuthError(""); }}
              >Login Now</button>
            </div>
          ) : (filteredRecipes.length === 0 ? (
            <div className="gch-recipe-area-placeholder">
              <h2>No Recipes Found</h2>
              <p>
                We couldn&apos;t find any recipes matching your search and filter.
              </p>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center', padding: '24px 0' }}>
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
                  <h3 style={{ margin: '0 0 6px 0', color: '#FF6347', fontWeight: 600 }}>
                    {recipe.name}
                  </h3>
                  <div style={{ fontWeight: 500, fontSize: '1.01rem', color: '#444', marginBottom: '8px' }}>
                    <span role="img" aria-label="cuisine">🍽️</span> {recipe.cuisine}
                  </div>
                  <div style={{ fontSize: '0.98rem', color: '#555' }}>Ingredients: <span style={{ color: '#222' }}>{recipe.ingredients.join(', ')}</span></div>
                  <div style={{ fontSize: '0.98rem', color: '#222', marginTop: '7px' }}>{recipe.description}</div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default GlobalCuisineHub;
