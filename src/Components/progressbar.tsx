import React, { useEffect } from "react";
import "../styles/progressbar.css";

interface IProps {
  progress: number;
}

export default function Progressbar({ progress }: IProps) {
  useEffect(() => {
    document.getElementById("progressbar")?.remove();

    const progressbar = document.createElement("div");
    progressbar.id = "progressbar";
    progressbar.className = "range";
    progressbar.style.cssText = `--p:${progress * 100}`;

    document.getElementById("progressBarContainer")?.appendChild(progressbar);
  }, [progress]);

  return (
    <div
      id="progressBarContainer"
      style={{ position: "absolute", bottom: 46, left: "50%", transform: "translate(-50%, 0)" }}
    ></div>
  );
}
