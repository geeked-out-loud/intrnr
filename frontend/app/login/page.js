"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Receptionist from "../components/receptionist";

const styles = {
  container: {
    backgroundColor: "#10202d",
    height: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Arial', sans-serif",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "80%",
    backgroundColor: "#10202d",
    borderRadius: "2%",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    margin: "0 auto",
  },
  darkCard: {
    width: "40%",
    height: "100%",
    backgroundColor: "#000d18",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2% 0 0 2%",
    position: "relative",
  },
  whiteCard: {
    width: "60%",
    height: "100%",
    backgroundColor: "#aec5ca",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    borderRadius: "0 2% 2% 0",
    boxSizing: "border-box",
  },
  formWrapper: {
    width: "90%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    textAlign: "left",
  },
  formHeading: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textAlign: "left",
    color: "#000d18",
  },
  mnemonicGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  mnemonicInput: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "999px",
    border: "2px solid #000d18",
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  formNote: {
    fontSize: "0.9rem",
    color: "#333",
    textAlign: "left",
    lineHeight: "1.4",
  },
  loginButton: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#000d18",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: "2%",
    left: "2%",
    padding: "0.5rem 1rem",
    backgroundColor: "#aec5ca",
    color: "#000d18",
    border: "none",
    borderRadius: "0.3rem",
    fontFamily: "'Arial', sans-serif",
    fontWeight: "bold",
    fontSize: "0.7rem",
    cursor: "pointer",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    zIndex: 2,
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [mnemonics, setMnemonics] = useState(Array(12).fill(""));
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    Object.assign(document.body.style, { margin: "0", padding: "0", border: "none" });
    const savedEmail = sessionStorage.getItem("intrnr_email_hint");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleInputChange = (index, value) => {
    const updated = [...mnemonics];
    updated[index] = value.trim().toLowerCase();
    setMnemonics(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email) {
      setMessage({ type: "error", text: "Email hint not found in session." });
      return;
    }

    if (mnemonics.some((word) => !word)) {
      setMessage({ type: "error", text: "Please fill in all 12 words." });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          mnemonic: mnemonics.join(" "),
        }),
      });

      const data = await res.json();

      if (data?.success) {
        router.push("/feed");
      } else {
        throw new Error(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <div style={styles.darkCard}>
          <button style={styles.backButton} onClick={() => router.push("/")}>
            BACK
          </button>
          <Receptionist />
        </div>

        <div style={styles.whiteCard}>
          <form style={styles.formWrapper} onSubmit={handleSubmit}>
            <h2 style={styles.formHeading}>
              Enter Your Secret Recovery Phrase
            </h2>

            {message.text && (
              <div
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.3rem",
                  backgroundColor: message.type === "error" ? "#ffdddd" : "#ddffdd",
                  color: message.type === "error" ? "#ff0000" : "#008800",
                  marginBottom: "1rem",
                }}
              >
                {message.text}
              </div>
            )}

            <div style={styles.mnemonicGrid}>
              {mnemonics.map((word, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`${index + 1}`}
                  value={word}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  style={styles.mnemonicInput}
                  disabled={isLoading}
                />
              ))}
            </div>

            <p style={styles.formNote}>
              Enter the 12-word secret recovery phrase linked to your identity.
              We do not store this phrase anywhere.
            </p>

            <button
              type="submit"
              style={{
                ...styles.loginButton,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              disabled={isLoading}
            >
              {isLoading ? "VERIFYING..." : "VERIFY & LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
