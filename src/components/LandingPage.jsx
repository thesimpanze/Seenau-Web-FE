import Typewriter from "typewriter-effect";
import BigPrimaryButton from "./BigPrimaryButton";
import { useState } from "react";

const LandingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className={`fixed w-full h-full justify-center items-center flex flex-col pb-6 px-1 bg-white z-50 transition-all ease-in-out duration-500 ${openModal ? "-translate-y-full" : " "}`}>
        <div className="flex gap-2 w-full h-full p-3 justify-center items-center">
          <div className=" md:p-4 p-2 w-3/4 flex flex-col justify-center gap-4">
            <div className="font-bold leading-tight md:text-7xl text-6xl  flex flex-col gap-2 ">
              <span>
                <span className="bg-yellow-300 px-1">See</span>nau
              </span>
              <div className=" gap-1 ">
                <p>Customize Your </p>
                <Typewriter
                  options={{
                    strings: [" Pomodoro", " Timer", " Learn"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </div>
            <div className="md:w-[70%]">
              <p className=" text-gray-700 text-lg "> Stay consistent and gain insights into your study time, See our documentation <span className=" underline">here.</span></p>
              
            </div>
          </div>
          <div className="hidden lg:block w-2/5">
            <img src="../../public/timer.png" className="hover:rotate-6" alt="" />
          </div>
        </div>
        <div className="fixed bottom-3">

        <BigPrimaryButton onClick={() => setOpenModal(true)}>Start Here!</BigPrimaryButton>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
