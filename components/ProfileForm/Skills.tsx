"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { SkillsData } from '@/data/SkillsData'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const categories = [
    "Languages",
    'ORM',
    'Frontend',
    'Backend',
    'Database',
    'Mobile App Development',
    'AI/ML',
    "Data Visualization",
    "DevOps",
    "Testing",
    "Software",
    "Static Site Generator",
    "Game Engines",
    "Automation"
];

const Skills = () => {
    const [selectedStyle, setSelectedStyle] = useState('flat')
    const [selectedProvider, setSelectedProvider] = useState('shields.io')
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    const handleStyleChange = (value: any) => {
        setSelectedStyle(value)
    }

    const handleProviderChange = (value: any) => {
        setSelectedProvider(value)
        setSelectedCategory(categories[0]) // Reset category when provider changes
    }

    const handleCategoryChange = (value: any) => {
        setSelectedCategory(value)
    }

    const skills = SkillsData[selectedProvider as keyof typeof SkillsData] || {};
    const filteredSkills = skills[selectedCategory] || [];

    return (
        <Card className='w-full p-0 flex border-none flex-col gap-4'>
            <CardTitle>Skills</CardTitle>
            <CardContent className='p-0'>
                <div className='flex items-center gap-4'>
                    <Select onValueChange={handleProviderChange} defaultValue="shields.io">
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shields.io">Shields.io</SelectItem>
                            <SelectItem value="simpleIcons">Simple Icons</SelectItem>
                            <SelectItem value="SkillsIcons">Skills Icons</SelectItem>
                            <SelectItem value="GitHub">Github Icons</SelectItem>
                        </SelectContent>
                    </Select>
                    {selectedProvider === 'shields.io' && (
                        <Select onValueChange={handleStyleChange} defaultValue="flat">
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select Style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="flat">Flat</SelectItem>
                                <SelectItem value="flat-square">Flat-Square</SelectItem>
                                <SelectItem value="plastic">Plastic</SelectItem>
                                <SelectItem value="for-the-badge">For-the-Badge</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>
                <Tabs defaultValue={categories[0]} className="mt-4 h-max" value={selectedCategory} onValueChange={handleCategoryChange}>
                    <TabsList className='w-full h-full grid grid-cols-4 gap-2 py-4 px-2'>
                        {categories.map(category => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                className='border border-black/30 rounded-md text-xs '
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <CardContent className='flex flex-col w-full gap-2 p-2'>
                    <CardTitle>Edit</CardTitle>
                    <div className='flex  justify-between -mt-1'>
                        <div className='flex flex-col'>
                            <h3 className='mt-2 font-semibold'>Section Style</h3>
                            <div className=' flex items-center gap-4 mt-2'>
                                <Button className='px-6 h-8' variant='outline'>Left</Button >
                                <Button className='px-6 h-8' variant='outline'>Center</Button >
                                <Button className='px-6 h-8' variant='outline'>Right</Button >
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-2 font-semibold'>Gap</h3>
                            <div className=' flex items-center gap-4 mt-2'>
                                <Input placeholder='Gap 2px' className='h-8' />
                            </div>
                        </div>
                    </div>
                    <CardTitle className='mt-4'>Selected Icons</CardTitle>
                    <Card className='w-full h-28 '>

                    </Card>
                </CardContent>
            </CardContent>
            <CardContent className='p-0 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {filteredSkills.map((skill) => (
                    <TooltipProvider key={skill.id}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Card key={skill.id} className='flex flex-col justify-center items-center p-2 h-20 cursor-pointer shadow-md'>
                                    <img
                                        src={selectedProvider === 'shields.io' ? `${skill.url.split('?')[0]}?style=${selectedStyle}&${skill.url.split('?')[1] || ''}` : skill.url}
                                        alt={skill.label}
                                        className='min-w-16 min-h-7 rounded-md'
                                    />
                                    <TooltipContent className='mb-2 text-primary w-full shadow-lg border font-semibold'>
                                        <p>{skill.label}</p>
                                    </TooltipContent>
                                </Card>
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </CardContent>
        </Card>
    )
}

export default Skills
