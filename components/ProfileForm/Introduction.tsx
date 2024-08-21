"use client";

import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import useIntroductionStore from '@/store/IntroStore';
import { motion } from 'framer-motion';
import { FaImage, FaUser, FaInfoCircle, FaTasks } from 'react-icons/fa';
import StyleOptions from './StyleOptions';

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
    } = useIntroductionStore();

    return (
        <Card className='w-full p-4 flex flex-col border border-gray-200 rounded-lg shadow-sm'>
            <div className='space-y-8'>
                <ToggleableSection
                    title="Add Header Image"
                    icon={<FaImage className="text-blue-600 text-xl" />}
                    isVisible={visibleFields.headerImage}
                    onToggle={() => toggleField('headerImage')}
                >
                    <Card className='w-full border border-gray-300 rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">Image URL</CardHeader>
                        <CardContent>
                            <Input
                                placeholder='https://example.com/image.jpg'
                                type='url'
                                value={headerImage}
                                onChange={(e) => setHeaderImage(e.target.value)}
                                className="w-full rounded-md shadow-sm "
                            />
                        </CardContent>
                    </Card>
                </ToggleableSection>

                <ToggleableSection
                    title="Add Introduction"
                    icon={<FaUser className="text-green-600 text-xl" />}
                    isVisible={visibleFields.introduction}
                    onToggle={() => toggleField('introduction')}
                >
                    <Card className='w-full  rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">Hi, my name is</CardHeader>
                        <CardContent>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full border-gray-300 rounded-md shadow-sm "
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
                    icon={<FaInfoCircle className="text-purple-600 text-xl" />}
                    isVisible={visibleFields.aboutMe}
                    onToggle={() => toggleField('aboutMe')}
                >
                    <Card className='w-full border border-gray-300 rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">About me</CardHeader>
                        <CardContent>
                            <Input
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                placeholder="Tell us about yourself"
                                className="w-full border-gray-300 rounded-md shadow-sm "
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
                    icon={<FaTasks className="text-orange-600 text-xl" />}
                    isVisible={visibleFields.currentlyDoing}
                    onToggle={() => toggleField('currentlyDoing')}
                >
                    <Card className='w-full border border-gray-300 h-full rounded-md shadow-sm '>
                        <CardContent className='space-y-4 mt-4'>
                            <Input
                                value={currentlyDoing.learning}
                                onChange={(e) => setCurrentlyDoing('learning', e.target.value)}
                                placeholder="🌱 I'm currently learning"
                                className="w-full border-gray-300 rounded-md shadow-sm "
                            />
                            <Input
                                value={currentlyDoing.askMeAbout}
                                onChange={(e) => setCurrentlyDoing('askMeAbout', e.target.value)}
                                placeholder="❓ Ask me about anything related"
                                className="w-full border-gray-300 rounded-md shadow-sm "
                            />
                            <Input
                                value={currentlyDoing.funFact}
                                onChange={(e) => setCurrentlyDoing('funFact', e.target.value)}
                                placeholder="⚡ Fun fact: "
                                className="w-full border-gray-300 rounded-md shadow-sm "
                            />
                        </CardContent>
                    </Card>
                </ToggleableSection>
            </div>
        </Card>
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
    <div className='w-full'>
        <div className='flex items-center space-x-3 mb-4'>
            <Checkbox
                checked={isVisible}
                onCheckedChange={onToggle}
                className="h-5 w-5 text-blue-600 rounded-sm"
            />
            <Label className="text-xl font-semibold flex items-center space-x-2 ">
                {icon}
                <span>{title}</span>
            </Label>
        </div>
        {isVisible && (
            <>
                {children}
            </>
        )}
    </div>
)

export default Introduction;
