import { useState, useEffect, useRef } from "react";

const styles = {
  eyeContainer: {
    position: "relative",
    width: "30%",
    aspectRatio: "1",
    borderRadius: "50%",
    backgroundColor: "#aec5ca", // "Sclera" color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%", // Add padding to create a gap
  },
  pupil: {
    position: "absolute",
    width: "18%", // Adjust size to account for padding
    aspectRatio: "1",
    borderRadius: "50%",
    backgroundColor: "#000d18", // "Pupil" color
    transition: "transform 0.1s ease-out",
  },
};

export default function Receptionist() {
  const containerRef = useRef(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    let x = e.clientX - eyeCenterX;
    let y = e.clientY - eyeCenterY;

    const maxDistance = (rect.width * 0.4) - (rect.width * 0.05); // Adjust max distance to account for padding
    const distance = Math.sqrt(x * x + y * y);

    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      x *= scale;
      y *= scale;
    }

    setPupilPos({ x, y });
  };

  const resetPupil = () => {
    setPupilPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", resetPupil);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", resetPupil);
    };
  }, []);

  return (
    <div ref={containerRef} style={styles.eyeContainer}>
      <div
        style={{
          ...styles.pupil,
          transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
        }}
      />
    </div>
  );
}
