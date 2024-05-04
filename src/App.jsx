import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/Admin/Product/ProductList";
import Register from "./components/Auth/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import { useStore } from "./context/StoreContext";
import Product from "./components/frontend/Product/Product";
import ShoppingCart from "./components/frontend/Cart/ShoppingCart";
import MyOrders from "./components/frontend/MyOrders/MyOrders";
import PlaceOrder from "./components/frontend/PlaceOrder/PlaceOrder";
import Orders from "./components/Admin/Orders/Orders";
import AddProduct from "./components/Admin/Product/AddProduct";
import OrderSuccess from "./components/frontend/PlaceOrder/OrderSuccess";
import Profile from "./components/Auth/Profile/Profile";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";

const App = () => {
  const { token, isAdmin } = useStore();

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reset"
          element={!token ? <ResetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={token ? <Layout /> : <Navigate to={"/login"} />}
        >
          <Route path="/" element={<Product />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/place" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route
            path="/orders"
            element={isAdmin ? <Orders /> : <Navigate to={"/"} />}
          />
          <Route
            path="/add"
            element={isAdmin ? <AddProduct /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
