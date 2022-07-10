import React from 'react';
import Menu from '../components/menu';
import OrderItem from '../components/orderItem';


function Order() {
    const cookies = [{name: "SC CLASSIC", pic: "/images/sc_classic.PNG", price: 240, qty: 5},{name: "CHOCO WALNUT",pic:"/images/choco_walnut.PNG" , price: 300, qty: 5}]
    
    


    return ( 
        <>
        <div id='header' className='h-[13vh] w-[100vw] flex flex-col justify-center'>
            <div className='relative top-[50%] text-center'>
                <span id='header-text'>ORDER</span>
            </div>
        </div>
        <Menu></Menu>
        <div id="content-area">
            {cookies.map((cookie)=>(
                <OrderItem key={cookie.name} pic={cookie.pic} name={cookie.name} price={cookie.price} qty={cookie.qty}></OrderItem>
            ))}
        </div>
        <div className='cart-container'>
            <span>{}</span>
            <svg width="40" height="40" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3611 23.9412V24.6912H11.1111H31.1111C31.9339 24.6912 32.5833 25.3494 32.5833 26.1176C32.5833 26.8859 31.9339 27.5441 31.1111 27.5441H8.88889C8.06609 27.5441 7.41667 26.8859 7.41667 26.1176V4.35294V3.60294H6.66667H2.22222C1.39943 3.60294 0.75 2.94468 0.75 2.17647C0.75 1.40826 1.39943 0.75 2.22222 0.75H8.88889C9.71168 0.75 10.3611 1.40826 10.3611 2.17647V6.52941V7.27941H11.1111H38.6941L30.6804 21.0147H11.1111H10.3611V21.7647V23.9412ZM10 31.2206C11.445 31.2206 12.5833 32.3577 12.5833 33.7353C12.5833 35.1129 11.445 36.25 10 36.25C8.55498 36.25 7.41667 35.1129 7.41667 33.7353C7.41667 32.3577 8.55498 31.2206 10 31.2206ZM30 31.2206C31.445 31.2206 32.5833 32.3577 32.5833 33.7353C32.5833 35.1129 31.445 36.25 30 36.25C28.555 36.25 27.4167 35.1129 27.4167 33.7353C27.4167 32.3577 28.555 31.2206 30 31.2206Z" fill="white" stroke="black" strokeWidth="1.5"/>
            </svg>
        </div>
        

        </>
     );
}

export default Order;