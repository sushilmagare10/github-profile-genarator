"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaHome, FaUsers, FaCode, FaChartBar, FaHeart } from 'react-icons/fa'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import useSidebarStore from '@/store/SidebarStore'

const Sidebar = () => {
    const { isOpen, activeSection, toggleSidebar, setActiveSection, setIsOpen } = useSidebarStore()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 1024
            setIsMobile(newIsMobile)
            setIsOpen(!newIsMobile)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [setIsOpen])

    const sections = [
        { id: 'introduction', label: 'Introduction', icon: <FaHome /> },
        { id: 'social', label: 'Social', icon: <FaUsers /> },
        { id: 'skills', label: 'Skills', icon: <FaCode /> },
        { id: 'stats', label: 'Stats', icon: <FaChartBar /> },
        { id: 'support', label: 'Support', icon: <FaHeart /> },
    ]

    return (
        <aside className={`h-[97.5vh] ${isOpen ? "w-64 border-gray-400 border rounded-lg" : "w-16 "} ${isMobile ? "fixed left-0 top-0 z-10" : ""} transition-all duration-100`}>
            <nav className={`h-full p-4 flex flex-col ${isOpen ? "bg-gray-100 shadow-xl" : "bg-none"} rounded-md`}>
                <div className={`p-4 pb-4 flex ${isOpen ? "justify-between bg-primary rounded-md" : "justify-center bg-none"} items-center`}>
                    <h1 className={`text-3xl text-white font-bold ${isOpen ? "flex " : "hidden"}`}>
                        GPG
                    </h1>
                    <Button
                        onClick={toggleSidebar}
                        variant={isOpen ? "outline" : "default"}
                        className='p-3 ml-4 relative z-10'
                    >
                        {isOpen ? <FaArrowLeft className='text-lg' /> : <FaArrowRight className='text-lg' />}
                    </Button>
                </div>
                <ul className="flex-1 mt-10 ">
                    {sections.map((section) => (
                        <SidebarItem
                            key={section.id}
                            icon={section.icon}
                            text={section.label}
                            active={activeSection === section.id}
                            onClick={() => setActiveSection(section.id)}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

const SidebarItem = ({ icon, text, active, onClick }: {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
}) => {
    const isOpen = useSidebarStore(state => state.isOpen)

    return (
        <Button
            onClick={onClick}
            variant={active ? "default" : "outline"}
            className={`
                flex items-center justify-center py-2 px-3 my-4
                font-medium rounded-md cursor-pointer
                transition-all group z-0
                ${isOpen ? 'w-full' : 'w-12 mx-auto'}
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${isOpen ? "w-52 ml-3" : "w-0"}`}
            >
                {text}
            </span>
        </Button>
    )
}

export default Sidebar