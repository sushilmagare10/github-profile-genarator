"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SkillsData } from '@/data/SkillsData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import useSkillsStore from '@/store/SkillStore';
import Setting from './Setting';
import { Button } from '../ui/button';

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
        { id: 'Layout-1', name: 'Layout-1' },
        { id: 'Layout-2', name: 'Layout-2' },
    ];

    return (
        <Tabs defaultValue="select" className='w-full  '>
            <TabsList className="grid w-full grid-cols-2 gap-4 rounded-lg h-12 px-2">
                <TabsTrigger value="select" className='rounded-lg border border-gray-300'>Select</TabsTrigger>
                <TabsTrigger value="setting" className='rounded-lg border border-gray-300'>Setting</TabsTrigger>
            </TabsList>

            <TabsContent value="select">

                <CardContent className=" flex justify-start items-center p-0 my-4 gap-4">
                    {layouts.map((layoutOption) => (
                        <Button
                            variant={isSelected(layoutOption.id) ? 'default' : 'outline'}
                            key={layoutOption.id}
                            onClick={() => setLayout(layoutOption.id as 'Layout-1' | 'Layout-2')}
                        >
                            {layoutOption.name}
                        </Button>
                    ))}
                </CardContent>

                <Card className='w-full p-4 flex flex-col border border-gray-200 rounded-lg shadow-sm'>
                    <CardTitle>Skills</CardTitle>
                    <CardContent className='p-0 mt-2'>
                        <div className='flex items-start flex-col md:flex-row md:items-center gap-4'>
                            <Select onValueChange={handleProviderChange} defaultValue="Devicons">
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select Provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Devicons">Dev Icons</SelectItem>
                                    <SelectItem value="shields.io">Shields.io</SelectItem>
                                    <SelectItem value="SkillsIcons">Skills Icons</SelectItem>
                                    <SelectItem value="simpleIcons">Simple Icons</SelectItem>
                                </SelectContent>
                            </Select>
                            {selectedProvider === 'shields.io' && (
                                <Select onValueChange={handleStyleChange} defaultValue="for-the-badge">
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
                        <Tabs defaultValue={categories[0]} className="mt-4 h-max" value={selectedCategory} onValueChange={handleCategoryChange}>
                            <TabsList className='w-full h-full grid grid-cols-2 sm:grid-cols-4 gap-2 py-4 px-2'>
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
                    <CardContent className='pb-10 md:p-0 mt-2 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                        {filteredSkills.length > 0 ? (
                            filteredSkills.map((skill) => (
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
                                                    loading='lazy'
                                                />
                                                <TooltipContent className='mb-2 text-primary w-full shadow-lg border font-semibold'>
                                                    <p>{skill.label}</p>
                                                </TooltipContent>
                                            </Card>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </TooltipProvider>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-4 text-gray-500">
                                No icons available for this category in the selected provider.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value='setting' className='w-full'>
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