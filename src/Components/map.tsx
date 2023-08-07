import React, { useEffect, useState } from "react";

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

import lootbox from "../images/landmarks/lootbox.png";
import quest from "../images/landmarks/quest.png";
import { useWindowWidth } from "@react-hook/window-size";

interface ILandmark {
  x: number;
  y: number;
  type: LMType;
  finished: boolean;
}

type LMType = "lootbox" | "quest";

interface IProps {
  exploredAreas: number[];
  unlockArea: (area: number) => void;
  resetAreas: () => void;
  openController: () => void;
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

export default function Map({ exploredAreas, unlockArea, resetAreas, openController }: IProps) {
  const [landmarkSetterMode, setLandmarkSetterMode] = useState(false);
  const [landmarks, setLandmarks] = useState<ILandmark[]>([]);
  const [lmType, setLmType] = useState<LMType>("lootbox");
  const [mapSize, setMapSize] = useState<number[]>([0, 0]);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    fetch("http://localhost:8000/landmarks").then((response) => {
      response.json().then((data) => {
        setLandmarks(data);
      });
    });
  }, []);

  const enterCode = () => {
    const response = window.prompt("Enter area code") || "";
    if (response.toLowerCase() === "reset") resetAreas();
    if (response.toLowerCase() === "landmark") setLandmarkSetterMode(true);
    if (response.toLowerCase() === "controller") openController();
    else {
      Object.keys(areaCodes)
        .filter((a) => response.toLowerCase() === areaCodes[parseInt(a)])
        .forEach((a) => unlockArea(parseInt(a)));
    }
  };

  const imageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    var offset = e.currentTarget.getBoundingClientRect();
    var x = Math.floor(((e.pageX - offset.left) / offset.width) * 10000) / 100;
    var y = Math.floor(((e.pageY - offset.top) / offset.height) * 10000) / 100;
    fetch("http://localhost:8000/landmarks", {
      method: "POST",
      body: JSON.stringify([...landmarks, { x, y, type: lmType, finished: false }]),
    }).then((response) => {
      if (response.ok) setLandmarks([...landmarks, { x, y, type: lmType, finished: false }]);
    });
  };

  const deleteLandmark = (index: number) => {
    fetch(`http://localhost:8000/landmarks`, {
      method: "POST",
      body: JSON.stringify(landmarks.filter((l, i) => i !== index)),
    }).then((response) => {
      if (response.ok) setLandmarks(landmarks.filter((l, i) => i !== index));
    });
  };

  const toggleLandmarkVisibility = (index: number) => {
    fetch(`http://localhost:8000/landmarks`, {
      method: "POST",
      body: JSON.stringify(landmarks.map((l, i) => (i === index ? { ...l, finished: !l.finished } : l))),
    }).then((response) => {
      if (response.ok) setLandmarks(landmarks.map((l, i) => (i === index ? { ...l, finished: !l.finished } : l)));
    });
  };

  return (
    <div style={{ height: "calc(100vh - 128px)", width: "100vw", textAlign: "center", position: "absolute", top: 0, left: 0 }}>
      <div
        style={{ position: "absolute", height: "100%", left: 0, top: 0, width: `${(windowWidth - mapSize[0]) / 2}px` }}
        onClick={enterCode}
      ></div>
      <div
        style={{ position: "absolute", height: "100%", right: 0, top: 0, width: `${(windowWidth - mapSize[0]) / 2}px` }}
        onClick={() => setLmType(lmType === "lootbox" ? "quest" : "lootbox")}
      >
        {landmarkSetterMode && <p>{lmType}</p>}
      </div>
      <img alt="map base" style={{ ...positionStyle }} src={mapImage} />
      <img
        alt="map base filter"
        style={{ ...positionStyle, filter: "sepia()", opacity: "0.8" }}
        src={mapImage}
        onClick={landmarkSetterMode ? imageClick : undefined}
        onLoad={(e) => setMapSize([e.currentTarget.width, e.currentTarget.height])}
      />
      {!landmarkSetterMode &&
        Object.keys(fowParts)
          .filter((key) => !exploredAreas.includes(parseInt(key)))
          .map((key) => (
            <img
              key={key}
              alt="fow Part"
              style={{ ...positionStyle, zIndex: 999, pointerEvents: "none" }}
              src={fowParts[parseInt(key)]}
            />
          ))}
      {landmarks.map((l, i) => (
        <React.Fragment key={i}>
          <img
            alt="landmark"
            style={{
              height: 22,
              position: "absolute",
              top: `${16 + l.y * mapSize[1] * 0.01}px`,
              left: `${0.5 * (windowWidth - mapSize[0]) + l.x * mapSize[0] * 0.01}px`,
              transform: "translate(-50%, -50%)",
              filter: l.finished ? "grayscale(1)" : "grayscale(0)",
              opacity: l.finished ? 0.5 : 1,
            }}
            src={l.type === "lootbox" ? lootbox : quest}
            onClick={(e) => {
              console.log("xxx");
              landmarkSetterMode ? deleteLandmark(i) : toggleLandmarkVisibility(i);
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
