"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SkillsData } from '@/data/SkillsData'

const Skills = () => {
    const [selectedStyle, setSelectedStyle] = useState('flat')
    const [selectedProvider, setSelectedProvider] = useState('Shields')

    const handleStyleChange = (value) => {
        setSelectedStyle(value)
    }

    const handleProviderChange = (value) => {
        setSelectedProvider(value)
    }


    const skills = SkillsData[selectedProvider as keyof typeof SkillsData] || [];

    return (
        <Card className='w-full p-4 flex flex-col gap-4'>
            <CardTitle>Skills</CardTitle>
            <CardContent className='p-0'>
                <Select onValueChange={handleProviderChange} defaultValue="Shields">
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Shields">Shields</SelectItem>
                        <SelectItem value="Devicons">Devicons</SelectItem>
                        <SelectItem value="SimpleIcons">SimpleIcons</SelectItem>
                        <SelectItem value="SkillsIcons">SkillsIcons</SelectItem>
                    </SelectContent>
                </Select>
                {selectedProvider === 'Shields' && (
                    <Select onValueChange={handleStyleChange} >
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
            </CardContent>
            <CardContent className='p-0 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {skills.map((skill) => (
                    <Card key={skill.id} className='flex flex-col justify-center items-center p-2 h-20 cursor-pointer shadow-md'>
                        <img
                            src={selectedProvider === 'Shields' ? `${skill.url.split('?')[0]}?style=${selectedStyle}&${skill.url.split('?')[1] || ''}` : skill.url}
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
