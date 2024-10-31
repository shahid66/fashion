import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import {
  clearCartItems,
  clearShippingAddress,
  saveShippingAddress,
} from "../feature/cart/cartSlice";
import { useOrderRegisterMutation } from "../feature/order/orderSlice";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [fName, setFName] = useState(shippingAddress?.fName || "");
  const [lName, setLName] = useState(shippingAddress?.lName || "");
  const [emailAddress, setEmailAddress] = useState(
    shippingAddress?.emailAddress || ""
  );
  const [street, setStreet] = useState(shippingAddress?.street || "");
  const [stateName, setStateName] = useState(shippingAddress?.stateName || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [phone, setPhone] = useState(shippingAddress?.phone || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placeOrderStatus, setPlaceOrderStatus] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fName,
        lName,
        emailAddress,
        street,
        stateName,
        city,
        postalCode,
        country,
        phone,
      })
    );
  };
  const [method, setMethod] = useState("cod");
  const [orderRegister, { isLoading, error }] = useOrderRegisterMutation();

  const paymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await orderRegister({
        orderItem: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: method,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      if (res) {
        toast.success("Order Place Successfully");
        dispatch(clearCartItems());
        dispatch(clearShippingAddress());
        navigate("/");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!cart?.shippingAddress?.emailAddress) {
      setPlaceOrderStatus(false);
    } else {
      setPlaceOrderStatus(true);
    }
  }, [cart.shippingAddress?.emailAddress]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-fulll sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City Name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            placeholder="State Name"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="Number"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Zip Code"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <div className="w-full text-end mt-8">
          <button
            onClick={submitHandler}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            SUBMIT
          </button>
        </div>
      </div>

      {/* Right side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <form onSubmit={paymentSubmit}>
          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                // onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer pointer-events-none opacity-50"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                // onClick={() => setMethod("razorpay")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer pointer-events-none opacity-50"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            {placeOrderStatus && (
              <div className="w-full text-end mt-8">
                <button className="bg-black text-white px-16 py-3 text-sm">
                  PLACE ORDER
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
