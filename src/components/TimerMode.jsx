import { useEffect, useState } from "react";
import { FiSlack } from "react-icons/fi";
import PrimaryButton from "./PrimaryButton";
import BigPrimaryButton from "./BigPrimaryButton";
import { FaCircle } from "react-icons/fa";



const TimerMode =({onCancel})=>{
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/data.json")
          .then((res) => res.json())
          .then((json) => setData(json))
          .catch((err) => console.error("Error:", err));
      }, []);
      console.log(data);
    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
        <div className="bg-white px-8 py-10 flex flex-col gap-4">
            <h1 className="font-bold text-xl">Focus Level</h1>
            <div className="  flex flex-col gap-3">
                {data.map((item, index) =>(
                    <div key={index} className="flex gap-3 border-b-2">
                        <input type="checkbox" />
                        <div className="flex flex-col gap-0.5">
                            <h1 className="font-semibold">{item.name}</h1>
                            <div className="flex items-center gap-6">
                                <span>{item.time} Min </span>
                                <span className="text-xs">
                                <FaCircle/>                                
                                </span>
                                <span>{item.break} Min </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full">
                <BigPrimaryButton onClick={onCancel}>Save</BigPrimaryButton>
            </div>
        </div>
        </div>
        </>
    )
}

export default TimerMode;