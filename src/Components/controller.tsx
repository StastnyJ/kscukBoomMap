import React, { useState } from "react";

interface IProps {
  progress: number;
  reset: () => void;
}

export default function Controller({ progress, reset }: IProps) {
  const [newVal, setNewVal] = useState("0");

  const saveProgress = () => fetch("http://localhost:8000/" + newVal, { method: "POST" });

  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center" }}>{progress}</h1>
      <input type="text" value={newVal} onChange={(e) => setNewVal(e.target.value)} />
      <button onClick={saveProgress}>Save</button>
      <button onClick={reset}>Map</button>
    </>
  );
}
