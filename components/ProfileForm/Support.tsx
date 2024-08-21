"use client"


import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { SupportData } from '@/data/SupportData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Setting from './Setting'
import useSupportStore from '@/store/SupportStore'

const Support = () => {

    const [usernames, setUsernames] = useState({});

    const handleStyleChange = (value: any) => {
        setSelectedStyle(value)
    }

    const handleProviderChange = (value: any) => {
        setSelectedProvider(value)
    }

    const handleUsernameChange = (id, value) => {
        setUsernames(prev => ({ ...prev, [id]: value }));
    };

    const supportMeData = SupportData.shieldIcons || []

    const {
        alignment,
        icons: selectedIcons,
        selectedProvider,
        selectedStyle,
        addIcon,
        setAlignment,
        removeIcon,
        setGap,
        setIconHeight,
        setIcons,
        setSelectedProvider,
        setSelectedStyle
    } = useSupportStore()


    useEffect(() => {
        Object.entries(usernames).forEach(([id, username]) => {
            const support = supportMeData.find(s => s.id === id);
            if (support && username) {
                const url = `${support.url.split('?')[0]}?style=${selectedStyle}&${support.url.split('?')[1] || ''}`;
                addIcon({ id, url, href: support.href(username) });
            } else if (!username) {
                removeIcon(id);
            }
        });
    }, [usernames, selectedStyle, supportMeData, addIcon, removeIcon]);


    console.log("icons", selectedIcons)

    return (
        <Tabs defaultValue='select' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 gap-4 rounded-lg h-12 px-2'>
                <TabsTrigger value='select' className='rounded-lg border border-gray-300'>Select</TabsTrigger>
                <TabsTrigger value='setting' className='rounded-lg border border-gray-300'>Setting</TabsTrigger>
            </TabsList>
            <TabsContent value='select'>
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
                    <CardContent className='p-0 mt-4 grid grid-cols-2 gap-4'>
                        {supportMeData.map((support) => (
                            <Card key={support.id} className='flex flex-col justify-center items-center p-2 h-28 cursor-pointer shadow-md'>
                                <img
                                    src={`${support.url.split('?')[0]}?style=${selectedStyle}&${support.url.split('?')[1] || ''}`}
                                    alt={support.label}
                                    className='min-w-16 min-h-7 rounded-md self-start '
                                />
                                <Input
                                    placeholder='Enter Username'
                                    value={usernames[support.id] || ''}
                                    onChange={(e) => handleUsernameChange(support.id, e.target.value)}
                                    className=' border-black/20 self-start mt-2'
                                />
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='setting'>
                <Setting
                    icons={selectedIcons}
                    sectionStyle={alignment}
                    setGap={setGap}
                    setSectionStyle={setAlignment}
                    setIconHeight={setIconHeight}
                    setIcons={setIcons}
                    removeIcon={removeIcon}
                    title='Edit Support Setting'
                />
            </TabsContent>
        </Tabs>
    )
}

export default Support