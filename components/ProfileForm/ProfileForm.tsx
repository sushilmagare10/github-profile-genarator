"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import Introduction from './Introduction'
import Skills from './Skills'
import useSidebarStore from '@/store/SidebarStore'
import Social from './Social'

const ProfileForm = () => {
    const { activeSection, setActiveSection } = useSidebarStore();

    const renderActionSection = () => {
        switch (activeSection) {
            case "skills":
                return <Skills />;
            case 'social':
                return <Social />

            case "introduction":
            default:
                return <Introduction />
        }
    }

    return (
        <div className=' sticky top-4 flex flex-col w-full justify-start items-center gap-4 bg-card p-4 h-full border border-black/25 shadow-2xl rounded-lg'>

            {renderActionSection()}
        </div>
    )
}

export default ProfileForm