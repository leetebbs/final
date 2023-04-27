import React from "react";
import Image from "../assets/monkey.png";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className=" w-[90%] h-[500px] mt-[30px] mx-auto">
      <div className="justify-center lg:flex">
        <motion.div
          variants={fadeIn("right", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
        >
          <h3 className="text-5xl font-semibold text-start pt-20 pb-10  mt-[100px]">
            Raffle Your NFT's
          </h3>
          <h3 className="text-2xl text-start text-gray-500">
            Experience the thrill of the draw and <br /> sell your art at the
            same time with our NFT Raffles!
          </h3>
          <p className="text-1xl text-start mt-[20px] text-gray-500">
            Raffle digital art or collectables straight from your wallet.
          </p>
          <button className="mt-[30px] bg-[#6e78b4] px-[10px] text-white py-[5px] rounded-lg">
            <Link to="/create">Create a Raffle</Link>
          </button>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className=" w-[50%] flex justify-center mt-[40px] pl-[90px]"
        >
          <img className="rounded-lg" src={Image} alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
