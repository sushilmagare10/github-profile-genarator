"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SkillsData } from '@/data/SkillsData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import useSkillsStore from '@/store/SkillStore';
import Setting from './Setting';

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
    const {
        selectedProvider,
        selectedStyle,
        selectedCategory,
        icons: selectedIcons,
        iconHeight,
        gap,
        alignment,
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
        setSelectedCategory(categories[0]); // Reset category when provider changes
    };

    const handleCategoryChange = (value: any) => {
        setSelectedCategory(value);
    };

    const skills = SkillsData[selectedProvider as keyof typeof SkillsData] || {};
    const filteredSkills = skills[selectedCategory] || [];

    return (
        <Tabs defaultValue="select" className='w-full  '>
            <TabsList className="grid w-full grid-cols-2 gap-4 rounded-lg h-12 px-2">
                <TabsTrigger value="select" className='rounded-lg border border-gray-300'>Select</TabsTrigger>
                <TabsTrigger value="setting" className='rounded-lg border border-gray-300'>Setting</TabsTrigger>
            </TabsList>

            <TabsContent value="select">
                <Card className='w-full p-4 flex flex-col border border-gray-200 rounded-lg shadow-sm'>
                    <CardTitle>Skills</CardTitle>
                    <CardContent className='p-0'>
                        <div className='flex items-center gap-4'>
                            <Select onValueChange={handleProviderChange} defaultValue="shields.io">
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select Provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="shields.io">Shields.io</SelectItem>
                                    <SelectItem value="simpleIcons">Simple Icons</SelectItem>
                                    <SelectItem value="SkillsIcons">Skills Icons</SelectItem>
                                    <SelectItem value="GitHub">Github Icons</SelectItem>
                                </SelectContent>
                            </Select>
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
                        </div>
                        <Tabs defaultValue={categories[0]} className="mt-4 h-max" value={selectedCategory} onValueChange={handleCategoryChange}>
                            <TabsList className='w-full h-full grid grid-cols-4 gap-2 py-4 px-2'>
                                {categories.map(category => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        className='rounded-lg border border-white text-xs h-8 '
                                    >
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </CardContent>
                    <CardContent className='p-0 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {filteredSkills.map((skill) => (
                            <TooltipProvider key={skill.id}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Card
                                            key={skill.id}
                                            className='flex flex-col justify-center items-center p-2 h-20 cursor-pointer shadow-md'
                                            onClick={() => addIcon(skill)}
                                        >
                                            <img
                                                src={selectedProvider === 'shields.io' ? `${skill.url.split('?')[0]}?style=${selectedStyle}&${skill.url.split('?')[1] || ''}` : skill.url}
                                                alt={skill.label}
                                                className='min-w-16 min-h-7 rounded-md'
                                                style={{ height: iconHeight }}

                                            />
                                            <TooltipContent className='mb-2 text-primary w-full shadow-lg border font-semibold'>
                                                <p>{skill.label}</p>
                                            </TooltipContent>
                                        </Card>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
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
                    title="Edit Skills Settings"
                />
            </TabsContent>
        </Tabs>
    );
};
export default Skills