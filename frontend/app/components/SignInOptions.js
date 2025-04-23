"use client";
import { useState } from "react";
import styles from './SignInOptions.module.css';

export default function SignInOptions({ onValidEmail }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Basic email validation
  const validateEmail = (value) => {
    if (!value) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
    } else {
      setError("");
      onValidEmail(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.heading}>
        Get Back Where <br /> You Left
      </h2>
      <input
        type="text"
        placeholder="UserId/Email-Id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        style={{
          border: error ? `2px solid ${styles.errorColor}` : undefined,
        }}
      />
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorText}>{error}</span>
        </div>
      )}
      <button type="submit" className={styles.primaryButton}>
        LOG IN
      </button>
      <div className={styles.separatorContainer}>
        <div className={styles.separatorLine}></div>
        <span className={styles.separatorText}>or</span>
        <div className={styles.separatorLine}></div>
      </div>
      <button type="button" className={styles.guestButton}>
        Explore Intrnr As Guest
      </button>
      <div className={styles.footer}>
        New to Intrnr?{" "}
        <a href="/signup" className={styles.footerLink}>
          Create Account
        </a>
      </div>
    </form>
  );
}