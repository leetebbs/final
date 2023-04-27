import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import {Abi} from "../ApproveAbi";
import { raffleAbi } from "../Abi";
const Buy = () => {
  const raffleAddress = "0xAA1f4F9386b67eF9cD4CBA5c75a688931C522681";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const raffleContract = new ethers.Contract(raffleAddress, raffleAbi, signer);
  const location = useLocation();
  const item = location.state.item;
  console.log("from the buy", item);
  const [ticketNumbers, setTicketNumbers] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    setTicketNumbers(item.transaction[1].hex);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("clicked");
    const cost = (parseInt(item.transaction[2].hex) / 10 ** 18) * count;
    const newCost = cost.toString();
    // console.log(cost);
    const raffleId = parseInt(item.transaction[0].hex);
    try {
      const tx = await raffleContract.buyTicket(raffleId, count, {
        value: ethers.utils.parseUnits(newCost, "ether"),
      });
      const receipt = await tx.wait();
      setTicketNumbers(parseInt(item.transaction[1].hex) - count);
      //   console.log(receipt)
    } catch (error) {
      console.log(error.data.message);
      alert(error.data.message.slice(5, 39));
    }
  };

  function increment() {
    if (count >= parseInt(item.transaction[1].hex)) {
      return;
    } else {
      setCount(count + 1);
    }
  }

  function decrement() {
    if (count == 1) {
      return;
    } else {
      setCount(count - 1);
    }
  }

  return (
    <div className="flex gap-10 mt-10 justify-center">
      <div className="bg-[#6e78b4] text-white p-10 rounded-lg flex flex-col">
        <p className="text-[20px] font-semibold">
          {item.metadata.description} <br /> {item.metadata.contract.symbol}
        </p>
        <h1>{item.metadata.title}</h1>

        <img
          className="w-auto h-[300px] mx-auto rounded-lg my-10"
          src={item.metadata.media[0].gateway}
          alt=""
        />
        <div className="flex justify-center gap-10 mb-10 text-[30px]">
          <button
            className="bg-[#484f75] hover:bg-[#8390db] w-14 rounded-lg"
            onClick={decrement}
          >
            -
          </button>
          <p>{count}</p>
          <button
            className="bg-[#484f75] hover:bg-[#8390db] w-14 rounded-lg"
            onClick={increment}
          >
            +
          </button>
        </div>
        <button
          className="bg-[#484f75] hover:bg-[#8390db] w-[140px] h-8 rounded-lg mx-auto mb-5"
          onClick={handleSubmit}
        >
          Buy Tickets
        </button>
        <p className="text-[15px] mb-3">
          Ticket Price {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
        </p>
        <p className="text-[15px]">
          Tickets available {parseInt(ticketNumbers)} /{" "}
          {parseInt(item.transaction[5].hex)}{" "}
        </p>
        <p className="text-[10px] mt-3">
          Contract Address: {item.metadata.contract.address}
        </p>
      </div>
      {/* <div className="bg-red-300 w-[400px] ">
        <button onClick={decrement}>-</button>
        <p>{count}</p>
        <button onClick={increment}>+</button>
      </div> */}
    </div>
  );
};

export default Buy;
