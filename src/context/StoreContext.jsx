import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  // () => {
  //   const storedCartItems = localStorage.getItem("cartItems");
  //   return storedCartItems ? JSON.parse(storedCartItems) : {};
  // }

  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  const url = "http://localhost:8000";
  const deliveryCost = 1;

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    // Update localStorage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api("GET", "/product/list");
      const { data } = response;
      if (response?.success) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFormCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // if (cartItems[itemId]) {
    //   // Decrease the quantity of the item
    //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    //   // Remove the item from the cart if the quantity becomes 0
    //   if (cartItems[itemId] === 1) {
    //     const updatedCartItems = { ...cartItems };
    //     delete updatedCartItems[itemId];
    //     setCartItems(updatedCartItems);
    //   }

    //   // Update localStorage
    //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // }

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
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

  const contextValue = {
    token,
    setToken,
    products,
    setProducts,
    fetchProducts,
    cartItems,
    setCartItems,
    addToCart,
    removeFormCart,
    getTotalCartAmount,
    deliveryCost,
    url,
    navigate,
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
