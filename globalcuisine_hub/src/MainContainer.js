import React from "react";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import CuisineFilter from "./components/CuisineFilter";
import SearchBar from "./components/SearchBar";
import Auth from "./components/Auth";
import RecipeForm from "./components/RecipeForm";
import UserFavorites from "./components/UserFavorites";
import CuisineManager from "./components/CuisineManager";
import { useAppContext } from "./context/AppContext";

// React Router imports
import { Routes, Route, Navigate } from "react-router-dom";

/**
 * Example mock data for initial demo state (recipes and cuisines).
 */
const MOCK_RECIPES = [
  {
    id: 1,
    name: "Sushi",
    cuisine: "Japanese",
    ingredients: ["Sushi rice", "Nori", "Fish", "Soy sauce"],
    steps: ["Prepare rice", "Add fish", "Roll", "Slice"],
    description: "Rice and fish rolls, a Japanese classic."
  },
  {
    id: 2,
    name: "Pizza Margherita",
    cuisine: "Italian",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil"],
    steps: ["Shape dough", "Add sauce", "Add cheese", "Bake", "Top with basil"],
    description: "Classic Italian pizza with tomato, mozzarella, and basil."
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    ingredients: ["Chicken", "Yogurt", "Spices", "Tomato"],
    steps: ["Marinate chicken", "Cook sauce", "Combine", "Simmer"],
    description: "Grilled chicken in creamy spiced tomato sauce."
  },
  {
    id: 4,
    name: "Tacos",
    cuisine: "Mexican",
    ingredients: ["Tortillas", "Beef", "Lettuce", "Cheese", "Salsa"],
    steps: ["Prepare filling", "Warm tortillas", "Assemble tacos"],
    description: "Folded tortillas with various savory fillings."
  }
];
const MOCK_CUISINES = [
  "Japanese",
  "Italian",
  "Indian",
  "Mexican"
];

// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * MainContainer: central hub for state and navigation.
   * Uses AppContext for global state, provides context to all feature stubs.
   * Now enables page-level routing!
   */
  const { state, dispatch } = useAppContext();

  // On mount, populate mock data if not already set
  React.useEffect(() => {
    if (!state.recipes || state.recipes.length === 0) {
      dispatch({ type: "SET_RECIPES", payload: MOCK_RECIPES });
    }
    if (!state.cuisines || state.cuisines.length === 0) {
      dispatch({ type: "SET_CUISINES", payload: MOCK_CUISINES });
    }
  }, [dispatch, state.recipes, state.cuisines]);

  return (
    <>
      <Navbar />
      <main className="main-content container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <CuisineFilter />
                <RecipeList />
                <RecipeDetail />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <UserFavorites />
            }
          />
          <Route
            path="/add"
            element={
              <RecipeForm />
            }
          />
          <Route
            path="/auth"
            element={
              <Auth />
            }
          />
          <Route
            path="/profile"
            element={
              // Render Auth in profile mode, contextually handled by Auth
              <Auth />
            }
          />
          <Route
            path="/cuisines"
            element={
              <CuisineManager />
            }
          />
          {/* Fallback: any other route redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default MainContainer;
