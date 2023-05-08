import React from "react";
import Card from "../components/Card";
import test from "../assets/test.png";
import dread from "../assets/dread.png";
import monkey from "../assets/monkey.png";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useAccount } from "wagmi";

const Create = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageKey, setPageKey] = useState("");
  const [prevPageKey, setPrevPageKey] = useState("");
  const [res, setRes] = useState("");
  useEffect(() => {
    async function getData() {
      const add = props.address;
      const response = await axios.get("https://final-express.vercel.app/data", {
        params: {
          address: add,
          page: pageKey,
        },
      });
      if(response.data === "You dont have any NFTS"){
        console.log("You dont have any NFTS")
        setLoading(true)
        setRes("You dont have any NFTS!")
      }else{
        setData(response.data.ownedNfts);
        setPrevPageKey(pageKey)
        setPageKey(response.data.pageKey);
        console.log(prevPageKey)
        console.log(response.data.pageKey);
        if(useAccount.address){
          setLoading(false)
        }else{
          setLoading(true)
        }
        // setLoading(true);
      }
      // setData(response.data.ownedNfts);
      // setPrevPageKey(pageKey)
      // setPageKey(response.data.pageKey);
      // console.log(prevPageKey)
      // console.log(response.data.pageKey);
      // setLoading(true);
    }

    getData();
  }, []);

  // console.log(data);

  return (
    <div>
      <div className="">
        <h1 className="font-semibold text-5xl  my-10"> Create A New Raffle</h1>
        <p className="m-[30px]">Choose an NFT to create a new raffle!</p>
        <p className="text-[50px]">{res}</p>
        <div className="flex gap-3 justify-center mb-20">
          {loading ? (
            <div className="lg:grid lg:grid-cols-5 lg:grid-flow-row lg:gap-7 w-[100%]">
              {data.map((item, i) => (
                <Card
                  key={i}
                  pic={
                    item.media[0]?.gateway ||
                    "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
                  }
                  title={item.title}
                  description={item.description}
                  contract={item.contract.address}
                  data={item}
                />
              ))}
            </div>
          ) : (
            <div className="">
            <Loading />
            </div>

          )}
        </div>
        <div className="">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Create;
