import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup/Signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
