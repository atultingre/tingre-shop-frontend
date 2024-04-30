import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import ProductForm from "./components/Admin/Product/ProductForm";
import ProductList from "./components/Admin/Product/ProductList";
import Register from "./components/Auth/Register/Register";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
