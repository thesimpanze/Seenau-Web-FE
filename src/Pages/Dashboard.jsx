import { useState } from "react";
import BigPrimaryButton from "../components/BigPrimaryButton";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

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

  return (
    <div className="min-h-screen bg-white pb-24 relative">
      <Navbar />

      {/* Header Section */}
      <section className="bg-black text-white px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-semibold">
            Ur
          </div>
          <div>
            <h1 className="text-2xl font-bold">User</h1>
            <p className="text-sm">user@gmail.com</p>
            <span className="text-yellow-400 font-semibold text-sm">Focus Master</span>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)} // Memastikan modal terbuka
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Edit Profile
        </button>
      </section>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Total Focus Time</h2>
          <p className="text-2xl">5h 15m</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Task Completed</h2>
          <p className="text-2xl">10</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold">Preferred Focus Level</h2>
          <p className="text-2xl">Populer</p>
        </div>
      </section>

      {/* Chart Section */}
      <section className="mt-16 px-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Focus Time This Week
        </h2>
        <div className="w-full h-72 shadow-lg bg-white rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="h" domain={[0, 6]} />
              <Tooltip />
              <Bar dataKey="focus">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                    radius={[0, 0, 0, 0]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Modal Edit Profile */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-8 rounded-lg relative shadow-xl shadow-gray-600">
            <button
              onClick={() => setShowModal(false)} // Menutup modal saat tombol ini diklik
              className="absolute top-3 right-4 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
                KJ
              </div>
              <form className="flex-1 flex flex-col gap-3">
                <label className="font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border px-3 py-2 rounded"
                />

                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border px-3 py-2 rounded"
                />

                <label className="font-semibold mt-2">Change Password</label>
                <input
                  type="password"
                  placeholder="Current Password"
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="border px-3 py-2 rounded"
                />

                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="border border-black text-red-600 px-6 py-2 rounded font-semibold"
                  >
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
