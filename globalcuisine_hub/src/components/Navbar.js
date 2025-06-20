import React from "react";
import { useAppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navbar: Top navigation bar for logo/brand and navigation links.
   * Auth controls: Show Login/Register (if guest) or User/Profile/Logout (if logged in).
   * Controls interaction by updating a modal state in MainContainer (handled via Auth).
   */
  const { state, dispatch } = useAppContext();
  const { isAuthenticated, user } = state;

  // Controls "showAuth" in state for opening Auth component on navbar button click.
  // Auth renders inline (not modal), so we instead scroll to the form on click.

  function scrollToAuth() {
    // Scrolls "Auth" section into view (hacky, as we don't have routes/modals yet)
    setTimeout(() => {
      const el = document.getElementById(
        isAuthenticated && user ? "auth-profile" : state.showRegister ? "auth-register" : "auth-login"
      );
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  return (
    <nav className="navbar">
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="logo">
          <span className="logo-symbol" role="img" aria-label="globe">🌎</span>
          <span>GlobalCuisine Hub</span>
        </div>
        <div className="nav-links">
          {isAuthenticated && user ? (
            <button
              className="btn accent"
              onClick={() => {
                // Switch Auth to profile mode and scroll down
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  const el = document.getElementById("auth-profile");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 80);
              }}
              style={{ marginLeft: 6 }}
            >
              {user.username} &middot; Profile
            </button>
          ) : (
            <button
              className="btn btn-small accent"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  const el = document.getElementById("auth-login");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 80);
              }}
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
