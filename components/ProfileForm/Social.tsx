"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SocialData } from '@/data/SocialData'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import useSocialStore from '@/store/SocialStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Setting from './Setting'
import { FaShare, FaCog, FaUsers, FaPalette } from 'react-icons/fa'
import { Check } from 'lucide-react'

type Usernames = {
    [id: string]: string;
};

const Social = () => {
    const [usernames, setUsernames] = useState<Usernames>({})
    
    const handleUsernameChange = (id: any, value: any) => {
        setUsernames(prev => ({ ...prev, [id]: value }));
    }

    const socialData = useMemo(() => SocialData.shieldIcons || [], []);

    const {
        addIcon,
        removeIcon,
        icons,
        sectionStyle,
        setGap,
        selectedStyle,
        setSelectedStyle,
        setSectionStyle,
        setIconHeight,
        setIcons,
    } = useSocialStore()

    const handleStyleChange = (value: any) => {
        setSelectedStyle(value);
    };

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

    const connectedSocials = Object.entries(usernames).filter(([_, username]) => username.trim() !== '').length;

    const styleOptions = [
        { value: "flat", label: "Flat", description: "Clean and minimal" },
        { value: "flat-square", label: "Flat Square", description: "Modern squared edges" },
        { value: "plastic", label: "Plastic", description: "Glossy appearance" },
        { value: "for-the-badge", label: "For the Badge", description: "Bold and prominent" }
    ];

    return (
        <div className="w-full max-w-4xl bg-background p-4 rounded-lg mx-auto space-y-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                        <FaShare className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold tracking-tight">Social Media</h2>
                        <p className="text-sm text-muted-foreground">
                            Connect your social media profiles to showcase your online presence
                        </p>
                    </div>
                </div>
                {connectedSocials > 0 && (
                    <Badge variant="secondary" className="w-fit">
                        {connectedSocials} platform{connectedSocials !== 1 ? 's' : ''} connected
                    </Badge>
                )}
            </div>

            <Tabs defaultValue="select" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 h-auto">
                    <TabsTrigger 
                        value="select" 
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                        <FaUsers className="w-4 h-4" />
                        <span className="hidden sm:inline">Select Platforms</span>
                        <span className="sm:hidden">Select</span>
                    </TabsTrigger>
                    <TabsTrigger 
                        value="setting" 
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                        <FaCog className="w-4 h-4" />
                        <span className="hidden sm:inline">Customize</span>
                        <span className="sm:hidden">Settings</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="select" className="space-y-6 mt-6">
                    {/* Style Selection */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <FaPalette className="w-4 h-4 text-violet-600" />
                                <CardTitle className="text-base">Badge Style</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Choose your preferred style</Label>
                                <Select onValueChange={handleStyleChange} defaultValue="for-the-badge">
                                    <SelectTrigger className="w-full max-w-xs border-border/50 focus:border-border transition-colors">
                                        <SelectValue placeholder="Select Style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {styleOptions.map((style) => (
                                            <SelectItem key={style.value} value={style.value}>
                                                <div className="flex flex-col items-start ">
                                                    <span className="font-medium">{style.label}</span>
                                                    <span className="text-xs text-muted-foreground">{style.description}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Platforms */}
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-base">Available Platforms</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Enter your username for each platform you want to display
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {socialData.map((social) => {
                                    const hasUsername = usernames[social.id]?.trim();
                                    return (
                                        <Card 
                                            key={social.id} 
                                            className={`group relative border transition-all duration-200 hover:shadow-md ${
                                                hasUsername 
                                                    ? 'border-primary/20 bg-primary/5' 
                                                    : 'border-primary/10 hover:border-primary/30 hover:bg-primary/5'
                                            }`}
                                        >
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={`${social.url.split('?')[0]}?style=${selectedStyle}&${social.url.split('?')[1] || ''}`}
                                                            alt={social.label}
                                                            className="h-6 rounded"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Enter username"
                                                        value={usernames[social.id] || ''}
                                                        onChange={(e) => handleUsernameChange(social.id, e.target.value)}
                                                        className="border-border/50 focus:border-border/50 transition-colors"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value='setting' className="mt-6">
                    <Card className="shadow-md border-none">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FaCog className="w-4 h-4 text-orange-600" />
                                <CardTitle className="text-base">Advanced Settings</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Customize the appearance and layout of your social media section
                            </p>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Social