import React from "react";
import Menu from "../components/menu";

function OurCookies() {
    return ( 
        <>
        <div id='header' className='h-[13vh] w-[100vw] flex flex-col justify-center'>
            <div className='relative top-[50%] text-center'>
                <span id='header-text'>OUR COOKIES</span>
            </div>
        </div>
        <Menu></Menu>
        </>
     );
}

export default OurCookies;