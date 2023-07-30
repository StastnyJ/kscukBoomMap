import React, { useEffect, useState } from "react";
import Map from "./Components/map";
import Background from "./Components/background";
import Progressbar from "./Components/progressbar";

function App() {
  const [progress, setProgress] = useState(0);
  const [exploredAreas, setExploredAreasRaw] = useState<number[]>(JSON.parse(localStorage.getItem("exploredAreas") || "[]"));

  const setExploredAreas = (areas: number[]) => {
    localStorage.setItem("exploredAreas", JSON.stringify(areas));
    setExploredAreasRaw(areas);
  };

  // TODO make this controllable
  useEffect(() => {
    setTimeout(() => setProgress(progress < 1 ? progress + 0.01 : 0), 1000);
  }, [progress]);

  return (
    <>
      <Background />
      <Map
        exploredAreas={exploredAreas}
        unlockArea={(a) => setExploredAreas([...exploredAreas, a])}
        resetAreas={() => setExploredAreas([])}
      />
      <Progressbar progress={progress} />
    </>
  );
}

export default App;
