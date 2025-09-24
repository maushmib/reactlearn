import { useState } from "react";
import { useAuth } from "./App";

export default function Login() {
  const { setLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🎨 Art Exhibition Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

