import React from "react";
import mapImage from "../images/map.png";
import area1 from "../images/area1.png";
import area2 from "../images/area2.png";
import area3 from "../images/area3.png";
import area4 from "../images/area4.png";
import area5 from "../images/area5.png";
import area6 from "../images/area6.png";
import area7 from "../images/area7.png";
import area8 from "../images/area8.png";
import area9 from "../images/area9.png";
import { areaCodes } from "../AreaCodes";

interface IProps {
  exploredAreas: number[];
  unlockArea: (area: number) => void;
  resetAreas: () => void;
}

const positionStyle: React.CSSProperties = {
  height: "100%",
  position: "absolute",
  top: 16,
  left: "50%",
  transform: "translate(-50%, 0)",
};

const fowParts: { [index: number]: string } = {
  1: area1,
  2: area2,
  3: area3,
  4: area4,
  5: area5,
  6: area6,
  7: area7,
  8: area8,
  9: area9,
};

export default function Map({ exploredAreas, unlockArea, resetAreas }: IProps) {
  const enterCode = () => {
    const response = window.prompt("Enter area code") || "";
    if (response.toLowerCase() === "reset") resetAreas();
    else {
      Object.keys(areaCodes)
        .filter((a) => response.toLowerCase() === areaCodes[parseInt(a)])
        .forEach((a) => unlockArea(parseInt(a)));
    }
  };

  return (
    <div
      onClick={enterCode}
      style={{ height: "calc(100vh - 128px)", width: "100vw", textAlign: "center", position: "absolute", top: 0, left: 0 }}
    >
      <img alt="map base" style={{ ...positionStyle }} src={mapImage} />
      <img alt="map base filter" style={{ ...positionStyle, filter: "sepia()", opacity: "0.8" }} src={mapImage} />
      {Object.keys(fowParts)
        .filter((key) => !exploredAreas.includes(parseInt(key)))
        .map((key) => (
          <img key={key} alt="fow Part" style={{ ...positionStyle }} src={fowParts[parseInt(key)]} />
        ))}
    </div>
  );
}
