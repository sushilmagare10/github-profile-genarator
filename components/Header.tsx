// components/Header.tsx
"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import MarkdownGenerator from './MarkdownGenerator'
import { IoLogoGithub } from "react-icons/io"
import { motion } from "framer-motion"
import { ThemeToggle } from './theme-toggle'
import { SidebarTrigger} from "@/components/ui/sidebar" 
import { IoMenu, IoStar, IoTrendingUp } from "react-icons/io5"; 
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const Header = () => {
    const [starCount, setStarCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStarCount = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/sushilmagare10/github-profile-genarator')
                const data = await response.json()
                setStarCount(data.stargazers_count)
            } catch (error) {
                console.error('Error fetching star count:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchStarCount()
    }, [])


    return (
        <motion.header 
            className='bg-background/95 backdrop-blur-sm w-full shadow-sm border-b border-border/50 sticky top-0 z-50'
            initial="initial"
            animate="animate"
        >
            <div className='w-full  py-3 flex justify-between items-center h-16'>
                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <SidebarTrigger>
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-9 w-9 p-0 hover:bg-accent/50 transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <IoMenu size={20} className="text-foreground" />
                        </Button>
                    </SidebarTrigger>
                </div>

                {/* Desktop Logo/Title */}
                <div className='hidden md:block'>
                    <motion.div 
                        className='flex items-center gap-3'
                    >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
                            <IoLogoGithub className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className='text-lg font-bold text-primary tracking-tight'>
                                GitHub Profile Generator
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Create stunning profiles in seconds
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile: Quick Actions */}
                <div className='flex items-center gap-2 md:hidden'>
                    <MarkdownGenerator />
                    <ThemeToggle />
                </div>

                {/* Desktop: Full Action Bar */}
                <div className='hidden md:flex items-center gap-3'>
                <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            href="https://www.producthunt.com/posts/github-profile-generator?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-github&#0045;profile&#0045;generator"
                            target="_blank"
                            className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=489216&theme=light&period=daily"
                                alt="Github Profile Generator - Create stunning GitHub profiles in seconds with ease. 🚀 | Product Hunt"
                                className='h-10 w-auto transition-transform duration-200 hover:scale-105'
                            />
                        </Link>
                    </motion.div>
                    <motion.div
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link
                            href='https://github.com/sushilmagare10/github-profile-genarator'
                            target='_blank'
                            className='group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-4 py-1.5 text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md'
                        >
                            <motion.div 
                                animate="animate"
                                className="flex items-center"
                            >
                                <IoLogoGithub size={18} />
                            </motion.div>
                            <span className='font-semibold'>Star on GitHub</span>
                            <div className="flex items-center gap-1 ">
                                <Badge variant="secondary" className="bg-background/20 text-primary-foreground border-primary-foreground/20 font-bold text-xs px-2 py-1.5">
                                    {isLoading ? '•••' : starCount.toLocaleString()}
                                </Badge>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <MarkdownGenerator />
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Optional: Subtle gradient border bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.header>
    )
}

export default Header