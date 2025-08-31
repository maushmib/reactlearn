import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    loginBox: {
      background: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
      width: "320px",
      textAlign: "center",
    },
    input: {
      width: "90%",
      padding: "12px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "8px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#6c63ff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    error: {
      color: "red",
      marginTop: "10px",
      fontSize: "14px",
    },
    welcomeBox: {
      background: "#fff",
      padding: "40px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
    },
    welcomeText: {
      color: "#6c63ff",
    },
    welcomePara: {
      color: "#555",
      fontSize: "18px",
    },
  };

  if (isLoggedIn) {
    return (
      <div style={styles.body}>
        <div style={styles.welcomeBox}>
          <h1 style={styles.welcomeText}>Welcome, {username}!</h1>
          <p style={styles.welcomePara}>You have successfully logged in.</p>
          <button
            style={styles.button}
            onClick={() => {
              setIsLoggedIn(false);
              setUsername("");
              setPassword("");
              setError("");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.body}>
      <div style={styles.loginBox}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
