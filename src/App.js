import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import Login from "./Login";
import Gallery from "./Gallery";
import FavoritesPage from "./FavoritesPage";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { FavoritesProvider } from "./FavoritesContext";

const AuthContext = createContext();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("loggedIn");
    if (savedLogin === "true") setLoggedIn(true);
  }, []);

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
          <MainApp loggedIn={loggedIn} />
        </AuthContext.Provider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

function MainApp({ loggedIn }) {
  const { theme } = useTheme();
  return (
    <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
      {loggedIn ? <Gallery /> : <Login />}
    </div>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
