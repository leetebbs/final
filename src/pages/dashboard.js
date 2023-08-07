import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import Loading from "../components/Loading";
const Dashboard = () => {
  const account = useAccount();
  //data set for active raffles
  const [data, setData] = useState([]);
  //CompleteData for completed raffles
  const [completeData, setCompleteData] = useState([]);
  //Loading state
  const [isLoaded, setIsLoaded] = useState(false);
  //usersActive raffles
  const [usersActive, setUsersActive] = useState([]);

  //Array of connected users active raffles
  const active = [];
  //Array of connected users completed raffles
  const complete = [];
  //Connected users earnings
  let earnings = 0;

  //get data for active raffles
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://final-express.vercel.app/counter"
        );
        setData(response.data);
        setIsLoaded(true);
        // console.log(response.data)
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);

  //Fetch data for raffle winners
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://final-express.vercel.app/winners"
        );
        setCompleteData(response.data);
        setIsLoaded(true);
        console.log("completed`", response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);

    // get Data for user active raffles
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://final-express.vercel.app/usersActiveRaffles"
        );
        setUsersActive(response.data);
        setIsLoaded(true);
        console.log("active users raffle data ", response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);


  // get data for users completed raffles

  if (isLoaded) {
    //set active raffles for connected user
    for (let i = 0; i < data.length; i++) {
      // console.log("match",account.address)
      if (data[i].transaction[7] === account.address) {
        active.push(data[i]);
      }
    }
    //set completed raffles for connected user
    for (let i = 0; i < completeData.length; i++) {
      if (completeData[i].transaction[7] === account.address) {
        complete.push(completeData[i]);
        let res =
          parseInt(completeData[i].transaction[5].hex) *
          parseInt(completeData[i].transaction[2].hex);
        earnings = earnings + res;
        // console.log("Earnings",earnings / 10 ** 18)
      }
    }
  }
  //Connected users active raffles count
  const numberActive = active.length;
  //Connected users completed raffles count
  const numberComplete = complete.length;

  const wins = () => {
    console.log(complete);
  };
  wins();
  return (
    <div className="mb-20">
      <h1 className="text-5xl font-bold mt-10 mb-10 text-[#E16AF3]">Dashboard</h1>
      <p className="font-semibold text-xl mb-3">
        Total earned from raffles {earnings / 10 ** 18} Matic - FEES **
      </p>
      <p className="font-semibold text-[30px] mb-6">
        {" "}
        you have <span className="text-[#E16AF3]">{numberActive}</span> active raffles
      </p>
      {isLoaded ? (
        <div className="mb-10">
          {active.map((item, i) => (
            <>
              <div className="flex justify-center gap-5 mb-5 border-[#6e329c] border-4 rounded-lg lg:w-90% overflow-clip ">
                <div className="">
                  <img
                    className="w-auto lg:h-[70px] h-[100px] "
                    src={item.metadata.media[0].gateway}
                    alt=""
                  />
                </div>
                <div className="flex lg:gap-[130px] justify-center my-auto">
                  <p className="my-auto hidden lg:block">{item.metadata.contract.name}</p>
                  <p className="hidden lg:block">
                    TokenId: <br /> {item.metadata.tokenId}
                  </p>
                  <p>
                    RaffleId: <br />
                    {parseInt(item.transaction[0].hex)}
                  </p>
                  <p>
                    Tickets Available: <br />{" "}
                    {parseInt(item.transaction[1].hex)} /{" "}
                    {parseInt(item.transaction[5].hex)}
                  </p>
                  <p>
                    Ticket Price: <br />
                    {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
                  </p>
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
      {/* //tickets sold and available */}
      <p className="font-semibold text-[30px] mb-5">
        You have <span className="text-[#E16AF3]">{numberComplete}</span> completed raffles
      </p>
      {isLoaded ? (
        <div className="">
          {complete.map((item, i) => (
            <>
              <div className="flex justify-center gap-5 mb-5 border-[#6e329c] border-4 rounded-lg lg:w-90% ">
                <div className="">
                  <img
                    className="w-auto h-[70px] "
                    src={item.metadata.media[0].gateway}
                    alt=""
                  />
                </div>

                <div className="flex lg:gap-[140px] gap-[20px] justify-center my-auto">
                  <p className="hidden lg:block">{item.metadata.contract.name}</p>
                  <p className="">
                    TokenId: <br /> {item.metadata.tokenId}
                  </p>
                  <p className="hidden lg:block ">
                    RaffleId: <br /> {parseInt(item.transaction[0].hex)}
                  </p>
                  <p className="">
                    {" "}
                    Sold: <br />
                    {parseInt(item.transaction[5].hex)}
                  </p>
                  <p className="hidden lg:block">
                    Price : <br />
                    {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
                  </p>
                  <p className="">
                    Earnings: <br />{" "}
                    {(parseInt(item.transaction[5].hex) *
                      parseInt(item.transaction[2].hex)) /
                      10 ** 18}{" "}
                    Matic
                  </p>
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

export default Dashboard;
