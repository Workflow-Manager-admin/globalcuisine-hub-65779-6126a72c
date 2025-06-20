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
    steps: [
      "Prepare the sushi rice by seasoning with vinegar, sugar, and salt.",
      "Lay a sheet of nori on a bamboo rolling mat.",
      "Spread rice evenly on the nori, leaving a 1-inch border at the top.",
      "Add thin strips of fish and other fillings.",
      "Roll tightly using the bamboo mat.",
      "Slice the rolled sushi into bite-sized pieces.",
      "Serve with soy sauce."
    ],
    description: "Rice and fish rolls, a Japanese classic."
  },
  // Italian
  {
    id: 2,
    name: "Pizza Margherita",
    cuisine: "Italian",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil"],
    steps: [
      "Preheat oven to its highest temperature (450–500°F/230–260°C).",
      "Shape the pizza dough into a circle on a floured surface.",
      "Spread tomato sauce evenly over the dough.",
      "Add slices of mozzarella cheese.",
      "Bake until the crust is golden and cheese melted, about 10 minutes.",
      "Top with fresh basil leaves after baking. Slice and enjoy!"
    ],
    description: "Classic Italian pizza with tomato, mozzarella, and basil."
  },
  // Indian
  {
    id: 3,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    ingredients: ["Chicken", "Yogurt", "Spices", "Tomato"],
    steps: [
      "Mix chicken with yogurt and spices; marinate for at least 1 hour.",
      "Grill or pan-fry chicken pieces until cooked.",
      "Cook spices in oil, add tomato purée, simmer for 10 minutes.",
      "Add grilled chicken to sauce and simmer for 5–10 minutes.",
      "Serve hot with rice or naan."
    ],
    description: "Grilled chicken in creamy spiced tomato sauce."
  },
  // Mexican
  {
    id: 4,
    name: "Tacos",
    cuisine: "Mexican",
    ingredients: ["Tortillas", "Beef", "Lettuce", "Cheese", "Salsa"],
    steps: [
      "Cook ground beef with spices until browned.",
      "Warm tortillas in a dry skillet or microwave.",
      "Assemble tacos by adding beef, lettuce, cheese, and salsa to each tortilla.",
      "Fold and serve immediately."
    ],
    description: "Folded tortillas with various savory fillings."
  },
  // French
  {
    id: 5,
    name: "Coq au Vin",
    cuisine: "French",
    ingredients: ["Chicken", "Red wine", "Bacon", "Mushrooms", "Onions", "Carrots"],
    steps: [
      "Marinate chicken in red wine with vegetables overnight in fridge.",
      "Remove chicken, pat dry and brown with bacon in a Dutch oven.",
      "Add onions, carrots, and mushrooms; cook for 5 minutes.",
      "Pour the marinade in, bring to simmer, cover and cook until chicken is tender (1h).",
      "Serve with fresh parsley and rustic bread."
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
      "Soak rice noodles in warm water until soft, then drain.",
      "In a hot wok, stir-fry shrimp (or tofu) and scrambled egg.",
      "Add noodles and tamarind sauce, toss to coat evenly.",
      "Add bean sprouts and cook for 2 more minutes.",
      "Transfer to plate and top with chopped peanuts. Serve with lime."
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
      "Shape ground beef into patties; season with salt and pepper.",
      "Grill or pan-fry patties to desired doneness.",
      "Lightly toast burger buns.",
      "Place patty on bun, add cheese, lettuce, tomato, onion, pickles, and ketchup.",
      "Top with other half of bun and serve."
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
      "Marinate diced chicken in soy sauce, ginger, and garlic.",
      "Stir-fry chicken in oil over high heat until almost done.",
      "Add bell peppers and dried chili peppers; stir-fry 2 minutes.",
      "Stir in peanuts and sauce; cook through.",
      "Serve hot with rice."
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
      "Combine chickpeas, tahini, garlic, and lemon juice in food processor.",
      "Blend until smooth, adding olive oil slowly.",
      "Season to taste with salt and extra lemon.",
      "Serve drizzled with olive oil and sprinkled with paprika."
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
      "Chop tomatoes, cucumber, and red onion into large chunks.",
      "Add Kalamata olives and crumbled feta to the vegetables.",
      "Drizzle with olive oil.",
      "Sprinkle with oregano and toss lightly.",
      "Serve immediately."
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
      "Finely chop onions and caramelize slowly with butter in a large pot.",
      "Add berbere spice, garlic, and ginger; cook until aromatic.",
      "Add chicken and coat well in the spice mixture.",
      "Pour in water or broth, cover, and simmer until the chicken is cooked.",
      "Peel hard-boiled eggs and add during the last 10 minutes.",
      "Serve hot with traditional injera bread."
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
      "Cook white rice and divide among bowls.",
      "Sauté mixed vegetables and season lightly; cook beef separately.",
      "Fry eggs sunny-side up.",
      "Arrange vegetables and beef on rice, top with egg.",
      "Drizzle with gochujang (Korean chili paste) and sesame oil before mixing to eat."
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
      "Heat olive oil in a wide shallow pan, brown chicken and rabbit.",
      "Add chopped green beans and tomato, cook a few minutes.",
      "Stir in saffron and rice, coating grains in oil and flavors.",
      "Add water or stock, bring to a simmer, cook uncovered without stirring until rice absorbs all liquid.",
      "Let rest briefly before serving."
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
