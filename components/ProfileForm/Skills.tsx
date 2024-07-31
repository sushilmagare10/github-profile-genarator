"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { SkillsData } from '@/data/SkillsData'

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

    const handleStyleChange = (value) => {
        setSelectedStyle(value)
    }

    const handleProviderChange = (value) => {
        setSelectedProvider(value)
        setSelectedCategory(categories[0]) // Reset category when provider changes
    }

    const handleCategoryChange = (value) => {
        setSelectedCategory(value)
    }

    const skills = SkillsData[selectedProvider as keyof typeof SkillsData] || {};
    const filteredSkills = skills[selectedCategory] || [];

    return (
        <Card className='w-full p-4 flex flex-col gap-4'>
            <CardTitle>Skills</CardTitle>
            <CardContent className='p-0'>
                <Select onValueChange={handleProviderChange} defaultValue="shields.io">
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="shields.io">Shields.io</SelectItem>
                        <SelectItem value="simpleIcons">Simple Icons</SelectItem>
                        <SelectItem value="devicons">Devicons</SelectItem>
                    </SelectContent>
                </Select>
                {selectedProvider === 'shields.io' && (
                    <Select onValueChange={handleStyleChange} defaultValue="flat">
                        <SelectTrigger className="w-[200px] mt-4">
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
            </CardContent>
            <CardContent className='p-0 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {filteredSkills.map((skill) => (
                    <Card key={skill.id} className='flex flex-col justify-center items-center p-2 h-20 cursor-pointer shadow-md'>
                        <img
                            src={selectedProvider === 'shields.io' ? `${skill.url.split('?')[0]}?style=${selectedStyle}&${skill.url.split('?')[1] || ''}` : skill.url}
                            alt={skill.label}
                            className='min-w-16 min-h-7 rounded-md'
                        />
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}

export default Skills
