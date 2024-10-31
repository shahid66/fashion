import React from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { useGetOrderQuery } from "../feature/order/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(id);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[680px]">
        <Title text1={"DELIVER"} text2={"INFO"} />
        {isLoading ? (
          <h6>Loading...</h6>
        ) : (
          <div className="w-full">
            <p className="pt-2">
              <strong>Address :</strong> {order.shippingAddress.address}
            </p>
            <p className="pt-2">
              <strong>Email :</strong> {order.shippingAddress.emailAddress}
            </p>
            <p className="pt-2">
              <strong>Zip Code :</strong> {order.shippingAddress.postalCode}
            </p>
            <p className="pt-2">
              <strong>Country :</strong> {order.shippingAddress.country}
            </p>
            <p className="pt-2">
              <strong>Phone :</strong> {order.shippingAddress.phone}
            </p>
            <br />
            <hr />
            <br />
            <p className="pt-2">
              <strong>Items Price :</strong> ${order.itemsPrice}
            </p>
            <p className="pt-2">
              <strong>Shipping Price :</strong> ${order.shippingPrice}
            </p>
            <p className="pt-2">
              <strong>Tax Price :</strong> ${order.taxPrice}
            </p>
            <p className="pt-2">
              <strong>Total Price :</strong> ${order.totalPrice}
            </p>
            <br />
            <p className="pt-2">
              <strong>Order Date :</strong> {order.createdAt.substring(0, 10)}
            </p>
            <br />
            <hr />
            <br />
            <p className="pt-2">
              <strong>Payment Method :</strong>{" "}
              {order.paymentMethod === "cod"
                ? "Cash On Delivery"
                : order.paymentMethod}
            </p>
            <p className="pt-2">
              <strong>Paid Status :</strong>{" "}
              <span
                className={`pl-4 pr-4 pt-1 pb-1 ${
                  order.isPaid ? "bg-green-300" : "bg-red-300"
                }  rounded-lg text-black`}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </span>
            </p>
            <p className="pt-2">
              <strong>Delivery Status :</strong>{" "}
              <span
                className={`pl-4 pr-4 pt-1 pb-1 ${
                  order.isDelivered ? "bg-green-300" : "bg-red-300"
                }  rounded-lg text-black`}
              >
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full sm:max-w-[680px]">
        <Title text1={"ITEMS"} text2={"INFO"} />

        {isLoading ? (
          <h6>Loading...</h6>
        ) : (
          <div className="min-h-[80vh] overflow-y-auto">
            {order.orderItems.map((x) => (
              <div className="flex flex-col sm:flex-row justify-between  pt-5 sm:pt-14  border-t">
                <div className="flex items-start gap-6">
                  <img src={`${x.image}`} className="w-16 sm:w-20" alt="" />
                  <div>
                    <p className="text-sm sm:text-lg">{x.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        ${x.price} * {x.qty} = ${x.price * x.qty}
                      </p>

                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {x.size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
