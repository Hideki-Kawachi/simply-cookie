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

const logoVariants={
    start:{
        r: 15,
        x:10,
        y:5
    },
    show: {
        r:[15,15,30],
        x:[0,30,0],
        y:[5,30,48],
        transition:{
            ease:"easeInOut",
            duration: "3"
        }
    }
}

/*
                <motion.svg height="50" viewBox="0 0 34.891216 55.294238">
                    <clipPath id='logo-clip'>
                        <path transform="translate(-83.289202,-114.12615)" d="M 95.9599 169.3555 C 91.7704 168.8409 88.5727 167.5768 86.3712 165.5648 C 84.3779 163.743 83.4698 161.9644 83.3169 159.5828 C 83.1266 156.6168 83.9075 154.9259 85.9489 153.8845 C 86.5272 153.5895 87.5737 153.2802 88.2746 153.1971 L 89.549 153.0462 L 89.7371 155.2623 C 90.1612 160.2581 91.2054 163.5396 93.0332 165.6214 C 93.5036 166.1572 94.6636 166.9772 95.611 167.4435 C 99.7741 169.493 105.5983 168.3695 108.523 164.9527 C 110.0531 163.1651 110.6095 161.3645 110.6282 158.1398 C 110.6487 154.6056 110.1664 153.1165 108.3615 151.1417 C 106.6854 149.3078 104.543 147.9642 99.2684 145.4389 C 93.4147 142.6364 90.3766 140.7268 88.2224 138.4956 C 85.3177 135.4871 84.3143 132.8569 84.3222 128.2719 C 84.3307 123.3239 85.8608 119.9878 89.3107 117.3956 C 91.0213 116.1103 92.5524 115.4047 95.1662 114.6973 C 97.7725 113.9919 103.8574 113.9273 106.7985 114.5738 C 109.2938 115.1223 112.2327 116.5091 113.6965 117.8287 C 115.735 119.6665 116.5817 122.532 115.7058 124.6284 C 114.93 126.4852 112.3458 127.9773 109.9057 127.9773 H 109.0044 L 108.8464 125.3976 C 108.6736 122.5762 108.0349 120.1642 106.9876 118.377 C 104.8019 114.6475 98.5045 113.9773 94.4687 117.0447 C 92.4271 118.5964 91.4703 121.087 91.4652 124.8629 C 91.4606 128.2407 92.187 130.2711 94.0944 132.2113 C 95.9265 134.0748 98.0631 135.3457 103.8179 137.9948 C 112.0759 141.7963 114.8219 143.8575 116.7327 147.6888 C 117.7797 149.7881 118.187 151.6035 118.1803 154.141 C 118.1603 161.7804 113.1159 167.4995 105.0881 168.9844 C 103.376 169.3011 97.4715 169.5411 95.9599 169.3555 Z"></path>
                        <path transform="translate(-83.289202,-114.12615)" d="M 97.2162 166.229 C 94.9167 165.4084 93.3943 163.405 92.7796 160.3909 C 91.799 155.5829 93.9068 150.8969 97.5293 149.8313 C 100.2014 149.0453 103.1439 149.4011 104.4927 150.6733 C 105.8037 151.9099 105.2376 153.9065 103.5759 153.9065 C 102.9732 153.9065 102.8789 153.7715 102.7142 152.6728 C 102.3483 150.2328 100.2053 149.2065 98.1247 150.4749 C 96.3329 151.5674 95.3636 155.8731 95.9102 160.3122 C 96.4315 164.5465 97.6492 166.0744 100.5037 166.0763 C 102.2806 166.0773 103.2492 165.4269 104.0219 163.7133 C 104.4053 162.8632 104.5808 162.7009 104.8633 162.9354 C 105.7831 163.6987 104.9594 165.3316 103.2671 166.1001 C 101.9559 166.6955 98.7168 166.7645 97.2162 166.229 Z"/>
                    </clipPath>
                    <motion.circle className="fill-black" radius="50px" clipPath="url(#logo-clip)" />
                </motion.svg>
*/



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