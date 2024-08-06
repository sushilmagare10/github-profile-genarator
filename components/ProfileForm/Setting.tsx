"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import useSocialStore from '@/store/SocialStore'
import { motion, Reorder, useDragControls } from "framer-motion"


const Setting = () => {


    const {
        icons,
        sectionStyle,
        setGap,
        setSectionStyle,
        setIconHeight,
        setIcons,
        removeIcon
    } = useSocialStore()

    return (
        <Card className=' w-full p-0 flex flex-col border-none gap-4'>
            <CardContent className='flex flex-col w-full gap-y-4 p-0'>
                <CardTitle className='mt-4'>Edit</CardTitle>
                <div className='flex justify-between -mt-1'>
                    <div className='flex flex-col'>
                        <h3 className='mt-2 font-semibold'>Alignment</h3>
                        <div className='flex items-center gap-4 mt-2'>
                            <Button
                                className='px-6 h-8'
                                onClick={() => setSectionStyle('left')}
                                variant={sectionStyle === "left" ? 'default' : 'outline'}

                            >
                                Left
                            </Button>
                            <Button
                                className='px-6 h-8'
                                onClick={() => setSectionStyle('center')}
                                variant={sectionStyle === "center" ? 'default' : 'outline'}

                            >
                                Center
                            </Button>
                            <Button
                                className='px-6 h-8'
                                onClick={() => setSectionStyle('right')}
                                variant={sectionStyle === "right" ? 'default' : 'outline'}
                            >
                                Right
                            </Button>
                        </div>

                        <h3 className='mt-4 font-semibold'>Icon Style</h3>

                        <div className=' flex justify-between items-center gap-x-3'>
                            <div className='flex flex-col gpa-3 mt-3'>
                                <h3 className='mt-2 font-semibold'>Height</h3>
                                <Select onValueChange={(value) => setIconHeight(value)} defaultValue="sm">
                                    <SelectTrigger className="w-[200px] mt-2">
                                        <SelectValue placeholder="Select Height" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="xs">xs</SelectItem>
                                        <SelectItem value="sm">sm</SelectItem>
                                        <SelectItem value="md">md</SelectItem>
                                        <SelectItem value="lg">lg</SelectItem>
                                        <SelectItem value="xl">xl</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col gpa-3 mt-3'>
                                <h3 className='mt-2 font-semibold'>Gap</h3>

                                <Select onValueChange={(value) => setGap(value)} defaultValue="sm">
                                    <SelectTrigger className="w-[200px] mt-2">
                                        <SelectValue placeholder="Select Gap" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="xs">xs</SelectItem>
                                        <SelectItem value="sm">sm</SelectItem>
                                        <SelectItem value="md">md</SelectItem>
                                        <SelectItem value="lg">lg</SelectItem>
                                        <SelectItem value="xl">xl</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex items-center '>
                    <CardTitle className='mt-4'>Selected Social Media</CardTitle>
                    <CardHeader className='mt-4 text-xs p-2'>Drag to Rearrange</CardHeader>
                </div>

                <Card className='w-full h-full flex flex-col gap-2 p-2 flex-wrap'>
                    <Reorder.Group key={icons} values={icons} onReorder={setIcons}>
                        {icons.map(icon => (
                            <Reorder.Item
                                value={icon}
                                key={icon.id}
                                className='py-2'
                            >
                                <motion.div
                                    key={icon.id}
                                    className=' w-full flex justify-between items-center border border-black/20 cursor-grabbing rounded-md p-2 shadow-ls'
                                    style={{ userSelect: 'none' }}
                                >
                                    <img
                                        src={icon.url}
                                        alt={icon.id}
                                        className='h-8 '
                                    />
                                    <span
                                        className='  rounded-full text-xs cursor-pointer font-bold text-red-600 flex justify-center items-center'
                                        onClick={(e) => removeIcon(icon.id)}
                                    >
                                        Remove
                                    </span>
                                </motion.div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </Card>
            </CardContent></Card>
    )
}

export default Setting