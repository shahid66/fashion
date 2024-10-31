import React from "react";
import Hero from "../components/Hero";
import NewsletterBox from "../components/NewsletterBox";
import OurPolicy from "../components/OurPolicy";
import BestSeller from "./../components/BestSeller";
import LatestCollection from "./../components/LatestCollection";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
