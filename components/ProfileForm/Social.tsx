"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SocialData } from '@/data/SocialData'
import { Input } from '../ui/input'
import useSocialStore from '@/store/SocialStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Setting from './Setting'

const Social = () => {
    const [selectedStyle, setSelectedStyle] = useState('flat')
    const [usernames, setUsernames] = useState({})

    const handleStyleChange = (value) => {
        console.log('Selected style:', value);
        setSelectedStyle(value);
    }
    const handleUsernameChange = (id, value) => {
        setUsernames(prev => ({ ...prev, [id]: value }));
    }

    const socialData = SocialData.shieldIcons || []

    const {
        addIcon,
        removeIcon,
        icons,
        sectionStyle,
        setGap,
        setSectionStyle,
        setIconHeight,
        setIcons,

    } = useSocialStore()



    useEffect(() => {
        Object.entries(usernames).forEach(([id, username]) => {
            const social = socialData.find(s => s.id === id)
            if (social && username) {
                const url = `${social.url.split('?')[0]}?style=${selectedStyle}&${social.url.split('?')[1] || ''}`
                addIcon({ id, url, href: social.href(username) })
            } else if (!username) {
                removeIcon(id)
            }
        })
    }, [usernames, selectedStyle, socialData, addIcon, removeIcon])

    return (
        <Tabs defaultValue="select" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-2 rounded-md">
                <TabsTrigger value="select" className='rounded-lg border border-gray-300'>Select</TabsTrigger>
                <TabsTrigger value="setting" className='rounded-lg border border-gray-300'>Setting</TabsTrigger>
            </TabsList>

            <TabsContent value="select">
                <Card className='w-full p-4 flex flex-col border border-gray-200 rounded-lg shadow-sm'>
                    <CardTitle className='mt-2'>Social</CardTitle>
                    <CardContent className='p-0'>
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
                    </CardContent>
                    <CardContent className='p-0 mt-4 grid grid-cols-2 gap-4'>
                        {socialData.map((social) => {
                            return (
                                <Card key={social.id} className='flex flex-col justify-center items-center border border-gray-200 p-2 h-28 cursor-pointer shadow-md'>
                                    <img
                                        src={`${social.url.split('?')[0]}?style=${selectedStyle}&${social.url.split('?')[1] || ''}`}
                                        alt={social.label}
                                        className='min-w-16 min-h-7 rounded-md self-start'
                                    />
                                    <Input
                                        placeholder='Enter Username'
                                        value={usernames[social.id] || ''}
                                        onChange={(e) => handleUsernameChange(social.id, e.target.value)}
                                        className='border-black/20 self-start mt-2'
                                    />
                                </Card>
                            )
                        })}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value='setting'>
                <Setting
                    icons={icons}
                    sectionStyle={sectionStyle}
                    setGap={setGap}
                    setSectionStyle={setSectionStyle}
                    setIconHeight={setIconHeight}
                    setIcons={setIcons}
                    removeIcon={removeIcon}
                    title="Edit Social Media Settings"
                />
            </TabsContent>
        </Tabs>
    )
}

export default Social
