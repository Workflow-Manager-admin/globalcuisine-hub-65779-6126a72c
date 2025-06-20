import React, { createContext, useReducer, useContext } from 'react';

// Initial state for the global app context
const initialState = {
  // Array of recipes: {id, name, cuisine, ingredients, steps, ...}
  recipes: [],
  // Array of cuisine names: [ "Japanese", "Italian", ... ]
  cuisines: [],
  // Logged-in user object: { username, favorites }, or null for guests
  user: null,
  // Boolean for auth status
  isAuthenticated: false,
  // Array of favorited recipe IDs (if not in user object)
  favorites: [],
  // Currently selected cuisine filter (or null for ALL)
  selectedCuisine: null,
  // Current search query for filtering
  searchQuery: ""
};

// Reducer function to handle all global state mutations
function appReducer(state, action) {
  switch (action.type) {

    // -- AUTH ACTIONS --
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        favorites: action.payload?.favorites || []
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        favorites: []
      };
    case 'REGISTER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        favorites: []
      };

    // -- RECIPE ACTIONS --
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload };
    case 'ADD_RECIPE':
      return { ...state, recipes: [...state.recipes, action.payload] };
    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? action.payload : recipe
        )
      };
    case 'DELETE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
      };

    // -- CUISINES --
    case 'SET_CUISINES':
      return { ...state, cuisines: action.payload };
    case 'ADD_CUISINE':
      return { ...state, cuisines: [...state.cuisines, action.payload] };
    case 'DELETE_CUISINE':
      return {
        ...state,
        cuisines: state.cuisines.filter(c => c !== action.payload)
      };

    // -- FAVORITES --
    case 'ADD_FAVORITE':
      // Adds to both user object (if exists) and favorites array
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        user: state.user
          ? {
              ...state.user,
              favorites: [...(state.user.favorites || []), action.payload]
            }
          : state.user
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
        user: state.user
          ? {
              ...state.user,
              favorites: (state.user.favorites || []).filter(
                id => id !== action.payload
              )
            }
          : state.user
      };

    // -- UI FILTERS --
    case 'SET_SELECTED_CUISINE':
      return { ...state, selectedCuisine: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

// Create Context Object
const AppContext = createContext();

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  /**
   * AppProvider: Provides global state for recipes, user, auth, cuisines, and favorites.
   * Usage: Wrap your root <AppProvider> around your app.
   */
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAppContext() {
  /**
   * useAppContext: Access global state and dispatcher anywhere in child components.
   * Returns: { state, dispatch }
   */
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return ctx;
}
