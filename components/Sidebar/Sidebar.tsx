"use client"

import React from 'react'
import { Button } from '../ui/button'
import useSidebarStore from '@/store/SidebarStore';

const Sidebar = () => {

    const { activeSection, setActiveSection } = useSidebarStore();

    const sections = [
        { id: 'introduction', label: 'Introduction' },
        { id: 'social', label: 'Social' },
        { id: 'skills', label: 'Skills' },
        { id: 'bagdes', label: 'Bagdes' },
    ]

    return (
        <section className='sticky top-4 flex flex-col mt-4 items-center justify-start p-2 rounded-md gap-4 min-w-80 bg-slate-100 h-full shadow-xl border border-black/25 '>
            <h2 className='text-3xl text-primary uppercase font-bold mt-4 ml-6 w-full'>Profilify</h2>
            <div className=' flex flex-col mt-8 gap-4 w-full p-4 h-full rounded-md'>
                {
                    sections.map((section) => (
                        <Button
                            key={section.id}
                            variant={activeSection === section.id ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => setActiveSection(section.id)}
                        >
                            {section.label}
                        </Button>
                    ))
                }
            </div>
        </section>
    )
}

export default Sidebar