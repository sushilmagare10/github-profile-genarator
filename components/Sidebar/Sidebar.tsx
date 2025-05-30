"use client"

import React, { useState, useEffect } from 'react' 
import { FaHome, FaUsers, FaCode, FaChartBar, FaHeart } from 'react-icons/fa'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import useSidebarStore from '@/store/SidebarStore'
import SidebarFooter from './SidebarFooter' 

// Navigation items
const navigationItems = [
    { id: 'introduction', label: 'Introduction', icon: FaHome },
    { id: 'social', label: 'Social', icon: FaUsers },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'stats', label: 'Stats', icon: FaChartBar },
    { id: 'support', label: 'Support', icon: FaHeart },
]

export function AppSidebar() {
    const { activeSection, setActiveSection } = useSidebarStore()
    const { open } = useSidebar()
    const [starCount, setStarCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false); 
  
    useEffect(() => {
        // Fetch star count for SidebarFooter
        const fetchStarCount = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/sushilmagare10/github-profile-genarator')
                const data = await response.json()
                setStarCount(data.stargazers_count)
            } catch (error) {
                console.error('Error fetching star count for sidebar:', error)
            }
        }
        fetchStarCount()

        // Check for mobile view
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); 
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Sidebar collapsible='icon' className=' h-screen flex flex-col '> 
            <SidebarHeader className='pb-8 pt-4'>
                <div  className="flex items-center justify-between">
                    {open && <h1 className="text-2xl font-bold text-primary">GPG</h1>}
                   
                    <div className="hidden md:block"> 
                        <SidebarTrigger />
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        onClick={() => setActiveSection(item.id)}
                                        isActive={activeSection === item.id}
                                        className="w-full"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter starCount={starCount} showProductHunt={isMobile && open} /> 
        </Sidebar>
    )
}

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}