import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

/**
 * Helper: validate mock user registration/login (minimal for mock/demo).
 */
function validateUserForm(form) {
  if (!form.username || form.username.length < 2) return "Username too short";
  if (!form.password || form.password.length < 4) return "Password too short";
  return null;
}

// PUBLIC_INTERFACE
function Auth() {
  /**
   * Auth: Handles mock user signup/login/logout/profile. Purely context state!
   * No back-end, all users ephemeral. Basic username/password only.
   * Profile editing: can only update username for demo.
   */

  const { state, dispatch } = useAppContext();
  const { isAuthenticated, user } = state;

  const [mode, setMode] = useState("login"); // 'login' | 'register' | 'profile'
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  // Populate form if editing profile and logged in
  React.useEffect(() => {
    if (mode === "profile" && user) {
      setForm({
        username: user.username,
        password: "",
        password2: "",
      });
    }
    // On logout or mode switch, clear errors
    setError("");
  }, [mode, user]);

  function onInput(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }

  // Registration
  function handleRegister(e) {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }
    const problem = validateUserForm(form);
    if (problem) {
      setError(problem);
      return;
    }
    // Simulate "register" (single user; would check for duplicate in DB in real app)
    dispatch({
      type: "REGISTER",
      payload: {
        username: form.username,
        favorites: [],
      },
    });
    setForm({ username: "", password: "", password2: "" });
    setMode("profile");
  }

  // Login
  function handleLogin(e) {
    e.preventDefault();
    const problem = validateUserForm(form);
    if (problem) {
      setError(problem);
      return;
    }
    // In real app: validate user credentials (simulate "always succeeds", but password is ignored after login)
    dispatch({
      type: "LOGIN",
      payload: {
        username: form.username,
        favorites: [],
      },
    });
    setForm({ username: "", password: "", password2: "" });
    setMode("profile");
  }

  // Profile update (can only change username in mock/demo)
  function handleProfileUpdate(e) {
    e.preventDefault();
    if (!form.username || form.username.length < 2) {
      setError("Username too short");
      return;
    }
    // Update user object for mock state
    dispatch({
      type: "LOGIN",
      payload: {
        ...user,
        username: form.username,
        // preserve favorites
        favorites: user.favorites || [],
      },
    });
    setError("");
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    setMode("login");
  }

  // UI Forms

  if (isAuthenticated && user && mode === "profile") {
    // Profile UI
    return (
      <section
        className="stub"
        style={{
          background: "#fff9ec",
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          marginBottom: 28,
          maxWidth: 340,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 18,
        }}
        id="auth-profile"
      >
        <div style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.13rem", marginBottom: 7 }}>
          👤 User Profile
        </div>
        <form onSubmit={handleProfileUpdate} style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 8 }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={onInput}
              style={{ width: "100%", fontSize: "1rem", marginTop: 2, marginBottom: 4, padding: "4px 7px" }}
              autoComplete="username"
              required
            />
          </label>
          {/* Don't allow password reset in mock/demo */}
          <button className="btn accent" style={{ marginTop: 8 }} type="submit">
            Save
          </button>
        </form>
        <button className="btn" style={{ marginTop: 15, width: "100%" }} onClick={logout}>
          Logout
        </button>
        <div style={{ fontSize: "0.93rem", marginTop: 16 }}>
          <span style={{ color: "var(--secondary)" }}>Logged in as: <b>{user.username}</b></span>
        </div>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </section>
    );
  }

  // --- Login ---
  if (mode === "login") {
    return (
      <section
        className="stub"
        style={{
          maxWidth: 340,
          margin: "30px auto 24px auto",
          background: "#fff",
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          padding: "26px 22px",
        }}
        id="auth-login"
      >
        <div style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.12rem", marginBottom: 9 }}>
          Login
        </div>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 9 }}
        >
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onInput}
            placeholder="Username"
            autoComplete="username"
            required
            style={{ padding: "7px 8px", fontSize: "1rem" }}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onInput}
            placeholder="Password"
            autoComplete="current-password"
            required
            style={{ padding: "7px 8px", fontSize: "1rem" }}
          />
          <button className="btn accent" style={{ marginTop: 8 }} type="submit">
            Login
          </button>
        </form>
        <button
          className="btn"
          style={{ marginTop: 14, width: "100%" }}
          onClick={() => {
            setMode("register");
            setForm({ username: "", password: "", password2: "" });
          }}
        >
          Need an account? Register
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </section>
    );
  }

  // --- Register ---
  if (mode === "register") {
    return (
      <section
        className="stub"
        style={{
          maxWidth: 340,
          margin: "30px auto 24px auto",
          background: "#fff",
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          padding: "26px 22px",
        }}
        id="auth-register"
      >
        <div style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.12rem", marginBottom: 9 }}>
          Register
        </div>
        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 9 }}
        >
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onInput}
            placeholder="Choose a username"
            autoComplete="username"
            required
            style={{ padding: "7px 8px", fontSize: "1rem" }}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onInput}
            placeholder="Password"
            autoComplete="new-password"
            required
            style={{ padding: "7px 8px", fontSize: "1rem" }}
          />
          <input
            type="password"
            name="password2"
            value={form.password2}
            onChange={onInput}
            placeholder="Confirm password"
            autoComplete="new-password"
            required
            style={{ padding: "7px 8px", fontSize: "1rem" }}
          />
          <button className="btn accent" style={{ marginTop: 8 }} type="submit">
            Register
          </button>
        </form>
        <button
          className="btn"
          style={{ marginTop: 14, width: "100%" }}
          onClick={() => {
            setMode("login");
            setForm({ username: "", password: "", password2: "" });
          }}
        >
          Already registered? Login
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </section>
    );
  }

  // Fallback
  return (
    <section className="stub" id="auth-stub">
      Auth Component (login/register/user)
    </section>
  );
}

export default Auth;
