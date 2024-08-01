"use client"

import React from 'react'
import Introduction from './Introduction'
import Skills from './Skills'
import useSidebarStore from '@/store/SidebarStore'
import Social from './Social'
import Stats from './Stats'
import Support from './Support'

const ProfileForm = () => {
    const { activeSection, setActiveSection } = useSidebarStore();

    const renderActionSection = () => {
        switch (activeSection) {
            case "skills":
                return <Skills />;
            case 'social':
                return <Social />
            case 'stats':
                return <Stats />
            case 'support':
                return <Support />

            case "introduction":
            default:
                return <Introduction />
        }
    }

    return (
        <div className=' sticky top-4 flex flex-col w-full justify-start items-center gap-4 bg-card p-4 h-full min-h-screen border border-black/25 shadow-lg rounded-lg'>

            {renderActionSection()}
        </div>
    )
}

export default ProfileForm