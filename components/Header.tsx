"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import MarkdownGenerator from './MarkdownGenerator'
import { IoLogoGithub, IoIosShareAlt, IoMdHeart } from "react-icons/io"
import { motion } from "framer-motion"
import axios from 'axios'

const Header = () => {
    const [starCount, setStarCount] = useState(0)

    useEffect(() => {
        const fetchStarCount = async () => {
            try {
                const response = await axios.get('https://api.github.com/repos/sushilmagare10/github-profile-genarator')
                setStarCount(response.data.stargazers_count)
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
            <div className='px-4 mx-auto py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                <div className='flex flex-col flex-1 w-full items-center md:items-start'>
                    <h1 className='text md:text-lg lg:text-2xl font-bold text-primary text-center md:text-left'>Github Profile Generator</h1>
                    <span className='text-sm text-muted-foreground text-center md:text-left'>
                        Made by{' '}
                        <Link href='https://github.com/sushilmagare10' target='_blank' className='text-emerald-500 font-semibold hover:underline'>
                            Sushil Magare
                        </Link>
                    </span>
                </div>
                <div className='flex-[2] flex flex-col w-full md:flex-row justify-between gap-2 '>
                    <nav className='flex md:flex-wrap justify-center gap-4 '>
                        <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href='https://github.com/sushilmagare10/github-profile-genarator'
                                target='_blank'
                                className='flex flex-grow items-center gap-2 shadow-lg shadow-black/35 bg-primary  text-white px-4 py-1 text-sm md:px-4 md:py-2 rounded-md transition-colors'
                            >
                                <motion.div variants={iconVariants} animate="animate">
                                    <IoLogoGithub size={24} />
                                </motion.div>
                                <span className=' font-semibold'>Give it a Star</span>
                                <span className="bg-secondary text-black px-4 py-1 flex justify-center items-center rounded-md text-xs font-bold">
                                    {starCount}
                                </span>
                            </Link>
                        </motion.div>
                        <motion.button
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className='flex items-center gap-2 shadow-lg shadow-black/35 bg-primary text-white px-3 py-1 text-sm md:px-4 md:py-2 rounded-md transition-colors'
                        >
                            <Link href='https://ko-fi.com/sushil_' target="_blank" className='flex justify-between items-center gap-2'>
                                <motion.div variants={iconVariants} animate="animate">
                                    <IoMdHeart size={24} />
                                </motion.div>
                                <span className=' font-semibold'>
                                    Donate
                                </span>
                            </Link>
                        </motion.button>
                    </nav>
                    <div className='w-full md:w-auto flex justify-center md:justify-end'>
                        <MarkdownGenerator />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header