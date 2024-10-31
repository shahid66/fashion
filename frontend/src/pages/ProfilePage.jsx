import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { setCredentials } from "../feature/auth/authSlice";
import { useUpdateProfileMutation } from "../feature/auth/userSlice";
import { useGetOrdersQuery } from "../feature/order/orderSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  useEffect(() => {
    if (userInfo.email) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile Update successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message || error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <form className="w-full" onSubmit={submitHandler}>
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"UPDATE"} text2={"PROFILE"} />
          </div>

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
          />

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div className="w-full text-end mt-8">
            <button className="bg-black text-white px-16 py-3 text-sm">
              UPDATE
            </button>
          </div>
        </div>
      </form>

      {/* Right side */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[680px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"MY"} text2={"ORDERS"} />
          {isLoading ? (
            <h6>Loading...</h6>
          ) : (
            <div className="w-full">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 text-center">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      ID
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      DATE
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      TOTAL
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      PAID
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      DELIVERED
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide ">
                      DETAILS
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="p-3 text-sm text-gray-700 ">
                        <Link
                          className="text-blue-300"
                          to={`/order/${order._id}`}
                        >
                          {order._id}
                        </Link>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        $ {order.totalPrice}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        <span
                          className={`pl-4 pr-4 pt-1 pb-1 ${
                            order.isPaid ? "bg-green-300" : "bg-red-300"
                          }  rounded-lg text-black`}
                        >
                          {order.isPaid ? "YES" : "NO"}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        <span
                          className={`pl-4 pr-4 pt-1 pb-1 ${
                            order.isDelivered ? "bg-green-300" : "bg-red-300"
                          }  rounded-lg text-black`}
                        >
                          {order.isDelivered ? "YES" : "NO"}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700">action</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
