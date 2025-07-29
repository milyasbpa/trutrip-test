# Trutrip Test Project

A modern React + TypeScript + Vite application featuring authentication, product catalogue with filtering and search, robust code quality tooling, and internationalization support.

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd trutrip-test
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the development server**
   ```sh
   npm run dev
   ```

4. **Lint, format, and test**
   ```sh
   npm run lint      # Run ESLint
   npm run format    # Run Prettier
   npm run test      # Run Vitest unit tests
   ```

5. **Prepare git hooks (husky)**
   ```sh
   npx husky install
   ```

---

## 🗂️ Codebase Structure

- **/core**  
  Shared utilities, theme, API clients, i18n, and global configuration.

- **/features**  
  Domain-driven modules, e.g.:
  - `/features/auth` – Authentication (login)
  - `/features/private/products` – Product catalogue, filtering, infinite scroll, etc.

- **/locales & /translations**  
  - Translations are managed in CSV for easy updates by product teams.
  - A script generates i18n JSON files automatically from CSV.
  - run npm:setupi18n after you finished add translation in CSV file.

- **/hooks, /components, /react-query**  
  - Custom hooks, reusable components, and React Query hooks for server state.

- **/test, /__mocks__**  
  - Unit and integration tests using Vitest and React Testing Library.

---

## 🔐 Feature: Login

- **Form validation** using [React Hook Form](https://react-hook-form.com/).
- **Validation rules:**  
  - Email: required, must be a valid email.
  - Password: required.
- **Dummy authentication:**  
  - Only accepts:
    - **Email:** `admin@example.com`
    - **Password:** `P@ssw0rd`
  - No real API; uses a dummy user for authentication logic.
- **UX:**  
  - Shows validation errors inline.
  - Shows error if credentials are incorrect.

---

## 🛒 Feature: Product Catalogue

- **Catalogue page** accessible after login.
- **Filter by category:**  
  - Select one or more categories to filter products.
- **Search by title:**  
  - Search input is debounced for performance.
- **Infinite scroll pagination:**  
  - Loads more products as you scroll.
- **Server state caching:**  
  - Uses [React Query](https://tanstack.com/query/latest) for efficient data fetching and caching.
- **Material UI:**  
  - All UI built with [Material UI](https://mui.com/) for consistency and accessibility.

---

## 🌍 Internationalization (i18n)

- **Translation management:**  
  - Product/content teams can update translations via CSV.
  - A script generates i18n JSON files automatically.
- **Easy to add new languages** by updating the CSV and regenerating.

---

## 🛡️ Code Quality

- **ESLint** with type-aware rules for TypeScript.
- **Prettier** for consistent code formatting.
- **Husky** and **commitlint** enforce commit message standards and run lint/tests before commit.
- **Vitest** for fast, modern unit testing.

---

## 🌐 Deployment

This site is deployed at:  
**[https://trutrip-test.vercel.app/](https://trutrip-test.vercel.app/)**  

---

## 💡 Additional Notes

- **Domain-driven design:**  
  - Features are organized by domain for scalability and maintainability.
- **Server state management:**  
  - React Query is used for all server interactions, enabling caching, background updates, and optimistic UI.
- **Material UI:**  
  - Ensures a modern, accessible, and responsive design system.
- **Commit hooks:**  
  - Prevent bad commits and ensure code quality before merging.
- **i18n workflow:**  
  - Designed for non-technical users to update translations easily.


Feel free to reach out if you need more details or want to see specific parts of the code.
Maintainer: bashirahilyas@gmail.com