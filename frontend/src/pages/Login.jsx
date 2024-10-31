import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../feature/auth/authSlice";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../feature/auth/userSlice";

const Login = () => {
  const [curentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading, error: registerError }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (curentState === "Sign Up") {
      try {
        const res = await register({ name, email, password }).unwrap();
        if (res) {
          dispatch(setCredentials(res));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await login({ email, password }).unwrap();
        
        if (res) {
          dispatch(setCredentials(res));
          navigate("/");
        }
      } catch (error) {}
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{curentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {curentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          name=""
          id=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        name=""
        id=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        name=""
        id=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {curentState === "Login" && (
          <p className="cursor-pointer">Forgot your password?</p>
        )}
        {curentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className=" bg-black boreder text-white font-light  py-2 px-8 mt-2">
        {curentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
