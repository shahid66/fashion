import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full sm:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quidem,
            harum fugit quia culpa provident dignissimos nemo labore sit impedit
            officiis assumenda reprehenderit consectetur non expedita tenetur
            exercitationem pariatur quis?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+8801736631284</li>
            <li>kk.shahid66@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="" />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ forever.com -All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
