"use client"

import React from 'react'
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

  return (
    <Sidebar collapsible='icon' className='bg-sidebar'>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          {open && <h1 className="text-2xl font-bold text-primary">GPG</h1>}
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
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
    </Sidebar>
  )
}

// Wrapper component that provides the sidebar context
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