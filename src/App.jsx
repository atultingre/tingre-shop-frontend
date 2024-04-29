import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup/Signup";
import ProductList from "./components/Product/ProductList";
import ProductForm from "./components/Product/ProductForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
