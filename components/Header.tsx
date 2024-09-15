"use client"


import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import MarkdownGenerator from './MarkdownGenerator'
import { IoLogoGithub, IoMdHeart } from "react-icons/io"
import { motion } from "framer-motion"

const Header = () => {
    const [starCount, setStarCount] = useState(0)

    useEffect(() => {
        const fetchStarCount = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/sushilmagare10/github-profile-genarator')
                const data = await response.json()
                setStarCount(data.stargazers_count)
            } catch (error) {
                console.error('Error fetching star count:', error)
            }
        }
        fetchStarCount()
    }, [])


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

    return (
        <header className='bg-secondary w-full shadow-lg border border-gray-400 rounded-md'>
            <div className='w-full px-4 py-4 flex flex-col md:flex-row justify-between items-center '>
                <div className='flex flex-col md:flex-[0.5] w-full items-center md:items-start'>
                    <h1 className='text md:text-lg lg:text-2xl font-bold text-primary text-center md:text-left'>Github Profile Generator</h1>
                    <span className='text-sm text-muted-foreground text-center md:text-left'>
                        Made by{' '}
                        <Link href='https://github.com/sushilmagare10' target='_blank' className='text-emerald-500 font-semibold hover:underline'>
                            Sushil Magare
                        </Link>
                    </span>
                </div>
                <div className='md:flex-[2] flex flex-col w-full md:flex-row justify-between gap-2 '>
                    <nav className='flex md:flex-wrap w-full items-center justify-center gap-4 lg:ml-[5%]'>
                        <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href='https://github.com/sushilmagare10/github-profile-genarator'
                                target='_blank'
                                className='flex flex-grow items-center gap-2 shadow-lg shadow-black/35 bg-primary  text-white px-4 py-2 text-sm  rounded-md transition-colors'
                            >
                                <motion.div variants={iconVariants} animate="animate">
                                    <IoLogoGithub size={24} />
                                </motion.div>
                                <span className='hidden md:block font-semibold'>Give it a Star</span>
                                <span className="bg-secondary text-black px-4 py-1  flex justify-center items-center rounded-md text-xs font-bold">
                                    {starCount}
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className=''
                        >
                            <Link
                                href='https://ko-fi.com/sushil_'
                                target="_blank"
                                className='flex items-center justify-between gap-2 shadow-lg shadow-black/35 bg-primary text-white px-4 py-2 text-sm rounded-md transition-colors'>
                                <motion.div variants={iconVariants} animate="animate">
                                    <IoMdHeart size={24} />
                                </motion.div>
                                <span className=' font-semibold '>
                                    Donate
                                </span>
                            </Link>
                        </motion.div>
                    </nav>
                    <div className='w-full flex flex-col md:flex-row  justify-center items-center gap-4 md:justify-end'>
                        <Link
                            href="https://www.producthunt.com/posts/github-profile-generator?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-github&#0045;profile&#0045;generator"
                            target="_blank"

                        >
                            <img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=489216&theme=light&period=daily"
                                alt="Github&#0032;Profile&#0032;Generator - Create&#0032;stunning&#0032;GitHub&#0032;profiles&#0032;in&#0032;seconds&#0032;with&#0032;ease&#0046;&#0032;🚀 | Product Hunt"
                                className='w-48'
                            />
                        </Link>
                        <MarkdownGenerator />
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header