import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { authLogOut } from "../feature/auth/authSlice";
import { useLogOutMutation } from "../feature/auth/userSlice";
import {
  clearCartItems,
  clearShippingAddress,
} from "../feature/cart/cartSlice";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOut, { isLoading, error }] = useLogOutMutation();
  const handleLogOut = async () => {
    try {
      const res = await logOut();
      dispatch(authLogOut());
      dispatch(clearCartItems());
      dispatch(clearShippingAddress());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to={"/"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          className="flex flex-col items-center gap-1"
          to={"/collection"}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/about"}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/contact"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* {location.pathname.includes("collection") ? (
          <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        ) : (
          <Link to="/collection">
            <img
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          </Link>
        )} */}
        <div className="group relative">
          <Link to={"/login"}>
            {userInfo?.name ? (
              userInfo.name
            ) : (
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
            )}
          </Link>

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400">
              <Link to="/profile" className="cursor-pointer hover:text-black">
                My Profile
              </Link>

              <p
                onClick={handleLogOut}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          {cartItems.length > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </p>
          )}
        </Link>

        {userInfo?.isAdmin && (
          <div className="group relative">
            <Link to={"/admin/productList"}>Admin</Link>

            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400">
                <Link
                  to={"/admin/productList"}
                  className="cursor-pointer hover:text-black"
                >
                  Products
                </Link>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Users</p>
              </div>
            </div>
          </div>
        )}

        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* sidebar menu for small screen */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all 
           w-0`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink className="py-2 pl-6 border" to={"/"}>
            HOME
          </NavLink>
          <NavLink className="py-2 pl-6 border" to={"/collection"}>
            COLLECTION
          </NavLink>
          <NavLink className="py-2 pl-6 border" to={"/about"}>
            ABOUT
          </NavLink>
          <NavLink className="py-2 pl-6 border" to={"/contact"}>
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
