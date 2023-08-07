import React, { useEffect, useState } from "react";
import Map from "./Components/map";
import Background from "./Components/background";
import Progressbar from "./Components/progressbar";
import Controller from "./Components/controller";

function App() {
  const [progress, setProgress] = useState(0);
  const [version, setVersion] = useState(0);
  const [exploredAreas, setExploredAreasRaw] = useState<number[]>(JSON.parse(localStorage.getItem("exploredAreas") || "[]"));
  const [controllerMode, setControllerMode] = useState(false);

  const setExploredAreas = (areas: number[]) => {
    localStorage.setItem("exploredAreas", JSON.stringify(areas));
    setExploredAreasRaw(areas);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVersion(version + 1);
      fetch("http://localhost:8000/").then((response) => {
        response.text().then((data) => {
          setProgress(parseFloat(data));
        });
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [version]);

  return controllerMode ? (
    <Controller progress={progress} reset={() => setControllerMode(false)} />
  ) : (
    <>
      <Background />
      <Map
        exploredAreas={exploredAreas}
        unlockArea={(a) => setExploredAreas([...exploredAreas, a])}
        resetAreas={() => setExploredAreas([])}
        openController={() => setControllerMode(true)}
      />
      <Progressbar progress={progress} />
    </>
  );
}

export default App;
