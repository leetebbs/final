import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
const Active = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://final-express.vercel.app/counter"
        );
        setData(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);
  console.log("This is active data   ", data);

  return (
    <div className="">
      <p className="text-semibold text-[60px] mb-10">Active <span className="text-[#E16AF3]" >Raffles</span></p>
      {isLoaded ? (
        <div className="lg:grid lg:grid-cols-2 lg:grid-flow-row lg: w-[100%]">
          {data.map((item, i) => (
            <>
              <div className="flex justify-center gap-5 mb-10 mx-auto border-[#6e329c] border-4 rounded-lg lg:w-[500px] overflow-clip ">
                <div className="">
                  <img
                    className="w-auto h-[220px] rounded-lg "
                    src={item.metadata.media[0].gateway}
                    alt=""
                  />
                </div>
                <div>
                  <p className="">{item.metadata.contract.name}</p>
                  <p>TokenId: {item.metadata.tokenId}</p>
                  <p>RaffleId: {parseInt(item.transaction[0].hex)}</p>
                  <p>
                    {" "}
                    Available: {parseInt(item.transaction[1].hex)} /{" "}
                    {parseInt(item.transaction[5].hex)}
                  </p>
                  <p>
                    Price : {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
                  </p>
                  <button className=" w-[100px] text-white  rounded-lg mt-2">
                    <Link to="/buy" state={{ item }}>
                      Buy Tickets
                    </Link>
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="">
          <p className="text-[30px] text-semibold mt-20">
            Loading Active Raffles
          </p>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Active;
