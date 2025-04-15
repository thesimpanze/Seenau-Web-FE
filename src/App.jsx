import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import BigPrimaryButton from "./components/BigPrimaryButton";

function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("pomodoro");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
  }, []);

  const selected = data[0];
  const time = selected ? (mode === "pomodoro" ? selected.time : selected.break) : 0;

  console.log("Selected:", selected);
  console.log("Data:", data);

  return (
    <div className="flex m-auto flex-col items-center">
      <Navbar />
      <div className="w-[50%] flex flex-col gap-8 mt-9">
        <div className="flex justify-evenly p-4">
          <button onClick={() => setMode("pomodoro")} className={` ${mode === "pomodoro" ? "font-bold border-b-2 " : "font=semibold"}`}>
            Pomodoro
          </button>
          <button onClick={() => setMode("short break")} className={` ${mode === "short break" ? "font-bold border-b-2" : "font-semibold"}`}>
            Short break
          </button>
        </div>
        {selected ? (
          <div className="w-48 h-48 rounded-full flex m-auto items-center justify-center border-4 border-black font-bold text-3xl">{mode === "pomodoro" ? selected.time : selected.break}:00</div>
        ) : (
          <div className="w-48 h-48 rounded-full flex m-auto items-center justify-center border-4 border-black font-bold text-3xl">Loading...</div>
        )}
        <div className="m-auto flex justify-center items-center">
          <BigPrimaryButton>Start</BigPrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default App;
