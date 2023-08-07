import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Abi } from "../ApproveAbi";
import { raffleAbi } from "../Abi";

const Rafflit = () => {
  const location = useLocation();
  const { data } = location.state;
  const raffleAddress = "0xAA1f4F9386b67eF9cD4CBA5c75a688931C522681";//original 
  // const raffleAddress = "0x172990f74120d3d7F69Cf79f4A3eE4bbcd1015A0"; //added search
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [rafflePeriod, setRafflePeriod] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [sign, setSign] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const raffleContract = new ethers.Contract(raffleAddress, raffleAbi, signer);

  async function approve() {
    const contract = new ethers.Contract(contractAddress, Abi, signer);
    const tx = await contract.approve(raffleAddress, tokenId, {
      gasLimit: 500000,
    });
  }

  async function createRaffle() {
    let tp = ethers.utils.parseUnits(ticketPrice, 18);
    const tx = await raffleContract.createRaffle(
      ticketNumber,
      tp,
      contractAddress,
      tokenId,
      1111,
      { gasLimit: 500000 }
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ticketNumber && ticketPrice) {
      approve();
      createRaffle();
    } else {
      return alert("Please fill all the fields");
    }

    // reset the form fields
    setTicketNumber("");
    setTicketPrice("");
    setRafflePeriod("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTokenId(data.tokenId);
    setContractAddress(data.contract.address);
    setSign(data.signer);
  }, []);

  return (
    <div>
      <div className="">
        <h1 className="text-[25px] font-semibold  mt-10 mb-10">
          {/* <h1 className="mb-[30px] text-[15px] bg-[#6e78b4] text-white w-[40%] rounded-lg mx-auto"> */}
          Create a Raffle for <br /> {data.description} <br />
          Token ID {data.tokenId}
        </h1>
        <p></p>
        <div className="lg:flex justify-center gap-[15%] lg:mt-20">
          {/* //left side */}
          <div className="">
            <div className=" w-[100%] rounded-lg  justify-center text-white text-[18px] pb-5 px-3">
              <div className=" py-3">
                <img
                  className="w-[200px] m-auto rounded-lg my-3"
                  src={
                    data.media[0]?.gateway ||
                    "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
                  }
                  alt=""
                />
                <p>{data.title}</p>
                <p>{data.description}</p>
                <p>TokenID {data.tokenId}</p>
              </div>

              {/* <p className="text-[15px] text-semibold">Attributes</p> */}
              <div className="grid grid-cols-2 gap-7 mb-3">
                {data.rawMetadata.attributes?.map((item, i) => (
                  <p
                    className="flex items-center justify-center text-white text-[14px]"
                    key={i}
                  >
                    <span>{item.trait_type}</span>: {item.value}
                  </p>
                ))}
              </div>
              <p>{data.contract.address}</p>
            </div>
          </div>
          {/* right side */}
          <div className="my-auto mt-10 mb-10">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label>Number of Tickets</label>
              <input
                className="bg-gradient-to-r from-[#6e329c] to-[#4C0959] w-[100%] rounded-lg  justify-center text-center text-white text-[18px] pb-5 px-3 mb-1"
                id="ticketNumber"
                placeholder="Number of Tickets"
                value={ticketNumber}
                onChange={(event) => setTicketNumber(event.target.value)}
              />
              <label>Price of Tickets in Matic</label>
              <input
                className="bg-gradient-to-r from-[#6e329c] to-[#4C0959] w-[100%] rounded-lg  justify-center text-center text-white text-[18px] pb-5 px-3 mb-1"
                id="ticketPrice"
                placeholder="Price of Tickets"
                value={ticketPrice}
                onChange={(event) => setTicketPrice(event.target.value)}
              />
              <button
                className="mx-auto bg-gradient-to-r from-[#6e329c] to-[#4C0959] w-[80px] text-white  rounded-lg mt-5"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rafflit;
