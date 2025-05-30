import React from 'react';
import Link from 'next/link';
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useSidebar } from '../ui/sidebar';

interface SidebarFooterProps {
    starCount: number;
    showProductHunt: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ starCount, showProductHunt }) => {
    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    }

    const iconVariants = {
        initial: { rotate: 0, scale: 1 },
        animate: {
            scale: 1.2,
            rotate: [0, 25, -25, 0],
            transition: {
                duration: 0.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
            }
        }
    }

    const socialIconVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.2,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.9 }
    }

    const { open } = useSidebar()

    return (
        <div className="p-4 border-t border-border mt-auto flex flex-col items-start">
            {open && 
                <p className="text-sm text-muted-foreground text-center mb-4">
                    Made by{' '}
                    <Link href='https://github.com/sushilmagare10' target='_blank' className='text-primary font-semibold hover:underline'>
                        Sushil Magare
                    </Link>
                </p>
            }

            {/* Social Links */}
            {open && (
                <div className="flex items-start justify-center gap-3 mb-4">
                    <motion.div
                        variants={socialIconVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link
                            href="https://github.com/sushilmagare10"
                            target="_blank"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <IoLogoGithub size={20} className="text-foreground" />
                        </Link>
                    </motion.div>
                    <motion.div
                        variants={socialIconVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link
                            href="https://twitter.com/Sushil__SM"
                            target="_blank"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                            aria-label="Twitter Profile"
                        >
<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg">
    <g>
        <polygon points="12.153992,10.729553 8.088684,5.041199 5.92041,5.041199 10.956299,12.087097 11.59021,12.97345 15.900635,19.009583 18.068909,19.009583 12.785217,11.615906" />
        <path d="M21.15979,1H2.84021C1.823853,1,1,1.823853,1,2.84021v18.31958C1,22.176147,1.823853,23,2.84021,23h18.31958C22.176147,23,23,22.176147,23,21.15979V2.84021C23,1.823853,22.176147,1,21.15979,1z M15.235352,20l-4.362549-6.213013 L5.411438,20H4l6.246887-7.104675L4,4h4.764648l4.130127,5.881958L18.06958,4h1.411377l-5.95697,6.775635L20,20H15.235352z" />
    </g>
</svg>

                        </Link>
                    </motion.div>
                </div>
            )}

            {showProductHunt && (
                <div className='flex flex-col items-center gap-3 mb-4'>
                    <motion.div
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className='w-full'
                    >
                        <Link
                            href='https://github.com/sushilmagare10/github-profile-genarator'
                            target='_blank'
                            className='flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm rounded-md transition-colors hover:bg-primary/90 w-full'
                        >
                            <motion.div variants={iconVariants} animate="animate">
                                <IoLogoGithub size={20} />
                            </motion.div>
                            <span className='font-semibold'>Give it a Star</span>
                            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-xs font-bold">
                                {starCount}
                            </span>
                        </Link>
                    </motion.div>
                    <Link
                        href="https://www.producthunt.com/posts/github-profile-generator?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-github&#0045;profile&#0045;generator"
                        target="_blank"
                        className='w-full flex justify-center'
                    >
                        <img
                            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=489216&theme=light&period=daily"
                            alt="Github&#0032;Profile&#0032;Generator - Create&#0032;stunning&#0032;GitHub&#0032;profiles&#0032;in&#0032;seconds&#0032;with&#0032;ease&#0046;&#0032;🚀 | Product Hunt"
                            className='h-9 w-auto'
                        />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SidebarFooter;