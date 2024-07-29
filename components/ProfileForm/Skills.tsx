"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { SkillsData } from '@/data/SkillsData'

const Skills = () => {
    const [selectedStyle, setSelectedStyle] = useState('flat')

    const handleStyleChange = (value) => {
        setSelectedStyle(value)
    }

    return (
        <Card className='w-full p-4 flex flex-col gap-4'>
            <CardTitle>Skills</CardTitle>
            <CardContent className='p-0'>
                <Select onValueChange={handleStyleChange}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="flat-square">Flat-Square</SelectItem>
                        <SelectItem value="plastic">Plastic</SelectItem>
                        <SelectItem value="for-the-badge">For-the-Badge</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardContent className='p-0 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {SkillsData.map((skill) => (
                    <Card key={skill.id} className='flex flex-col justify-center items-center p-2 h-20'>
                        <img
                            src={`${skill.url.split('?')[0]}?style=${selectedStyle}&${skill.url.split('?')[1] || ''}`}
                            alt={skill.label}
                            className=' min-w-16 min-h-7 rounded-md'
                        />
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}

export default Skills
