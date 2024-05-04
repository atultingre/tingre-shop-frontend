import { useStore } from "../context/StoreContext";
import api from "./api";

export const getOrderList = async () => {
  return await api("GET", "/order/list");
};

export const updateOrderStatus = async (orderId, value) => {
  return await api("POST", "/order/status", { orderId, status: value });
};

export const addProduct = async (formData, url) => {
  return await api("POST", "/product/add", { ...formData, image: url });
};

export const updateProduct = async (productId, formData, url) => {
  return await api("PUT", `/product/update/${productId}`, {
    ...formData,
    image: url,
  });
};

export const loginUser = async (email, password) => {
  return await api("POST", "/user/login", { email, password });
};

export const registerUser = async (formData) => {
  return await api("POST", "/user/register", formData);
};

export const getUserOrders = async (token) => {
  return await api("POST", "/order/userorders", {}, { token });
};

export const placeOrders = async (orderData, token) => {
  return await api("POST", "/order/place", orderData, { token });
};

export const removeProduct = async (productId) => {
  return await api("POST", "/product/remove", { id: productId });
};

export const getProductList = async () => {
  return await api("GET", "/product/list");
};

export const getCartItems = async (token) => {
  return await api("POST", "/cart/get", {}, { token });
};

export const addProductToCart = async (itemId, token) => {
  return await api("POST", "/cart/add", { itemId }, { token });
};

export const removeFromCart = async (itemId, token) => {
  return await api("POST", "/cart/remove", { itemId }, { token });
};
