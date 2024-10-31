import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md;px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      {/* <SearchBar /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
