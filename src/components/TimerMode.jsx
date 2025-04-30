import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import BigPrimaryButton from "./BigPrimaryButton";

const TimerMode = ({ onCancel, onSelectPreset }) => {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customFocus, setCustomFocus] = useState(50); // Default value for custom focus time
  const [customBreak, setCustomBreak] = useState(20); // Default value for custom break time

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
  }, []);


  const handleSave = () => {
    if (selectedIndex !== null && onSelectPreset) {
      const selected = data[selectedIndex];
      onSelectPreset(selected.time, selected.break);
    } else if (onSelectPreset) {
      // Save custom preset
      onSelectPreset(customFocus, customBreak);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <div className="bg-white px-8 py-10 flex flex-col gap-4 rounded-md w-[90%] max-w-md">
        <h1 className="font-bold text-xl mb-2">Focus Level</h1>
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex gap-3 border p-3 rounded cursor-pointer transition-all ${
                selectedIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <input
                type="radio"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
              />
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold">{item.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-700">
                  <span>{item.time} Min</span>
                  <FaCircle className="text-xs" />
                  <span>{item.break} Min</span>
                </div>
              </div>

const TimerMode =({onCancel})=>{
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        fetch("/data.json")
          .then((res) => res.json())
          .then((json) => setData(json))
          .catch((err) => console.error("Error:", err));
      }, []);
      
    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
        <div className="bg-white px-8 py-10 flex flex-col gap-4">
            <h1 className="font-bold text-xl">Focus Level</h1>
            <div className="  flex flex-col gap-3">
            {data.map((item, index) => (
                <div key={index} className="flex gap-3 border-b-2">
                    <input
                    type="radio"
                    name="focus-level"
                    checked={selected === index}
                    onChange={() => setSelected(index)}
                    />
                    <div className="flex flex-col gap-0.5">
                    <h1 className="font-semibold">{item.name}</h1>
                    <div className="flex items-center gap-6">
                        <span>{item.time} Min </span>
                        <span className="text-xs">
                        <FaCircle />
                        </span>
                        <span>{item.break} Min </span>
                    </div>
                    </div>
                </div>
                ))}


            </div>
          ))}
        </div>

        {/* Custom Preset Input Section */}
        <div className="mt-4">
          <h2 className="font-semibold text-lg">Custom Preset</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-sm">Focus Time (Min)</label>
              <input
                type="number"
                value={customFocus}
                onChange={(e) => setCustomFocus(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Break Time (Min)</label>
              <input
                type="number"
                value={customBreak}
                onChange={(e) => setCustomBreak(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Batal
          </button>
          <BigPrimaryButton onClick={handleSave}>Save</BigPrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TimerMode;
