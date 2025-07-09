import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "./aws-exports";
import Notes from './components/Notes';

// ✅ Correctly configure Amplify
Amplify.configure(awsExports);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div style={{ backgroundColor: darkMode ? "#121212" : "#fefefe", minHeight: "100vh" }}>
      <Authenticator>
        {({ signOut, user }) => (
          <main
            style={{
              padding: "2rem",
              fontFamily: "Segoe UI, sans-serif",
              color: darkMode ? "#ffffff" : "#333",
              transition: "0.3s ease",
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <h2 style={{ fontSize: "1.5rem" }}>
                👋 Welcome,{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user.attributes?.name ||
                    user.attributes?.preferred_username ||
                    user.username}
                </span>
              </h2>

              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <button
                  onClick={toggleDarkMode}
                  style={{
                    background: darkMode
                      ? "linear-gradient(to right, #00c6ff, #0072ff)"
                      : "linear-gradient(to right, #ffefba, #ffffff)",
                    color: "#000",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>

                <button
                  onClick={signOut}
                  style={{
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                    color: "#fff",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>

            <Notes darkMode={darkMode} />
          </main>
        )}
      </Authenticator>
    </div>
  );
}
