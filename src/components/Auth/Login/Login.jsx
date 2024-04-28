import { useState } from "react";
import api from "../../../config/api";
import { useStore } from "../../../context/StoreContext";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api("POST", "/user/login", { email, password });
      localStorage.setItem("token", response.token);
      setToken(response.token);
      console.log("response: ", response.token);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        <br />
        <span>
          Don't have an account? <NavLink to={"/signup"}>Signup</NavLink>
        </span>
      </form>
    </>
  );
};

export default Login;
