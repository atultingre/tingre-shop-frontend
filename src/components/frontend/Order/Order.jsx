import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useStore } from "../../../context/StoreContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Order = () => {
  const [agreed, setAgreed] = useState(false);
  const {
    products,
    deliveryCost,
    cartItems,
    removeFormCart,
    addToCart,
    getTotalCartAmount,
    navigate,
  } = useStore();
  return (
    <div className="flex flex-col justify-around sm:flex">
      
      <div>
        {getTotalCartAmount() > 0 && (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p> &#8377; {getTotalCartAmount()}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Shipping Charges</p>
              <p> &#8377; {getTotalCartAmount() === 0 ? 0 : deliveryCost}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>
                &#8377;{" "}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCost}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
