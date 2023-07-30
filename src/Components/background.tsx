import React from "react";
import backgroundImage from "../images/background.jpg";

export default function Background() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        opacity: 0.4,
        backgroundPositionY: "center",
        backgroundSize: "cover",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></div>
  );
}
