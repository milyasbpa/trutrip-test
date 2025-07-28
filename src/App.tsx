import { useContext } from "react";
import PrivateRoute from "./core/router/components/private/Private.route";
import PublicRoute from "./core/router/components/public/Public.route";
import { routes } from "./core/router/config";
import { Route, Routes } from "react-router";
import { AuthContext } from "./features/private/auth/context";
import { useLocaleRouter } from "./core/router/hooks";

function App() {
  const { state } = useContext(AuthContext);
  useLocaleRouter();

  return (
    <Routes>
      {routes.map(({ path, component: Component, isPrivate }) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute isAuthenticated={state.state.isAuthenticated}>
                  <Component />
                </PrivateRoute>
              ) : (
                <PublicRoute isAuthenticated={state.state.isAuthenticated}>
                  <Component />
                </PublicRoute>
              )
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
