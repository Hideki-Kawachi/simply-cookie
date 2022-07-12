import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

function OrderItem( {name, pic, price, qty, description}) {
    const [quantity, setQuantity] = useState(0);
    const [source, setSource] = useState("");

    const control = useAnimation();

    
    const buttonVariants = {
        clicked: {
            scale: 0.9,
            transition: {
                ease: "easeInOut",
                duration: 0.05
            }
        }
    }

    function disableButton(){
        return quantity<=0
    }
    
    return ( 
        <div className='order-item-main'>
            <div className='order-item-pic-container'>
                <Image className='order-item-pic' src={pic} layout="responsive" width="100%" height="100%"></Image>
            </div>
            <div className='order-item-description-container'>
                <h1 className='order-item-name'>{name}</h1>
                <hr></hr>
                <span className='order-item-description'>{description}</span>
            </div>
            
            
          {/*  
            <span className='order-item-text'>Php {price} / Box of {qty}</span>
        
            <div className='order-item-quantity-container'>
                <motion.button disabled={disableButton()} whileTap="clicked" animate={control} variants={buttonVariants} onClick={()=>setQuantity(quantity-1)}>
                    <svg width="24" height="24" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.button>
                <span>{quantity}</span>
                <motion.button whileTap="clicked" animate={control} variants={buttonVariants} onClick={()=>setQuantity(quantity+1)}>
                    <svg width="24" height="24" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.button>
            </div>
        */}
            
        </div>
     );
}

export default OrderItem;