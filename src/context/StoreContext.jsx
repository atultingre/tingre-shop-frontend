import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
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

  const contextValue = {
    token,
    setToken,
    products,
    setProducts,
    fetchProducts,
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
