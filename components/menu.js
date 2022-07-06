import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


const menuVariants = {
    start: {
        right: 0,
        width: 0,
        overflow: "hidden",
    },
    show: {
        right: 0,
        width: "100%",
        transition: {
            ease: "easeIn",
            staggerChildren: "0.15",
            when: "beforeChildren"
        }
    },
    end: {
        right: 0,
        width: 0,
        overflow: "hidden",
        transition: {
            ease: "easeIn",
            staggerChildren: "0.15",
            when: "afterChildren",
            staggerDirection: "-1"
        }
    }
}

const itemVariants = {
    start: {
        scale: 0.8,
        opacity: 0
    },
    show: {
        scale: 1,
        opacity: 1,
        transition:{
            ease: "easeIn",
            duration: "0.3"
        }
    },
    end: {
        scale: 0.2,
        opacity: 0,
        transition:{
            ease: "easeIn",
            duration: "0.3"
        }
    }
}


function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const menuPop = {
        true:(
                <motion.div className='flex flex-col gap-5 pt-20 text-center menu-background' initial="start" animate="show" exit="end" variants={menuVariants}>
                    <motion.span  className='menu-items' variants={itemVariants} >HOME</motion.span>
                    <motion.span  className='menu-items' variants={itemVariants} >OUR COOKIES</motion.span>
                    <motion.span  className='menu-items' variants={itemVariants} >ORDER</motion.span>
                    <motion.span  className='menu-items' variants={itemVariants} >ABOUT US</motion.span>
                </motion.div>  
        )
    }

    return (
        <>
        <motion.svg whileTap={{scale: 0.7}} className='relative z-50 float-right m-1 cursor-pointer' onClick={()=>{setIsOpen(!isOpen)}}  width="30" height="30" strokeWidth={2} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 12H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 19H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
        <AnimatePresence>
            {menuPop[isOpen]}
        </AnimatePresence>
        </>
    );
}

export default Menu;