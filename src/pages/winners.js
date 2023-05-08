import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
const Winners = () => {

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://final-express.vercel.app/winners");
        setData(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

    getData();
  }, []);
console.log("This is winners data   ", data);
  return (
    <div className="">
      <p className='text-5xl font-semibold m-10'>Our Winners</p>
      {isLoaded ? (
            <div className='grid grid-cols-2 ml-[20px]'>
            {data.map((item, i) => (
                  <>
                  <div className="lg:flex mb-10 border-[#6e329c] border-4 rounded-lg lg:w-[600px] overflow-clip " key={i}>
                  <div className="">
                      <img
                        className="w-auto h-[200px] rounded-lg "
                        src={item.metadata.media[0].gateway}
                        alt=""
                      />
                    </div>
                    <div className='text-[12px] m-auto'>
                      <p className="font-semibold text-[15px] mb-2">{item.metadata.contract.name}</p>
                      <p className='mb-1'>TokenId: {item.metadata.tokenId}</p>
                      <p className='mb-1'>RaffleId: {parseInt(item.transaction[0].hex)}</p>
                      <p className='mb-1'>Number of Tickets Sold: {parseInt(item.transaction[5].hex)}</p>
                      <p className='mb-1'>
                        Price of Tickets:{" "}
                        {parseInt(item.transaction[2].hex) / 10 ** 18} Matic
                      </p>
                      <p className='bg-[#b29146] m-2 p-2 rounded-lg mb-0 font-semibold'>Winner: <span className='font-normal'>{item.winner}</span></p>
                    </div>
                  </div>
      
                  </>
                ))}
          </div>
        ):(<Loading/>)}

    </div>
  )
}

export default Winners