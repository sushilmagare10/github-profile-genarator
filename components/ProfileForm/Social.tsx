"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SocialData } from '@/data/SocialData'

const Social = () => {

    const [selectedStyle, setSelectedStyle] = useState('flat')
    const handleStyleChange = (value) => {
        setSelectedStyle(value)
    }


    return (
        <Card className=' w-full p-4 flex flex-col gap-4'>
            <CardTitle>Social</CardTitle>
            <CardContent className='p-0'>
                <Select onValueChange={handleStyleChange} defaultValue='Shields'>
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder='Select Provider' />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="Shields">Shields</SelectItem>
                        <SelectItem value="Devicons">Devicons</SelectItem>
                        <SelectItem value="SimpleIcons">SimpleIcons</SelectItem>
                        <SelectItem value="SkillsIcons">SkillsIcons</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleStyleChange} >
                    <SelectTrigger className="w-[200px] mt-4">
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
                {SocialData.map((social) => (
                    <Card key={social.id} className='flex flex-col justify-center items-center p-2 h-20 cursor-pointer shadow-md'>
                        <img
                            src={`${social.url.split('?')[0]}?style=${selectedStyle}&${social.url.split('?')[1] || ''}`}
                            alt={social.label}
                            className='min-w-16 min-h-7 rounded-md'
                        />
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}

export default Social