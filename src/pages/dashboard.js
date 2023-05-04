import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
const Dashboard = () => {
  const account = useAccount()
  const [data, setData] = useState([]);
  const [completeData, setCompleteData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const active = [];
  const complete = [];
  let earnings = 0;


  //get data for active raffles
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://final-express.vercel.app/counter");
        setData(response.data);
        setIsLoaded(true);
        // console.log(response.data)
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://final-express.vercel.app/winners");
        setCompleteData(response.data);
        setIsLoaded(true);
        // console.log("completed`", response.data)
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);
  

  if(isLoaded){
   
    for(let i = 0 ; i < data.length ; i++){
      // console.log("match",account.address)
      if(data[i].transaction[7] === account.address){
        active.push(data[i])
        // console.log(active)
      }
    }

    for(let i = 0 ; i < completeData.length ; i++){
      if(completeData[i].transaction[7] === account.address){
        complete.push(completeData[i])
        let res = parseInt(completeData[i].transaction[5].hex) * parseInt(completeData[i].transaction[2].hex)
        earnings = earnings + res
        console.log("Earnings",earnings / 10 ** 18)
      }
    }
    
  }
 
  const numberActive = active.length;
  const numberComplete = complete.length;

  return (
    <div>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p className='font-semibold text-xl'>Total earned from raffles {earnings / 10 ** 18} Matic - FEES **</p>
      <p className='font-semibold text-[30px]'> you have {numberActive} active raffles</p>
      {isLoaded ? (
        <div className="">
          {active.map((item, i) => (
            <>
            <div className="flex justify-center gap-5 mb-5 border-gray-600 border-4 rounded-lg lg:w-90% overflow-clip ">
            <div className="">
                <img
                  className="w-auto h-[70px] "
                  src={item.metadata.media[0].gateway}
                  alt=""
                />
              </div>
              <div className='flex gap-[130px] justify-center my-auto'>
                <p className="my-auto">{item.metadata.contract.name}</p>
                <p >TokenId: <br/> {item.metadata.tokenId}</p>
                <p>RaffleId: <br/>{parseInt(item.transaction[0].hex)}</p>
                <p>Tickets Available: <br/> {parseInt(item.transaction[1].hex)} / {parseInt(item.transaction[5].hex)}</p>
                <p>
                  Ticket Price : <br/>
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
      <p className='font-semibold text-[30px]'>You have {numberComplete} completed raffles</p>
      {isLoaded ? (
        <div className="">
          {complete.map((item, i) => (
            <>
            <div className="flex justify-center gap-5 mb-10 border-gray-600 border-4 rounded-lg lg:w-90% ">
            <div className="">
                <img
                  className="w-auto h-[70px] "
                  src={item.metadata.media[0].gateway}
                  alt=""
                />
              </div>
              
              <div  className='flex gap-[160px] justify-center my-auto'>
                <p className="">{item.metadata.contract.name}</p>
                <p >TokenId: <br/> {item.metadata.tokenId}</p>
                <p>RaffleId: <br/> {parseInt(item.transaction[0].hex)}</p>
                <p> Sold: <br/>{parseInt(item.transaction[5].hex)}</p>
                <p>
                  Price : <br/>
                  {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
                </p>
                <p>Earnings: <br/> {parseInt(item.transaction[5].hex) * parseInt(item.transaction[2].hex) / 10 ** 18} Matic</p>
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
  )
}

export default Dashboard