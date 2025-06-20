# GlobalCuisine Hub Main Container: Development Plan & Architecture

## Overview

GlobalCuisine Hub is envisioned as a comprehensive, user-friendly web application for discovering, exploring, and managing cuisine recipes from around the world. The Main Container serves as the application's core, orchestrating navigation, feature display, and state flow.

This document summarizes the sequential development plan, component architecture, key data flows, design/brand considerations, and implementation rationale to facilitate robust and maintainable coding.

---

## Sequential Development Plan

1. **Project Foundation**
   - Integrate or verify React setup, folder structure, CSS base, and brand variables (per `App.css`).
   - Ensure project can run (`npm start`) and test (`npm run test`).

2. **Main Container & Navbar**
   - Build the MainContainer component as the application's root.
   - Implement Navbar for global navigation, branding, and access to authentication features.

3. **Core UI Components**
   - Create RecipeList (lists all available recipes).
   - Build RecipeDetail (displays full details of a selected recipe).
   - Implement CuisineFilter for filtering displayed recipes by cuisine type.
   - Add SearchBar for searching recipes by name or ingredients.

4. **Authentication**
   - Introduce mock/local authentication (sign up, login, logout).
   - Scaffold Auth component and basic flows; later integrate with persistence/api when available.

5. **Recipe Management**
   - Establish RecipeForm for creating, editing, and deleting recipes.
   - Wire up local state to persist recipes in-memory or using localStorage for now.
   - Embed CRUD operations directly in the MainContainer or a service utility.

6. **User Features**
   - Build UserFavorites to display and manage favorited recipes for a (mock) logged-in user.

7. **Cuisine Management**
   - Scaffold CuisineManager for admins or power-users to manage cuisine types.
   - Use local state/mocks for cuisine data.

8. **Styling & Brand Integration**
   - Apply light theme and branding colors (primary: `#FF6347` [tomato], secondary: `#4CAF50` [green], accent: `#FFC107` [yellow]), as specified.
   - Use responsive layouts and ensure UI consistency.

9. **Refinement & Testing**
   - Polish flows, components, and UI.
   - Add unit and component tests.

---

## Component Architecture

```mermaid
flowchart TD
    App[App.js]
    MainContainer[MainContainer]
    Navbar[Navbar]
    RecipeList[RecipeList]
    RecipeDetail[RecipeDetail]
    CuisineFilter[CuisineFilter]
    SearchBar[SearchBar]
    Auth[Auth (Login/Signup/User)]
    RecipeForm[RecipeForm (CRUD)]
    UserFavorites[UserFavorites]
    CuisineManager[CuisineManager]

    App --> MainContainer
    MainContainer --> Navbar
    MainContainer --> CuisineFilter
    MainContainer --> SearchBar
    MainContainer --> RecipeList
    MainContainer --> RecipeDetail
    MainContainer --> Auth
    MainContainer --> RecipeForm
    MainContainer --> UserFavorites
    MainContainer --> CuisineManager
```

- **MainContainer**: Top-level stateful parent, handles routing and passing state/handlers down.
- **Navbar**: Navigation links, logo/brand, access to login/signup/logout.
- **RecipeList**: Renders paged/listed recipes, receives filters and search query.
- **RecipeDetail**: Opens when a recipe is selected, displaying ingredients, steps, and actions (edit, favorite).
- **CuisineFilter**: List of cuisines (tags/buttons/dropdown); filters recipes in RecipeList.
- **SearchBar**: Keyword-based search for recipes.
- **Auth**: Handles login, registration, session, and links to UserFavorites.
- **RecipeForm**: Modal or page for adding/editing recipes (CRUD).
- **UserFavorites**: Lists current user's favorited recipes.
- **CuisineManager**: Allows admins or authorized users to manage (add/delete) cuisines.

---

## Data Flows

- **Recipe State**: Maintained at MainContainer level (local state, growing to API integration in future), passed down to RecipeList, RecipeDetail, etc.
- **Cuisine State**: Managed locally; CuisineFilter and CuisineManager update state.
- **Authentication State**: Starts as local mock state with Auth component control (with a sample/mock user); may be enhanced later.
- **Favorites State**: Maintained per-user in-memory or using localStorage, updated through UserFavorites and RecipeDetail.
- **UI/Filter State**: Controlled centrally in MainContainer.

### Basic Mock Data Example

```js
const [recipes, setRecipes] = useState([
    { id: 1, name: "Sushi", cuisine: "Japanese", ingredients: [...], steps: [...], ... },
    // ...
]);
const [cuisines, setCuisines] = useState(["Japanese", "Italian", ...]);
const [user, setUser] = useState({ username: "demo", favorites: [1, 3] });
```

---

## Design Rationale

- **Component Modularity**: Breaking down by function (lists/forms/detail/filter/auth) aids maintainability and scalability.
- **State Management**: Centralizing in MainContainer simplifies data sharing and avoids prop drilling; for larger scale, refactor to Context or Redux.
- **Mock/Local Implementation**: All business logic uses local state and mock data initially, so features remain testable and usable before backend/API hookup.
- **Branding & Theming**: Leveraging KAVIA-style light themes with custom brand colors ensures a modern, fun aesthetic suitable for culinary exploration.
- **Progressive Enhancement**: Each feature (auth, CRUD, user favorites) can be separately evolved, tested, or connected to APIs in the future.

---

## Feature Implementation Notes

- **Recipe Display & Details**
  - List and filter by cuisine, search string.
  - Click-to-view full detail, ingredients, and instructions.
  - Favorite recipes; editing allowed if user is owner.

- **Cuisine Filter & Management**
  - Presents selectable list of cuisines.
  - CuisineManager restricted to privileged users.

- **Search**
  - Real-time filtering of recipes in RecipeList.

- **Authentication and User**
  - Initial implementation uses a simple login/register (mocked).
  - User object and session stored in state (consider localStorage for persistence).

- **Recipe Management (CRUD)**
  - RecipeForm re-used for add/edit.
  - Recipes list updates immediately.

- **Favorites/User Profile**
  - Users can add/remove favorites; list shown on their profile.
  - Only authenticated users can favorite recipes.

---

## Design & Branding

- **Colors**
  - Primary: `#FF6347` (tomato red)
  - Secondary: `#4CAF50` (spring green)
  - Accent: `#FFC107` (warm yellow)

- **Theme**
  - Light, fresh, friendly, with strong focus and soft accent backgrounds.

- **Typography**
  - Clean, modern sans-serif fonts.

---

## Next Steps

1. Scaffold MainContainer, Navbar, and all child components as empty or stubs.
2. Implement in-memory/mock state management and flows.
3. Style components with the prescribed colors and branding.
4. Gradually flesh out each feature, iterating often and testing.

---

_This plan will guide sequential, modular development in line with modern web best practices. For significant code changes or new features, update this document accordingly._
