import { useEffect, useState } from "react";
import { useStore } from "../../../context/StoreContext";
import { placeOrders } from "../../../config/apiRequests";

const PlaceOrder = () => {
  const [isCODSelected, setIsCODSelected] = useState(false);
  const {
    products,
    deliveryCost,
    cartItems,
    getTotalCartAmount,
    token,
    navigate,
    setCartItems,
  } = useStore();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    products.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        country: data.country,
      },
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCost,
    };
    if (isCODSelected) {
      const response = await placeOrders(orderData, token);

      if (response.success === true) {
        setCartItems({});
        navigate("/success");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="mt-10 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <form onSubmit={placeOrder}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive products.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    onChange={onChangeHandler}
                    id="firstName"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    onChange={onChangeHandler}
                    autoComplete="family-name"
                    className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onChange={onChangeHandler}
                    className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    required
                    onChange={onChangeHandler}
                    type="tel"
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    onChange={onChangeHandler}
                    autoComplete="country-name"
                    className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full sm:col-span-4">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street"
                    id="street"
                    required
                    onChange={onChangeHandler}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    onChange={onChangeHandler}
                    id="city"
                    required
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    onChange={onChangeHandler}
                    id="state"
                    required
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    required
                    onChange={onChangeHandler}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Choose payment method
            </h2>
            <div className="flex items-center gap-2 mt-3 font-semibold">
              <input
                type="checkbox"
                onChange={() => setIsCODSelected(!isCODSelected)}
                checked={isCODSelected}
                id="cod"
                name="cod"
              />
              <span id="cod" name="cod">
                Cash on Delivery (COD)
              </span>
            </div>
          </div>
          <div>
            {/* <h2 className="text-2xl font-semibold leading-7 mx-2 text-gray-900">
              Billing Details
            </h2> */}
            {getTotalCartAmount() > 0 && (
              <div className="px-2 py-2 sm:px-2">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p> &#8377; {getTotalCartAmount()}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Shipping Charges</p>
                  <p>
                    {" "}
                    &#8377; {getTotalCartAmount() === 0 ? 0 : deliveryCost}
                  </p>
                </div>
                <div className="border-t border-gray-200 mt-3  text-base font-medium text-gray-900">
                  <div className="flex justify-between mt-3">
                    <p>Total</p>
                    <p>
                      &#8377;{" "}
                      {getTotalCartAmount() === 0
                        ? 0
                        : getTotalCartAmount() + deliveryCost}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-10 flex gap-5">
            <button
              type="submit"
              className={`block w-full rounded-md  ${
                !isCODSelected
                  ? "bg-gray-300 text-black"
                  : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
              } placeholder:px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${
                !isCODSelected && "cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
            <button
              onClick={() => navigate("/")}
              className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
