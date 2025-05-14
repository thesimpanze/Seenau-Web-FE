import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import BigPrimaryButton from "../components/BigPrimaryButton";
import Task from "../components/Task";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";
import TimerMode from "../components/TimerMode";
import { useCookies } from "react-cookie";
import LandingPage from "../components/LandingPage";

const Home = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectPreset = (focus, breakTime) => {
    const selectedTime = mode === "pomodoro" ? focus : breakTime;
    setTimeLeft(selectedTime * 60); 
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
  }, []);

  const selected = data[2];
  useEffect(() => {
    if (data.length > 0) {
      const selected = data[1];

      setTimeLeft(mode === "pomodoro" ? selected.time * 60 : selected.break * 60);

      setTimeLeft(mode === "pomodoro" ? selected.time : selected.break);

      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [mode, data]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleReplay = () => {
    if (data.length > 0) {
      const selected = data[2];
      setTimeLeft(mode === "pomodoro" ? selected.time * 60 : selected.break * 60);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  return (
    <>
      <LandingPage />
      <div className="flex m-auto flex-col items-center">
        <Navbar mode={mode} />
        <div className="w-[50%] flex flex-col gap-8 mt-16">
          <div className="flex justify-evenly p-4">
            <button onClick={() => setMode("pomodoro")} className={`${mode === "pomodoro" ? "font-bold border-b-2" : "font-semibold hover:cursor-pointer"}`}>
              Pomodoro
            </button>
            <button onClick={() => setMode("short break")} className={`${mode === "short break" ? "font-bold border-b-2" : "font-semibold hover:cursor-pointer"}`}>
              Short break
            </button>
          </div>
          <button onClick={openModal}>
            <div className="w-56 h-56 rounded-full flex m-auto items-center justify-center border-8 border-black font-bold text-5xl cursor-pointer  hover:scale-110 hover:shadow-2xl hover:drop-shadow-black/80 hover:border-[10px]  transition-all duration-150 delay-150">
              {formatTime(timeLeft)}
            </div>
          </button>
          <div className="m-auto flex justify-center items-center gap-11 text-3xl ">
            <button onClick={() => setIsRunning((prev) => !prev)} className="cursor-pointer">
              {!isRunning ? <FiPlay title="Start" /> : <FiPause title="Pause" />}
            </button>
            <button onClick={handleReplay} className="text-black hover:text-gray-700" title="Replay">
              <FiRotateCcw />
            </button>
          </div>
        </div>

        {isModalOpen && <TimerMode onCancel={closeModal} onSelectPreset={handleSelectPreset} />}

        <Task />
      </div>
    </>
  );
};

export default Home;
