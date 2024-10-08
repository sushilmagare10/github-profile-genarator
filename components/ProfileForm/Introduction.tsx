"use client";

import React, { ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useIntroductionStore from '@/store/IntroStore';
import { FaImage, FaUser, FaInfoCircle, FaTasks, FaEye } from 'react-icons/fa';
import StyleOptions from './StyleOptions';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Textarea } from '../ui/textarea';
import { Banners } from '@/data/IntroData';


type EmojiFieldType = 'name' | 'aboutMe' | 'learning' | 'askMeAbout' | 'funFact' | 'portfolio' | 'blog' | 'working';

const Introduction = () => {
    const {
        headerImage,
        name,
        aboutMe,
        currentlyDoing,
        fieldStyles,
        profileViews,
        setProfileViews,
        setFieldStyle,
        setHeaderImage,
        setName,
        setAboutMe,
        setCurrentlyDoing,
    } = useIntroductionStore();

    const [activeEmojiField, setActiveEmojiField] = useState<EmojiFieldType | null>(null);

    const toggleEmoji = (field: EmojiFieldType) => {
        setActiveEmojiField(prev => prev === field ? null : field);
    };

    const addEmoji = (emoji: { native: string }) => {
        switch (activeEmojiField) {
            case 'name':
                setName(name + emoji.native);
                break;
            case 'aboutMe':
                setAboutMe(aboutMe + emoji.native);
                break;
            case 'learning':
            case 'askMeAbout':
            case 'funFact':
            case 'portfolio':
            case 'blog':
            case 'working':
                setCurrentlyDoing(activeEmojiField, currentlyDoing[activeEmojiField] + emoji.native);
                break;
        }
    };

    const renderInput = (value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, placeholder: string, field: EmojiFieldType) => (
        <div className='flex justify-center items-center gap-2 relative'>
            {field === 'aboutMe' ? (
                <Textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    rows={5}
                />
            ) : (
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                />
            )}
            <div className='flex flex-col gap-1 self-start justify-between'>
                <div className='text-2xl  cursor-pointer' onClick={() => toggleEmoji(field)} >
                    🙂
                </div>
                {activeEmojiField === field && (
                    <CardContent className='z-30 absolute top-10 right-7 md:right-6'>
                        <Picker
                            data={data}
                            emojiSize={20}
                            onEmojiSelect={addEmoji}
                            maxFrequentRows={2}
                        />
                    </CardContent>
                )}
            </div>
        </div>
    );

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown(prev => prev === dropdown ? null : dropdown);
    };

    const handleBannerSelect = (banner: string, setter: (banner: string) => void) => {
        setOpenDropdown(null);
        setter(banner);
    };


    const renderBannerOptions = (banners: (string | undefined)[], handleSelect: (banner: string) => void, dropdownKey: string) => (
        <CardContent className='p-0'>
            <div className="relative">
                <button
                    onClick={() => toggleDropdown(dropdownKey)}
                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left"
                >
                    Select a banner
                </button>
                {openDropdown === dropdownKey && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-h-96 scrollbar-hide dropdown">
                            {banners.map((item: string | undefined, index: number) => (
                                item ? (
                                    <div key={index} onClick={() => handleSelect(item)} className="cursor-pointer flex flex-col items-center">
                                        <img
                                            src={item}
                                            alt={`Banner ${index + 1}`}
                                            className="w-48 h-24 object-cover rounded-md"
                                            loading="lazy"
                                            width="192"
                                            height="96"
                                        />
                                    </div>
                                ) : null
                            ))}

                        </div>
                    </div>
                )}
            </div>
        </CardContent>
    );


    return (
        <Card className='w-full h-full flex flex-col border-none'>
            <div className='space-y-8 h-max pb-40 lg:pb-4'>
                <Section
                    title="Add Header Image"
                    icon={<FaImage className="text-blue-600 text-xl" />}
                >
                    <div className=' w-full flex justify-between items-center mb-2'>
                        <span className='flex flex-col md:flex-row justify-between items-center gap-2'>To create custom Header use this
                            <Link
                                href='https://leviarista.github.io/github-profile-header-generator'
                                target='_blank'
                                className='text-blue-600 font-semibold capitalize'
                            >
                                github profile header generator
                            </Link>
                        </span>
                        <div className='w-5 h-5 mb-1 flex justify-center items-center rounded-full bg-secondary border'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span className='font-bold text-gray-500'>?</span>
                                    </TooltipTrigger>
                                    <TooltipContent className='w-60'>
                                        After crafting your custom header, incorporate the image directly into your README file for optimal presentation.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <Card className='w-full border border-gray-300 rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">Image URL</CardHeader>
                        <CardContent>
                            {renderBannerOptions(Banners, setHeaderImage, 'headerBanner')}
                        </CardContent>
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
                </Section>
                <Section
                    title="Add Profile Views Counter"
                    icon={<FaEye className="text-teal-600 text-xl" />}
                >
                    <Card className='w-full border border-gray-300 rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">GitHub Username for Profile Views</CardHeader>
                        <CardContent>
                            <Input
                                placeholder='Your GitHub username'
                                value={profileViews}
                                onChange={(e) => setProfileViews(e.target.value)}
                                className="w-full rounded-md shadow-sm "
                            />
                            {profileViews && (
                                <div className="mt-4">
                                    <p>Preview:</p>
                                    <img
                                        src={`https://komarev.com/ghpvc/?username=${profileViews}&label=Profile%20views&color=0e75b6&style=flat`}
                                        alt="Profile views counter"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Section>
                <Section
                    title="Add Introduction"
                    icon={<FaUser className="text-green-600 text-xl" />}
                >
                    <Card className='w-full  rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">Hi, my name is</CardHeader>
                        <CardContent>
                            {renderInput(name, (e) => setName(e.target.value), "John Doe", 'name')}
                        </CardContent>
                    </Card>
                    <StyleOptions
                        sectionName="Introduction"
                        style={fieldStyles.name}
                        onStyleChange={(style) => setFieldStyle('name', style)}
                    />
                </Section>
                <Section
                    title="Add About Me"
                    icon={<FaInfoCircle className="text-purple-600 text-xl" />}
                >
                    <Card className='w-full border border-gray-300 rounded-md shadow-sm '>
                        <CardHeader className="text-lg font-semibold ">About me</CardHeader>
                        <CardContent>
                            {renderInput(aboutMe, (e) => setAboutMe(e.target.value), "Tell us about yourself", 'aboutMe')}
                        </CardContent>
                    </Card>
                    <StyleOptions
                        sectionName="About Me"
                        style={fieldStyles.aboutMe}
                        onStyleChange={(style) => setFieldStyle('aboutMe', style)}
                    />
                </Section>

                <Section
                    title="Add Currently Doing"
                    icon={<FaTasks className="text-orange-600 text-xl" />}
                >
                    <Card className='w-full border border-gray-300 h-full rounded-md shadow-sm '>
                        <CardContent className='space-y-4 mt-4'>
                            {renderInput(currentlyDoing.working, (e) => setCurrentlyDoing('working', e.target.value), "💼 I'm currently working on", 'working')}
                            {renderInput(currentlyDoing.learning, (e) => setCurrentlyDoing('learning', e.target.value), "🌱 I'm currently learning", 'learning')}
                            {renderInput(currentlyDoing.askMeAbout, (e) => setCurrentlyDoing('askMeAbout', e.target.value), "💬 Ask me about anything related to", 'askMeAbout')}
                            {renderInput(currentlyDoing.funFact, (e) => setCurrentlyDoing('funFact', e.target.value), "⚡ Fun fact: ", 'funFact')}
                            {renderInput(currentlyDoing.portfolio, (e) => setCurrentlyDoing('portfolio', e.target.value), "📂 Check out my portfolio: ", 'portfolio')}
                            {renderInput(currentlyDoing.blog, (e) => setCurrentlyDoing('blog', e.target.value), "📝 Read my blog: ", 'blog')}
                        </CardContent>
                    </Card>
                </Section>
            </div>
        </Card>
    )
}

type SectionType = {
    title: string;
    icon: ReactNode;
    children: ReactNode;
};

const Section = React.memo(({ title, icon, children }: SectionType) => (
    <div className='w-full'>
        <div className='flex items-center space-x-3 mb-4'>
            <Label className="text-xl font-semibold flex items-center space-x-2 ">
                {icon}
                <span>{title}</span>
            </Label>
        </div>
        {children}
    </div>
));

Section.displayName = 'Section';

export default Introduction;