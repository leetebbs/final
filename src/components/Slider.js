import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import card from "../assets/testImages/card.png";
import { getRaffleCount } from "../utils/getRaffles";
import axios from "axios";
import { Link } from "react-router-dom";
import loading from "../assets/loading.gif";

const Carousel = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buyItem, setBuyItem] = useState("Tebbo");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // centerMode: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:3001/counter");
        setData(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);

  // console.log("This is the data   ", data);

  return (
    <div className="hidden md:block text-[30px] font-semibold w-[95%] justify-center">
      <h1 className="p-10 mt-14">Active Raffles</h1>
      {isLoaded ? (
        <Slider className="mb-10 font-normal" {...settings}>
          {data.map((item, i) => (
            <div key={i} className="">
              <div className="p-5">
                <p className="text-[18px]">
                  {item.metadata.title ? item.metadata.title : <p>Un-Titled</p>}
                </p>
                <div className="flex gap-5 p-5 border-gray-500 border-2 rounded-lg">
                  <div className="w-[150px] h-[150px] ">
                    <img
                      className=" rounded-lg w-{100%] h-[100%]"
                      src={item.metadata.media[0].gateway}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="m-auto">
                      <p className="text-[15px]">
                        Tickets available {parseInt(item.transaction[1].hex)} /{" "}
                        {parseInt(item.transaction[5].hex)}{" "}
                      </p>
                      <p className="text-[14px]">
                        Ticket Price{" "}
                        {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
                      </p>
                    </div>

                    <button className="bg-[#6e78b4] rounded-lg text-white p-2 text-[16px] mt-auto">
                      <Link to="/buy" state={{ item }}>
                        Buy Tickets
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <img className="w-[200px] h-auto mx-auto mb-10" src={loading} />
      )}
      {/* {buyItem && (
        <Link to="/buy" state={{ data: buyItem }}>
          Go to Buy Page
        </Link>
      )} */}
    </div>
  );
};

export default Carousel;
