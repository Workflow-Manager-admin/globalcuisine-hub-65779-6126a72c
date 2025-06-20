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

// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * MainContainer: central hub for state and navigation.
   * Uses AppContext for global state, provides context to all feature stubs.
   */
  const { state, dispatch } = useAppContext(); // Enables access as needed

  return (
    <>
      <Navbar />
      <main className="main-content container">
        {/* Stubs for major sections of the app – swap for routed views later */}
        <SearchBar />
        <CuisineFilter />
        <RecipeList />
        <RecipeDetail />
        <UserFavorites />
        <RecipeForm />
        <Auth />
        <CuisineManager />
      </main>
    </>
  );
}

export default MainContainer;
