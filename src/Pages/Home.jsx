import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Task from "../components/Task";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";
import TimerMode from "../components/TimerMode";
import LandingPage from "../components/LandingPage";
import UseAuthCheck from "../services/UseAuthCheck";
import { createPattern } from "../services/API";

const Home = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState({ focus: 0, breakTime: 0, name: "" });
  const [isFromPlay, setIsFromPlay] = useState(false);
  const [lastMode, setLastMode] = useState(null);
  const [period, setPeriod] = useState(0);
  const { isAuth, loading } = UseAuthCheck();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectPreset = (focus, breakTime, presetName) => {
    const selectedTime = mode === "pomodoro" ? focus : breakTime;
    setSelectedPreset({ focus, breakTime, name: presetName });
    setTimeLeft(selectedTime * 60);
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedPreset) {
      const newTime = mode === "pomodoro" ? selectedPreset.focus : selectedPreset.breakTime;
      setTimeLeft(newTime * 60);
      if (!isFromPlay) {
        setIsRunning(false);
      }
      setIsFromPlay(false);
    }
  }, [mode, selectedPreset]);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            const nextMode = mode === "pomodoro" ? "short break" : "pomodoro";
            setMode(nextMode);

            if (mode === "short break" && lastMode === "pomodoro") {
              setPeriod((prev) => prev + 1);
            }
            setLastMode(mode);
            setTimeout(() => {
              const nextTime = nextMode === "pomodoro" ? selectedPreset.focus : selectedPreset.breakTime;
              setTimeLeft(nextTime * 60);
              setIsRunning(true);
            }, 100);

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
    const name = selectedPreset.name || "default";
    const focus_time = selectedPreset.focus *60;
    const break_time = selectedPreset.breakTime *60;
    const periodValue = period;
    const description = name;
    const category = "menengah";

    setTimeLeft(mode === "pomodoro" ? selectedPreset.focus * 60 : selectedPreset.breakTime * 60);
    setIsRunning(false);
    clearInterval(intervalRef.current);
    handleSendPattern(name, focus_time, break_time, periodValue, description, category);
  };

  const handleSendPattern = async (name, focus_time, break_time, period, description, category) => {
    try {
      let res = await createPattern(name, focus_time, break_time, period, description, category);
      console.log(res.data)
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };
  
  return (
    <>
      {!isAuth && <LandingPage />}
      <div className="flex m-auto flex-col items-center">
        <Navbar mode={mode} />
        <div className="w-[50%] flex flex-col gap-8 mt-16">
          <div className="flex md:justify-evenly justify-between p-4 md:text-base text-sm md:gap-8 gap-4">
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
          
          <span className="text-center text-lg font-semibold">Interval: {period}</span>
          <div className="m-auto flex justify-center items-center gap-11 text-3xl ">
            <button onClick={() => setIsRunning((prev) => !prev)} className="cursor-pointer" disabled={selectedPreset.focus === 0 || !selectedPreset.breakTime === 0} >
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
