import React from 'react';
import Menu from '../components/menu';

function AboutUs() {
    return ( 
        <>
        <div id='header' className='h-[13vh] w-[100vw] flex flex-col justify-center'>
            <div className='relative top-[50%] text-center'>
                <span id='header-text'>ABOUT US</span>
            </div>
        </div>
        <Menu></Menu>
        </>
     );
}

export default AboutUs;