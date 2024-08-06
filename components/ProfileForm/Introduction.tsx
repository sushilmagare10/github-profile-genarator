"use client"

import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import useIntroductionStore from '@/store/IntroStore'
import { motion } from 'framer-motion'
import { FaImage, FaUser, FaInfoCircle, FaTasks } from 'react-icons/fa'
import StyleOptions from './StyleOptions'
import { title } from 'process'

const Introduction = () => {
    const {
        headerImage,
        name,
        aboutMe,
        currentlyDoing,
        visibleFields,
        fieldStyles,
        setFieldStyle,
        setHeaderImage,
        setName,
        setAboutMe,
        setCurrentlyDoing,
        toggleField,
    } = useIntroductionStore()

    return (
        <div className='w-full'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col justify-center items-center w-full gap-6'
            >
                <ToggleableSection
                    title="Add Header Image"
                    icon={<FaImage />}
                    isVisible={visibleFields.headerImage}
                    onToggle={() => toggleField('headerImage')}
                >
                    <Card className='w-full hover:shadow-lg transition-shadow duration-300'>
                        <CardHeader>Image URL</CardHeader>
                        <CardContent>
                            <Input
                                placeholder='https://example.com/image.jpg'
                                type='url'
                                value={headerImage}
                                onChange={(e) => setHeaderImage(e.target.value)}
                            />
                        </CardContent>
                    </Card>
                    {/* <StyleOptions
                        sectionName="Header Image"
                        style={fieldStyles.headerImage}
                        onStyleChange={(style) => setFieldStyle('headerImage', style)}
                    /> */}
                </ToggleableSection>

                <ToggleableSection
                    title="Add Introduction"
                    icon={<FaUser />}
                    isVisible={visibleFields.introduction}
                    onToggle={() => toggleField('introduction')}
                >
                    <Card className='w-full hover:shadow-lg transition-shadow duration-300'>
                        <CardHeader>Hi, my name is</CardHeader>
                        <CardContent>
                            <Input
                                placeholder='John Doe'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CardContent>
                    </Card>
                    <StyleOptions
                        sectionName="Introduction"
                        style={fieldStyles.name}
                        onStyleChange={(style) => setFieldStyle('name', style)}
                    />
                </ToggleableSection>

                <ToggleableSection
                    title="Add About Me"
                    icon={<FaInfoCircle />}
                    isVisible={visibleFields.aboutMe}
                    onToggle={() => toggleField('aboutMe')}
                >
                    <Card className='w-full hover:shadow-lg transition-shadow duration-300'>
                        <CardHeader>About me</CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder='Tell us about yourself'
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                className='min-h-[100px]'
                            />
                        </CardContent>
                    </Card>
                    <StyleOptions
                        sectionName="About Me"
                        style={fieldStyles.aboutMe}
                        onStyleChange={(style) => setFieldStyle('aboutMe', style)}
                    />
                </ToggleableSection>

                <ToggleableSection
                    title="Add Currently Doing"
                    icon={<FaTasks />}
                    isVisible={visibleFields.currentlyDoing}
                    onToggle={() => toggleField('currentlyDoing')}
                >
                    <Card className='w-full hover:shadow-lg transition-shadow duration-300'>
                        <CardContent className='space-y-4 mt-4'>
                            <Input
                                placeholder='🌱 I&apos;m currently learning'
                                value={currentlyDoing.learning}
                                onChange={(e) => setCurrentlyDoing('learning', e.target.value)}
                            />

                            <Input
                                placeholder='❓ Ask me about anything related'
                                value={currentlyDoing.askMeAbout}
                                onChange={(e) => setCurrentlyDoing('askMeAbout', e.target.value)}
                            />

                            <Input
                                placeholder='⚡ Fun fact: '
                                value={currentlyDoing.funFact}
                                onChange={(e) => setCurrentlyDoing('funFact', e.target.value)}
                            />
                        </CardContent>
                    </Card>
                    {/* <StyleOptions
                        sectionName="Currently Doing"
                        style={fieldStyles.currentlyDoing}
                        onStyleChange={(style) => setFieldStyle('currentlyDoing', style)}
                    /> */}
                </ToggleableSection>
            </motion.div>
        </div>
    )
}

type ToggleableSectionType = {
    title: string;
    icon: ReactNode;
    isVisible: boolean;
    onToggle: () => void;
    children: ReactNode;
};

const ToggleableSection = ({ title, icon, isVisible, onToggle, children }: ToggleableSectionType) => (
    <div className='space-y-4 w-full'>
        <div className='flex items-center space-x-2'>
            <Checkbox
                checked={isVisible}
                onCheckedChange={onToggle}
                className="h-5 w-5"
            />
            <Label className="text-lg font-semibold flex items-center space-x-2">
                {icon}
                <span>{title}</span>
            </Label>
        </div>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        )}
    </div>
)

export default Introduction
