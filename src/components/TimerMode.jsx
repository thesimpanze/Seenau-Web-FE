import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import BigPrimaryButton from "./BigPrimaryButton";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";



const TimerMode = ({ onCancel, onSelectPreset, onShow }) => {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customFocus, setCustomFocus] = useState(50); 
  const [customBreak, setCustomBreak] = useState(20); 

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleSave = () => {
    if (selectedIndex !== null && onSelectPreset) {
      const selected = data[selectedIndex];
      onSelectPreset(selected.time, selected.break, selected.name);
    } else if (onSelectPreset) {
      onSelectPreset(customFocus, customBreak, 'custom');
    }
  };
  console.log(onCancel)

  return (
    <>
      <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/80 `}>
        <div className="bg-white px-8 py-10 flex flex-col gap-4">
          <h1 className="font-bold text-xl">Focus Level</h1>
          <div className="  flex flex-col gap-3">
            {data.map((item, index) => (
              <div key={index} className="flex gap-3 border-b-2 hover:font-semibold transition-all duration-150">
                <input type="radio" name="focus-level" checked={selectedIndex === index} onChange={() => setSelectedIndex(index)} />
                <div className="flex flex-col gap-0.5 ho">
                  <h1 className=" ">{item.name}</h1>
                  <div className="flex items-center gap-6">
                    <span>{item.time} Min </span>
                    <span className="text-md">
                      -
                    </span>
                    <span>{item.break} Min </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="mt-4">
            <h2 className="font-bold text-lg">Custom Preset</h2>
            <div className="grid grid-cols-2 gap-4 mt-2 font-semibold">
              <div className="flex flex-col">
                <label className="text-sm">Focus Time (Min)</label>
                <input type="number" value={customFocus} onChange={(e) => setCustomFocus(e.target.value)} className="border p-2 rounded" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Break Time (Min)</label>
                <input type="number" value={customBreak} onChange={(e) => setCustomBreak(e.target.value)} className="border p-2 rounded" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <SecondaryButton onClick={onCancel} >
                Batal
              </SecondaryButton>
              <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerMode;
