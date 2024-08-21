"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion, Reorder } from "framer-motion";

const Setting = ({
    icons,
    sectionStyle,
    setGap,
    setSectionStyle,
    setIconHeight,
    setIcons,
    removeIcon,
    gapOptions = ["xs", "sm", "md", "lg", "xl"],
    heightOptions = ["xs", "sm", "md", "lg", "xl"],
    alignmentOptions = ["left", "center", "right"],
    title = "Edit"
}) => {

    const isEmpty = icons && icons.length === 0;

    return (
        <Card className='w-full p-4 flex flex-col border border-gray-200 rounded-lg shadow-sm'>
            <CardHeader className='p-0'>
                <CardTitle className='text-lg font-semibold text-gray-800'>{title}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col w-full gap-y-6 mt-4'>
                <div className='flex justify-between -mt-1'>
                    <div className='flex flex-col'>
                        <h3 className='font-medium text-gray-700'>Alignment</h3>
                        <div className='flex items-center gap-2 mt-2'>
                            {alignmentOptions.map(option => (
                                <Button
                                    key={option}
                                    className='px-6 py-2 text-sm rounded-md'
                                    variant={`${sectionStyle === option ? 'default' : 'outline'}`}
                                    onClick={() => setSectionStyle(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gpa-3 '>
                        <h3 className='font-medium text-gray-700'>Icon Style</h3>
                        <div className='flex items-center gap-x-4 mt-2'>
                            <div className='flex flex-col'>
                                <label className='text-sm font-semibold text-gray-600 mb-1'>Height</label>
                                <Select onValueChange={(value) => setIconHeight(value)} defaultValue="sm">
                                    <SelectTrigger className="w-[150px] bg-gray-100 border border-gray-300 rounded-md">
                                        <SelectValue placeholder="Select Height" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {heightOptions.map(option => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm font-semibold text-gray-600 mb-1'>Gap</label>
                                <Select onValueChange={(value) => setGap(value)} defaultValue="sm">
                                    <SelectTrigger className="w-[150px] bg-gray-100 border border-gray-300 rounded-md">
                                        <SelectValue placeholder="Select Gap" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {gapOptions.map(option => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col mt-4'>
                    <div className='flex justify-between items-center'>
                        <CardTitle className='text-lg font-semibold text-gray-800'>Selected Items</CardTitle>
                        <CardHeader className='text-xs text-gray-500'>Drag to Rearrange</CardHeader>
                    </div>

                    <Card className='w-full flex flex-col gap-4 mt-4 p-4 bg-gray-50 border border-gray-200 cursor-grab rounded-md'>
                        <Reorder.Group values={icons} onReorder={(newOrder) => setIcons(newOrder)}>
                            {isEmpty ? (
                                <div className='flex flex-col justify-center items-center w-full h-20 border border-gray-300 text-gray-500 cursor-default rounded-md'>
                                    List is Empty!
                                </div>
                            ) : (
                                <Reorder.Group values={icons} onReorder={(newOrder) => setIcons(newOrder)}>
                                    {icons.map(icon => (
                                        <Reorder.Item
                                            value={icon}
                                            key={icon.id}
                                            className='py-2'
                                        >
                                            <motion.div
                                                className='w-full flex justify-between items-center border border-gray-300 bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300'
                                                style={{ userSelect: 'none' }}
                                            >
                                                <img
                                                    src={icon.url}
                                                    alt={icon.id}
                                                    className='h-8'
                                                />
                                                <span
                                                    className='text-xs font-semibold text-red-500 cursor-pointer'
                                                    onClick={() => removeIcon(icon.id)}
                                                >
                                                    Remove
                                                </span>
                                            </motion.div>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            )}
                        </Reorder.Group>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}

export default Setting;
