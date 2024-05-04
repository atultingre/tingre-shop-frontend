import Lottie from "lottie-react";
import success from "./success.json";
import { useStore } from "../../../context/StoreContext";

const OrderSuccess = () => {
  const { navigate } = useStore();
  return (
    <div className="flex justify-center items-center flex-col">
      <Lottie
        className="max-w-[400px]"
        loop={true}
        autoplay={true}
        animationData={success}
      />
      <h2 className="text-3xl font-bold mt-4 text-center">
        Order Placed Successfully
      </h2>
      <button
        onClick={() => navigate("/myorders")}
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Go to Orders
      </button>
    </div>
  );
};

export default OrderSuccess;
