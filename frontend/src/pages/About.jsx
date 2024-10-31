import React from "react";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";
import { assets } from "./../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum
            exercitationem, necessitatibus, unde, voluptates quibusdam eius
            eveniet ratione debitis odit quasi. Dolore, exercitationem! Iusto
            consequuntur nostrum iure excepturi, maxime iste!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet iure
            ad vero deserunt, eligendi aliquam?
          </p>
          <b className="text-gray=800">Our Mision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            neque corrupti aut enim animi doloremque, quaerat natus soluta at
            ab.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ad?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ad?
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
