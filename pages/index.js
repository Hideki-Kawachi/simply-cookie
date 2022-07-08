import Menu from '../components/menu'
import logo from '../animations/logo.json';
import Lottie from 'lottie-web';
import { useEffect, useState } from 'react';

export default function Home(){

  const [renders, setRenders] = (useState(0));


  useEffect(()=>{
    Lottie.loadAnimation({
        container: document.getElementById('logo'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: logo
    });
},[]);

  return (
    <>
      <div id='header' className='h-[13vh] w-[100vw] flex flex-col justify-center'>
        <div id='logo' className="w-[100px] h-[100px] overflow-hidden relative top-[50%]"></div>
      </div>
      <Menu></Menu>
      
    </>
  )
}


