import { use, useEffect, useState } from "react";
import BigPrimaryButton from "../components/BigPrimaryButton";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import EditProfile from "../components/EditProfile";
import { getAllPatterns, getTasks } from "../services/API";
import UseAuthCheck from "../services/UseAuthCheck";
import AuthModal from "../components/AuthModal";
import LoadingSpinner from "../components/LoadingSpinner";


const data = [
  { name: "Mon", focus: 3 },
  { name: "Tue", focus: 4.5 },
  { name: "Wed", focus: 2 },
  { name: "Thu", focus: 5 },
  { name: "Fri", focus: 3.5 },
  { name: "Sat", focus: 4 },
  { name: "Sun", focus: 2.5 },
];

const barColors = ["#FACC15", "#000000"];

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [totalTask, setTotalTask] = useState([]);
  const { isAuth, loading } = UseAuthCheck();
  const dataUser = JSON.parse(localStorage.getItem("token"));
  const user = dataUser || {};
  const [getPartterns, setGetPatterns] = useState([]);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };
  UseAuthCheck()
  const closeModal = () => {
    setShowModal(false);
  };
  const closeOtpModal = () => {
    setShowOtpModal(false);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTasks();
        const res = await getAllPatterns();
        setGetPatterns(res.data.data);
        setTotalTask(response.data.data);
        setTotalFocusTime(res.data.data.reduce((acc, pattern) => acc + (pattern.focus_time || 0), 0));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${min}Mnt ${sec}S`;
  };
  const chartData =
    getPartterns.length > 0
      ? getPartterns.map((pattern, index) => ({
          name: pattern.name || `Day ${index + 1}`,
          focus: pattern.focus_time || 0,
          focus_time: pattern.focus_time || 0,
        }))
      : data;
  return (
    <div className="min-h-screen bg-white pb-24 relative">
      {dataUser === null ? <AuthModal /> : null}
      <Navbar />
      <section className="bg-black text-white px-6 pb-6 pt-14 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-semibold">Ur</div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm">{user.email}</p>
            <span className="text-yellow-400 font-semibold text-sm">{user.isVerified ? "Terverfikasi" : "Belum Terverifikasi"}</span>
          </div>
        </div>
        <button onClick={openModal} className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
          Profile
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Total Focus Time</h2>
          <p className="text-2xl font-bold">{formatTime(totalFocusTime * 60)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Total Task</h2>
          <p className="text-2xl font-bold">{totalTask.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Preferred Focus Level</h2>
          <p className="text-2xl">Populer</p>
        </div>
      </section>

      <section className="mt-16 px-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Focus Time This Week</h2>
        <div className="w-full h-72 shadow-lg bg-white rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, "dataMax + 1"]} />
              <Tooltip />
              <Bar dataKey="focus">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Modal Edit Profile */}
      {showModal && <EditProfile onCancel={closeModal} />}

      {/* Modal OTP */}
      {showOtpModal && <OtpModal onClose={closeOtpModal} />}
    </div>
  );
};

export default Dashboard;
