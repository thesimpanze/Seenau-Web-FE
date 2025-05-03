import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TimerMode from "./components/TimerMode";
import OtpModal from "./Pages/OtpModal";
import LandingPage from "./components/LandingPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer" element={<TimerMode />} />
        <Route path="/otp" element={<OtpModal />} />
        <Route path="/test" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
