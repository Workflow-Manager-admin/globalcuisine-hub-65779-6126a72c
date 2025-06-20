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
  // Japanese
  {
    id: 1,
    name: "Sushi",
    cuisine: "Japanese",
    ingredients: ["Sushi rice", "Nori", "Fish", "Soy sauce"],
    steps: ["Prepare rice", "Add fish", "Roll", "Slice"],
    description: "Rice and fish rolls, a Japanese classic."
  },
  // Italian
  {
    id: 2,
    name: "Pizza Margherita",
    cuisine: "Italian",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil"],
    steps: ["Shape dough", "Add sauce", "Add cheese", "Bake", "Top with basil"],
    description: "Classic Italian pizza with tomato, mozzarella, and basil."
  },
  // Indian
  {
    id: 3,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    ingredients: ["Chicken", "Yogurt", "Spices", "Tomato"],
    steps: ["Marinate chicken", "Cook sauce", "Combine", "Simmer"],
    description: "Grilled chicken in creamy spiced tomato sauce."
  },
  // Mexican
  {
    id: 4,
    name: "Tacos",
    cuisine: "Mexican",
    ingredients: ["Tortillas", "Beef", "Lettuce", "Cheese", "Salsa"],
    steps: ["Prepare filling", "Warm tortillas", "Assemble tacos"],
    description: "Folded tortillas with various savory fillings."
  },
  // French
  {
    id: 5,
    name: "Coq au Vin",
    cuisine: "French",
    ingredients: ["Chicken", "Red wine", "Bacon", "Mushrooms", "Onions", "Carrots"],
    steps: [
      "Marinate chicken in wine overnight",
      "Brown bacon & chicken",
      "Add vegetables and cook",
      "Simmer until tender"
    ],
    description: "Classic French stew of chicken braised with wine, bacon, and vegetables."
  },
  // Thai
  {
    id: 6,
    name: "Pad Thai",
    cuisine: "Thai",
    ingredients: ["Rice noodles", "Egg", "Shrimp", "Tofu", "Bean sprouts", "Peanuts", "Tamarind sauce"],
    steps: [
      "Soak noodles",
      "Stir-fry protein and egg",
      "Add noodles and sauce",
      "Garnish with sprouts & peanuts"
    ],
    description: "Popular stir-fried noodle dish with sweet, sour, and savory flavors."
  },
  // American
  {
    id: 7,
    name: "Classic Burger",
    cuisine: "American",
    ingredients: ["Beef patty", "Burger buns", "Cheddar", "Lettuce", "Tomato", "Onion", "Pickles", "Ketchup"],
    steps: [
      "Form and season patties",
      "Grill to preference",
      "Assemble on buns with toppings"
    ],
    description: "Iconic grilled beef burgers stacked with fresh toppings."
  },
  // Chinese
  {
    id: 8,
    name: "Kung Pao Chicken",
    cuisine: "Chinese",
    ingredients: ["Chicken", "Peanuts", "Dried chili", "Bell peppers", "Soy sauce", "Ginger", "Garlic"],
    steps: [
      "Marinate and stir-fry chicken",
      "Add veggies and peanuts",
      "Stir in sauce and cook through"
    ],
    description: "Spicy stir-fry with chicken, peanuts, and vegetables."
  },
  // Middle Eastern
  {
    id: 9,
    name: "Hummus",
    cuisine: "Middle Eastern",
    ingredients: ["Chickpeas", "Tahini", "Olive oil", "Garlic", "Lemon juice", "Salt"],
    steps: [
      "Blend chickpeas, tahini, and garlic",
      "Add lemon juice and olive oil",
      "Season to taste"
    ],
    description: "Creamy dip made from blended chickpeas, popular throughout the Middle East."
  },
  // Greek
  {
    id: 10,
    name: "Greek Salad",
    cuisine: "Greek",
    ingredients: ["Tomatoes", "Cucumber", "Red onion", "Kalamata olives", "Feta cheese", "Oregano", "Olive oil"],
    steps: [
      "Chop vegetables",
      "Add olives and feta",
      "Drizzle with olive oil",
      "Sprinkle with oregano and toss"
    ],
    description: "Fresh salad with cheese, olives, and crisp veggies."
  },
  // Ethiopian
  {
    id: 11,
    name: "Doro Wat",
    cuisine: "Ethiopian",
    ingredients: ["Chicken", "Berbere spice", "Onions", "Garlic", "Ginger", "Butter", "Eggs"],
    steps: [
      "Caramelize onions with spices",
      "Add chicken and simmer",
      "Add hard-boiled eggs",
      "Serve with injera"
    ],
    description: "Spicy Ethiopian chicken stew rich in flavor, usually served with injera bread."
  },
  // Korean
  {
    id: 12,
    name: "Bibimbap",
    cuisine: "Korean",
    ingredients: ["Rice", "Mixed vegetables", "Egg", "Beef", "Gochujang", "Sesame oil"],
    steps: [
      "Prepare rice and vegetables",
      "Cook beef",
      "Fry egg",
      "Assemble bowl and top with gochujang"
    ],
    description: "Colorful bowl of rice topped with vegetables, meat, and chili paste."
  },
  // Spanish
  {
    id: 13,
    name: "Paella Valenciana",
    cuisine: "Spanish",
    ingredients: ["Short-grain rice", "Chicken", "Rabbit", "Green beans", "Tomato", "Saffron", "Olive oil"],
    steps: [
      "Brown meats and veggies",
      "Stir in rice and saffron",
      "Simmer without stirring until done"
    ],
    description: "Famous Spanish rice dish infused with saffron and mixed meats."
  }
];
const MOCK_CUISINES = [
  "Japanese",
  "Italian",
  "Indian",
  "Mexican",
  "French",
  "Thai",
  "American",
  "Chinese",
  "Middle Eastern",
  "Greek",
  "Ethiopian",
  "Korean",
  "Spanish"
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
