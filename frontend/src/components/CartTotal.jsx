import React from "react";
import { useSelector } from "react-redux";
import Title from "./Title";

const CartTotal = () => {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{itemsPrice}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{shippingPrice}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Tax Price</p>
          <p>{taxPrice}</p>
        </div>
        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>{totalPrice}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
