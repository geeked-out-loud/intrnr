"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInOptions from "./components/SignInOptions";

const styles = {
  container: {
    backgroundColor: "#10202d",
    height: "200vh", // Extra height for scrolling
    margin: 0,
    padding: 0,
  },
  cardContainer: {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteCard: {
    position: "absolute",
    top: "10vh",
    left: "10vw",
    height: "75vh",
    width: "80vw",
    backgroundColor: "#aec5ca",
    borderRadius: "22px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
    zIndex: 0,
    overflow: "hidden",
  },
  darkCard: {
    position: "absolute",
    top: "10vh",
    left: "10vw",
    height: "75vh",
    backgroundColor: "#000d18",
    borderRadius: "20px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "width 0.08s linear",
    zIndex: 1,
  },
  logo: {
    width: "85%",
    height: "auto",
  },
  logInContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "32vw", // space that will be revealed once dark card shrinks
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const onValidEmail = (email) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intrnr_email_hint", email);
    }
    router.replace("/login");
  };

  useEffect(() => {
    // Optimize by directly setting body styles once
    Object.assign(document.body.style, {
      margin: "0",
      padding: "0",
      border: "none",
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const maxScroll = 200;
  const initialWidth = 80;
  const finalWidth = 48;
  const computedWidthVW =
    scrollY < maxScroll
      ? initialWidth - ((initialWidth - finalWidth) * (scrollY / maxScroll))
      : finalWidth;

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        {/* White card with SignInOptions */}
        <div style={styles.whiteCard}>
          <div style={styles.logInContainer}>
            <SignInOptions onValidEmail={onValidEmail} /> {/* Pass onValidEmail */}
          </div>
        </div>

        {/* Dark card with dynamic width */}
        <div style={{ ...styles.darkCard, width: `${computedWidthVW}vw` }}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
        </div>
      </div>
    </div>
  );
}
