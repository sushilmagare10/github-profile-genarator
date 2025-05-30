"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SkillsData } from '@/data/SkillsData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import useSkillsStore from '@/store/SkillStore';
import Setting from './Setting';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { FaCog, FaCode, FaPalette, FaLayerGroup } from 'react-icons/fa';

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
    "Automation",
    "Baas"
];

const Skills = () => {
    const {
        selectedProvider,
        selectedStyle,
        selectedCategory,
        icons: selectedIcons,
        iconHeight,
        alignment,
        layout,
        setLayout,
        addIcon,
        setSelectedProvider,
        setSelectedStyle,
        setSelectedCategory,
        setIcons,
        removeIcon,
        setIconHeight,
        setGap,
        setAlignment
    } = useSkillsStore();

    const handleStyleChange = (value: any) => {
        setSelectedStyle(value);
    };

    const handleProviderChange = (value: any) => {
        setSelectedProvider(value);
        setSelectedCategory(categories[0]);
    };

    const handleCategoryChange = (value: any) => {
        setSelectedCategory(value);
    };

    const filteredSkills = useMemo(() => {
        const skills = SkillsData[selectedProvider as keyof typeof SkillsData] || {};
        return skills[selectedCategory as keyof typeof skills] || [];
    }, [selectedProvider, selectedCategory]);

    const isSelected = (layoutId: string) => {
        return layout === layoutId || (!layout && layoutId === 'Layout-1');
    };

    const layouts = [
        { id: 'Layout-1', name: 'Layout 1', description: 'Standard' },
        { id: 'Layout-2', name: 'Layout 2', description: 'Grid' },
    ];

    const providerOptions = [
        { value: "Devicons", label: "Dev Icons", description: "Development focused icons" },
        { value: "shields.io", label: "Shields.io", description: "Badge-style icons" },
        { value: "SkillsIcons", label: "Skills Icons", description: "Skill-specific icons" },
        { value: "simpleIcons", label: "Simple Icons", description: "Minimalist brand icons" }
    ];

    const styleOptions = [
        { value: "flat", label: "Flat", description: "Clean and minimal" },
        { value: "flat-square", label: "Flat Square", description: "Modern squared edges" },
        { value: "plastic", label: "Plastic", description: "Glossy appearance" },
        { value: "for-the-badge", label: "For the Badge", description: "Bold and prominent" }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                        <FaCode className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold tracking-tight">Skills & Technologies</h2>
                        <p className="text-sm text-muted-foreground">
                            Showcase your technical skills and expertise
                        </p>
                    </div>
                </div>
                {selectedIcons.length > 0 && (
                    <Badge variant="secondary" className="w-fit">
                        {selectedIcons.length} skill{selectedIcons.length !== 1 ? 's' : ''} selected
                    </Badge>
                )}
            </div>

            <Tabs defaultValue="select" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 h-auto">
                    <TabsTrigger 
                        value="select" 
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                    >
                        <FaCode className="w-4 h-4" />
                        <span className="hidden sm:inline">Select Skills</span>
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

                <TabsContent value="select" className="mb-4 ">
                    {/* Layout Selection */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <FaLayerGroup className="w-4 h-4 text-blue-600" />
                                <CardTitle className="text-base">Layout Style</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Choose your preferred layout</Label>
                                <div className="flex gap-2">
                                    {layouts.map((layoutOption) => (
                                        <Button
                                            key={layoutOption.id}
                                            variant={isSelected(layoutOption.id) ? 'default' : 'outline'}
                                            onClick={() => setLayout(layoutOption.id as 'Layout-1' | 'Layout-2')}
                                            className="flex-1 max-w-xs"
                                        >
                                            <div className="flex flex-col items-center">
                                                <span className="font-medium">{layoutOption.name}</span>
                                                <span className="text-xs opacity-70">{layoutOption.description}</span>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Provider and Style Selection */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <FaPalette className="w-4 h-4 text-violet-600" />
                                <CardTitle className="text-base">Icon Configuration</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Icon Provider</Label>
                                    <Select onValueChange={handleProviderChange} defaultValue="Devicons">
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select Provider" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {providerOptions.map((provider) => (
                                                <SelectItem key={provider.value} value={provider.value}>
                                                    <div className="flex flex-col items-start">
                                                        <span className="font-medium">{provider.label}</span>
                                                        <span className="text-xs text-muted-foreground">{provider.description}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                {selectedProvider === 'shields.io' && (
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Badge Style</Label>
                                        <Select onValueChange={handleStyleChange} defaultValue="for-the-badge">
                                            <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                                <SelectValue placeholder="Select Style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {styleOptions.map((style) => (
                                                    <SelectItem key={style.value} value={style.value}>
                                                        <div className="flex flex-col items-start">
                                                            <span className="font-medium">{style.label}</span>
                                                            <span className="text-xs text-muted-foreground">{style.description}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Tabs */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">Skill Categories</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Browse skills by category and click to add them to your profile
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Tabs 
                                value={selectedCategory} 
                                onValueChange={handleCategoryChange} 
                                className="w-full"
                            >
                                <TabsList className="w-full h-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-1 p-1 bg-muted/30">
                                    {categories.map(category => (
                                        <TabsTrigger
                                            key={category}
                                            value={category}
                                            className="text-xs px-2 py-1.5 h-auto data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                                        >
                                            {category}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 min-h-[30vh]">
                                {filteredSkills.length > 0 ? (
                                    filteredSkills.map((skill) => {
                                        const isSkillSelected = selectedIcons.some(icon => icon.id === skill.id);
                                        return (
                                            <TooltipProvider key={skill.id}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Card
                                                            className={`flex flex-col justify-center items-center p-2 h-20 cursor-pointer shadow-sm transition-all duration-200 
                                                                ${isSkillSelected 
                                                                    ? 'border-primary/20 bg-primary/5' 
                                                                    : 'border-primary/10 hover:border-primary/30 hover:bg-primary/5'}`}
                                                            onClick={() => isSkillSelected ? removeIcon(skill.id) : addIcon(skill)}
                                                        >
                                                            <img
                                                                src={selectedProvider === 'shields.io' ? `${skill.url.split('?')[0]}?style=${selectedStyle}&${skill.url.split('?')[1] || ''}` : skill.url}
                                                                alt={skill.label}
                                                                className='h-7 w-auto object-contain rounded-md' // Adjusted image sizing
                                                                loading='lazy'
                                                                style={{ height: iconHeight }}
                                                            />
                                                            <span className="text-xs mt-2 font-medium text-center truncate w-full px-1">{skill.label}</span>
                                                        </Card>
                                                    </TooltipTrigger>
                                                    <TooltipContent className='mb-2 text-primary shadow-lg border font-semibold'>
                                                        <p>{skill.label}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full text-center py-4 text-muted-foreground">
                                        No icons available for this category in the selected provider.
                                    </div>
                                )}
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="setting" className="mt-6">
                    <Card className="shadow-md border-none">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FaCog className="w-4 h-4 text-orange-600" />
                                <CardTitle className="text-base">Advanced Settings</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Customize the appearance and layout of your skills section
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Setting
                                icons={selectedIcons}
                                sectionStyle={alignment}
                                setGap={setGap}
                                setSectionStyle={setAlignment}
                                setIconHeight={setIconHeight}
                                setIcons={setIcons}
                                removeIcon={removeIcon}
                                title="Edit Skills Settings"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Skills;