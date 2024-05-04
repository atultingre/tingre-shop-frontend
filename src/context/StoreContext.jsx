import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  addProductToCart,
  getCartItems,
  getProductList,
  removeFromCart,
} from "../config/apiRequests";
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();
  const deliveryCost = 1;
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
    async function loadData() {
      if (localStorage.getItem("token")) {
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProductList();
      const { data } = response;
      if (response?.success) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadCartData = async (token) => {
    const response = await getCartItems(token);
    setCartItems(response?.cartData);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await addProductToCart(itemId, token);
    }
  };

  const removeFormCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await removeFromCart(itemId, token);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products?.find((product) => product?._id === item);
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const generateInitials = (userName) => {
    const initials = userName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };

  // Get initials
  const userImage = generateInitials("Atul Tingre");

  const contextValue = {
    token,
    isAdmin,
    products,
    setProducts,
    fetchProducts,
    cartItems,
    setCartItems,
    addToCart,
    removeFormCart,
    getTotalCartAmount,
    deliveryCost,
    navigate,
    userName,
    userEmail,
    handleLogout,
    editingProduct,
    setEditingProduct,
    userImage,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => {
  return useContext(StoreContext);
};
