import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import {
  decrement,
  increment,
  removeFromCart,
} from "../feature/cart/cartSlice";
import CartTotal from "./../components/CartTotal";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const incrementHandle = async (product) => {
    dispatch(increment({ productId: product.productId, size: product.size }));
  };
  const decrementHandle = async (product) => {
    dispatch(decrement({ productId: product.productId, size: product.size }));
  };

  const removeFromCartHandler = async (product) => {
    dispatch(
      removeFromCart({ productId: product.productId, size: product.size })
    );
  };
  const checkoutHandler = () => {
    navigate(`/login?redirect=/place-order`);
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      {cartItems.length > 0 ? (
        <div className="">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid=cols=[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={`https://fashion-b70x.onrender.com${item.image}`}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-sm sm:text-lg">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{item.price}</p>

                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex  item-center justify-center">
                <FaPlus
                  className="w-10"
                  onClick={() => incrementHandle(item)}
                />
                <input
                  className="w-10 text-center"
                  min={1}
                  value={item.qty} // Controlled input to update with Redux
                  readOnly
                />
                <FaMinus
                  className="w-10"
                  onClick={() => decrementHandle(item)}
                />
              </div>
              <img
                onClick={() => removeFromCartHandler(item)}
                src={assets.bin_icon}
                className="w-4 mr-4 cursor-pointer"
                alt=""
              />
            </div>
          ))}
        </div>
      ) : (
        <h6>No Cart Items. Please buy something....</h6>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          {cartItems.length > 0 && (
            <div className="w-full text-end">
              <button
                onClick={checkoutHandler}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                {" "}
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
