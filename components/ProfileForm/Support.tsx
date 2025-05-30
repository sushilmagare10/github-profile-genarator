"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { SupportData } from '@/data/SupportData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Setting from './Setting'
import useSupportStore from '@/store/SupportStore'
import { Badge } from '../ui/badge'
import { FaCoins, FaCog, FaPalette } from 'react-icons/fa' // Importing appropriate icons
import { Check } from 'lucide-react'

type Usernames = {
    [id: string]: string;
};

const Support = () => {
    const [usernames, setUsernames] = useState<Usernames>({});

    const handleStyleChange = (value: string) => {
        setSelectedStyle(value)
    }

    const handleUsernameChange = (id: string, value: string) => {
        setUsernames(prev => ({ ...prev, [id]: value }));
    };

    const supportMeData = useMemo(() => SupportData.shieldIcons || [], [])

    const {
        alignment,
        icons: selectedIcons,
        selectedStyle,
        addIcon,
        setAlignment,
        removeIcon,
        setGap,
        setIconHeight,
        setIcons,
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

    const connectedSupportPlatforms = Object.entries(usernames).filter(([_, username]) => username.trim() !== '').length;

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
                        <FaCoins className="w-4 h-4 text-yellow-600" /> {/* Changed icon to FaCoins for support */}
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold tracking-tight">Support Me</h2>
                        <p className="text-sm text-muted-foreground">
                            Encourage contributions by linking your support platforms
                        </p>
                    </div>
                </div>
                {connectedSupportPlatforms > 0 && (
                    <Badge variant="secondary" className="w-fit">
                        {connectedSupportPlatforms} platform{connectedSupportPlatforms !== 1 ? 's' : ''} connected
                    </Badge>
                )}
            </div>

            <Tabs defaultValue='select' className='w-full'>
                <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 h-auto">
                    <TabsTrigger
                        value="select"
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                        <FaCoins className="w-4 h-4" />
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

                <TabsContent value='select' className="space-y-6 h-full mt-6">
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

                    {/* Support Platforms */}
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle className="text-base">Available Support Platforms</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Enter your username for each platform you want to display
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {supportMeData.map((support) => {
                                    const hasUsername = usernames[support.id]?.trim();
                                    return (
                                        <Card
                                            key={support.id}
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
                                                            src={`${support.url.split('?')[0]}?style=${selectedStyle}&${support.url.split('?')[1] || ''}`}
                                                            alt={support.label}
                                                            className="h-6 rounded"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Enter username"
                                                        value={usernames[support.id] || ''}
                                                        onChange={(e) => handleUsernameChange(support.id, e.target.value)}
                                                        className="border-border/50 focus:border-border transition-colors"
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

                <TabsContent value='setting' className="mt-6 pb-6">
                    <Card className="shadow-md border-none">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FaCog className="w-4 h-4 text-orange-600" />
                                <CardTitle className="text-base">Advanced Settings</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Customize the appearance and layout of your support section
                            </p>
                        </CardHeader>
                        <CardContent className='py-6'>
                            <Setting
                                icons={selectedIcons}
                                sectionStyle={alignment}
                                setGap={setGap}
                                setSectionStyle={setAlignment}
                                setIconHeight={setIconHeight}
                                setIcons={setIcons}
                                removeIcon={removeIcon}
                                title='Edit Support Settings'
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Support