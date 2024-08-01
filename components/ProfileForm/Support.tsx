"use client"


import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { SupportData } from '@/data/SupportData'

const Support = () => {

    const [selectedStyle, setSelectedStyle] = useState('flat')
    const [selectedProvider, setSelectedProvider] = useState("shieldIcons")
    const [usernames, setUsernames] = useState({});


    const handleStyleChange = (value) => {
        setSelectedStyle(value)
    }

    const handleProviderChange = (value) => {
        setSelectedProvider(value)
    }

    const handleUsernameChange = (id, value) => {
        setUsernames(prev => ({ ...prev, [id]: value }));
    };

    const supportMeData = SupportData[selectedProvider] || []

    return (
        <Card className=' w-full p-0 flex flex-col border-none gap-4'>
            <CardTitle>Support Me</CardTitle>
            <CardContent className='p-0'>
                <div className='flex items-center gap-4'>
                    <Select onValueChange={handleProviderChange} defaultValue="shieldIcons">
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shieldIcons">Shields Icons</SelectItem>
                            <SelectItem value="simpleIcons">Simple Icons</SelectItem>
                            <SelectItem value="githubRaw">GitHub Raw Icons</SelectItem>
                        </SelectContent>
                    </Select>
                    {selectedProvider === 'shieldIcons' && (
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

            </CardContent>
            <CardContent className='flex flex-col w-full gap-2 p-0'>
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
            <CardContent className='p-0 mt-4 grid grid-cols-2 gap-4'>
                {supportMeData.map((support) => (
                    <Card key={support.id} className='flex flex-col justify-center items-center p-2 h-28 cursor-pointer shadow-md'>
                        <img
                            src={selectedProvider === 'shieldIcons' ? `${support.url.split('?')[0]}?style=${selectedStyle}&${support.url.split('?')[1] || ''}` : support.url}
                            alt={support.label}
                            className='min-w-16 min-h-7 rounded-md self-start '
                        />
                        <Input
                            value={support.href(usernames[support.id] || '')}
                            onChange={(e) => handleUsernameChange(support.id, e.target.value.split('/').pop())}
                            className=' border-black/20 self-start mt-2'
                        />
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}

export default Support