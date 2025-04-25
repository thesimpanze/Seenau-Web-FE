import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import BigPrimaryButton from "../components/BigPrimaryButton";
import Task from "../components/Task";
import {FiPlay, FiPause,  FiRotateCcw } from "react-icons/fi";
import TimerMode from "../components/TimerMode";
import { Cookies, useCookies } from "react-cookie";



const Home = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['cookie']);
  console.log(cookies.cookie)

  const openModal = () =>{
    setIsModalOpen(true);
  }

  const closeModal = () =>{
    setIsModalOpen(false);
  }

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const selected = data[2];
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
    return `${min}.${sec}`;
  };

  const handleReplay = () => {
    if (data.length > 0) {
      const selected = data[2];
      setTimeLeft(mode === "pomodoro" ? selected.time : selected.break);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="flex m-auto flex-col items-center">
      <Navbar mode={mode} />
      <div className="w-[50%] flex flex-col gap-8 mt-9">
        <div className="flex justify-evenly p-4">
          <button onClick={() => setMode("pomodoro")} className={`${mode === "pomodoro" ? "font-bold border-b-2" : "font-semibold"}`}>
            Pomodoro
          </button>
          <button onClick={() => setMode("short break")} className={`${mode === "short break" ? "font-bold border-b-2" : "font-semibold"}`}>
            Short break
          </button>
        </div>
        <button onClick={openModal}>

        <div className="w-56 h-56 rounded-full flex m-auto items-center justify-center border-8 border-black font-bold text-5xl ">{formatTime(timeLeft)}</div>
        </button>
        <div className="m-auto flex justify-center items-center gap-11 text-3xl">
          <button onClick={() => setIsRunning((prev) => !prev)} className="">{!isRunning ? (<FiPlay title="Pause"/>) : (<FiPause title="Play"/>)}</button>
          <button onClick={handleReplay} className="text-black hover:text-gray-700 " title="Replay">
            <FiRotateCcw />
          </button>
        </div>
      </div>
      {isModalOpen && (
        
      <TimerMode onCancel={closeModal}/>
      )}
      <Task />
    </div>
  );
}

export default Home;
