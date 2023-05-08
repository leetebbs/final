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
    <div className='w-[250px] h-[350px] my-10  lg:my-0 lg:w-[220px] lg:h-[350px] bg-[#9152e9] rounded-lg text-white flex flex-col mx-auto border-[#6e329c] border-4 overflow-hidden'>
        <img className='rounded-t-lg h-[200px]' src={image} alt="" />
        <p className='text-[11px] py-[6px]'>{props.title}</p>
        <p className='text-[8px] py-[6px]'>{props.description}</p>
        <p className='text-[8px] py-[6px]'>{props.contract}</p>
        <button className='  rounded-lg mt-auto mb-1 mx-1'><Link to="/rafflit" state={{data}}>RafflIt</Link></button>
    </div>
  )
}

export default Card