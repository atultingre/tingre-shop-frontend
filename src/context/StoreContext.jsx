import { createContext, useContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const contextValue = { token, setToken };

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
