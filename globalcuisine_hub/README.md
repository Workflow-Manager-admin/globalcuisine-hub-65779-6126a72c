# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

---

## 🛠️ Contributing Guidelines

We welcome contributions from the community! To maintain high code quality and a smooth workflow, please review the following before contributing.

### Fork & Branch

- **Fork** this repository to your own GitHub account.
- Create a **feature branch** from `main` for your changes. Use meaningful names, e.g., `feature/add-auth`, `fix/navbar-bug`, or `tests/search-bar`.

### Descriptive Commits

- Write clear, concise commit messages. Clearly describe _what_ your change does and _why_ it is needed.

### Pull Request (PR) Process and Code Reviews

- Open a Pull Request (PR) against the `main` branch.
- **Every code change must go through a code review**. We recommend these simple rules:
  - PRs must have at least **one approval** from another contributor before merging.
  - Provide a helpful PR description and link or screenshot relevant issues/features.
  - Address any change requests or comments in follow-up commits.
- Automated test and linter checks must **pass** before merging.

### Where to Get Help

If you have questions, please:
- Open an issue with a clear description of the problem.
- Join project community channels (if available) or mention a maintainer in your PR.
- For urgent/unblocker issues, email the maintainer (see repo description).

---

## 🧹 Linting

Code quality is enforced using [ESLint](https://eslint.org/).

- Before pushing code or submitting a PR, run ESLint locally. Resolving all warnings and errors helps keep the codebase clean and consistent.

To check for lint errors, run:

```bash
npx eslint src/
```

Or, with the config file (if you want to specify explicitly):

```bash
npx eslint src/ --config ./eslint.config.mjs
```

- Make sure your editor is set up for linting and auto-formatting on save if possible.

---

## 🧪 Testing

All tests use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and run via [Jest](https://jestjs.io/).

- Place new test files alongside the component to be tested, following the naming convention: `ComponentName.test.js`.
- Make sure your code is covered by tests for new features or bug fixes.

To run tests locally in watch mode:

```bash
npm test
```

For a single, non-interactive run (useful for CI, before merging):

```bash
CI=true npm test
```

- All tests should pass before submitting, merging, or approving a PR.

---

## ✅ Example Contribution Workflow

1. **Fork** this repository.
2. **Clone** your repository to your computer.
3. Create a **feature branch** (`git checkout -b feature/add-login-ui`).
4. **Make your changes** (write code, add tests, run lint).
5. Run ESLint and tests:
   ```bash
   npx eslint src/ --config ./eslint.config.mjs
   npm test
   ```
6. **Commit** and **push** your changes with a descriptive commit message.
7. **Open a Pull Request** targeting `main`.
8. At least **one other contributor** reviews your PR.
9. Make requested changes (if any).
10. When approved and checks pass, **merge** your PR!

---

## Important Note: Babel Configuration

This project’s `package.json` includes a `babel` section with a plugin:

```json
"babel": {
"plugins": ["./.ve/babel-plugin-jsx-editor-id.js"]
}
```

This plugin enables **visual editing functionality** in supported tools.

**Warning for AI code agents and contributors:**
**DO NOT** remove or modify this section - it is ESSENTIAL for proper operation.
Removing it will break editor integration and visual editing features.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`.

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
