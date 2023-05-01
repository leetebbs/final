import React from 'react'
import test from '../assets/test.png'
import dread from '../assets/dread.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import noImage from '../assets/noImage.png'
const Card = (props) => {


  const [image, setImage] = useState('')

  useEffect(() => {
    if(props.pic){
      setImage(props.pic)
    }else{
      setImage(noImage)
    }
  },[])

  const data =props.data
  return (
    <div className='w-[250px] h-[350px] my-10  lg:my-0 lg:w-[200px] lg:h-[300px] bg-[#6e78b4] rounded-lg text-white flex flex-col mx-auto'>
        <img className='rounded-t-lg h-[200px]' src={image} alt="" />
        <p className='text-[9px] py-[6px]'>{props.title}</p>
        <p className='text-[8px] py-[6px]'>{props.description}</p>
        <p className='text-[8px] py-[6px]'>{props.contract}</p>
        <button className='bg-[#454b70]  rounded-lg mt-auto '><Link to="/rafflit" state={{data}}>RafflIt</Link></button>
    </div>
  )
}

export default Card