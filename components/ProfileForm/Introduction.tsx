"use client";

import React, { ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useIntroductionStore from '@/store/IntroStore';
import { FaImage, FaUser, FaInfoCircle, FaTasks, FaEye, FaSmile, FaChevronDown } from 'react-icons/fa';
import StyleOptions from './StyleOptions';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import Link from 'next/link';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Banners } from '@/data/IntroData';
import { useTheme } from 'next-themes';

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
    const { theme, systemTheme } = useTheme()
    const currentTheme = theme === 'system' ? systemTheme : theme

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
        <div className='relative group'>
            <div className='flex items-center gap-3'>
                {field === 'aboutMe' ? (
                    <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="flex-1 border-border/50 focus:border-border transition-colors resize-none"
                        rows={4}
                    />
                ) : (
                    <Input
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="flex-1 border-border/50 focus:border-border transition-colors"
                    />
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleEmoji(field)}
                    className="h-10 w-10 p-0 shrink-0 hover:bg-accent/50 transition-colors"
                >
                    <FaSmile className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
            {activeEmojiField === field && (
                <div className='absolute bottom-16 right-0 z-50 bg-background border rounded-lg shadow-lg'>
                    <Picker
                        
                        data={data}
                        emojiSize={20}
                        onEmojiSelect={addEmoji}
                        maxFrequentRows={2}
                        theme={currentTheme === "dark" ? 'dark' : "light"}
                    />
                </div>
            )}
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
        <div className="space-y-4">
            <div className="relative">
                <Button
                    variant="outline"
                    onClick={() => toggleDropdown(dropdownKey)}
                    className="w-full justify-between h-11 text-muted-foreground hover:text-foreground transition-colors"
                >
                    Select a banner template
                    <FaChevronDown className={`h-4 w-4 transition-transform ${openDropdown === dropdownKey ? 'rotate-180' : ''}`} />
                </Button>
                {openDropdown === dropdownKey && (
                    <div className="absolute z-20 mt-2 w-full bg-background border rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 max-h-80 overflow-y-auto">
                            {banners.map((item: string | undefined, index: number) => (
                                item ? (
                                    <div 
                                        key={index} 
                                        onClick={() => handleSelect(item)} 
                                        className="cursor-pointer group hover:bg-accent/50 p-2 rounded-md transition-colors"
                                    >
                                        <img
                                            src={item}
                                            alt={`Banner ${index + 1}`}
                                            className="w-full h-16 object-cover rounded border group-hover:border-border transition-colors"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className='w-full max-w-4xl mx-auto'>
            <div className='space-y-8 pb-8'>
                {/* Header Image Section */}
                <Section
                    title="Header Image"
                    icon={<FaImage className="text-blue-600" />}
                    description="Add a custom header image to make your profile stand out"
                >
                    <Card className="border-border/50">
                        <CardContent className="pt-6 space-y-6">
                            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-sm font-medium">Need a custom header?</span>
                                    <span className="text-xs text-muted-foreground">Use our recommended generator</span>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link
                                        href='https://leviarista.github.io/github-profile-header-generator'
                                        target='_blank'
                                        className="text-xs"
                                    >
                                        Open Generator
                                    </Link>
                                </Button>
                            </div>
                            
                            {renderBannerOptions(Banners, setHeaderImage, 'headerBanner')}
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Or paste your image URL</Label>
                                <Input
                                    placeholder='https://example.com/image.jpg'
                                    type='url'
                                    value={headerImage}
                                    onChange={(e) => setHeaderImage(e.target.value)}
                                    className="border-border/50 focus:border-border transition-colors"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Section>

                {/* Profile Views Section */}
                <Section
                    title="Profile Views Counter"
                    icon={<FaEye className="text-emerald-600" />}
                    description="Track how many people visit your GitHub profile"
                >
                    <Card className="border-border/50">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">GitHub Username</Label>
                                <Input
                                    placeholder='Your GitHub username'
                                    value={profileViews}
                                    onChange={(e) => setProfileViews(e.target.value)}
                                    className="border-border/50 focus:border-border transition-colors"
                                />
                            </div>
                            {profileViews && (
                                <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                                    <Label className="text-sm font-medium">Preview</Label>
                                    <img
                                        src={`https://komarev.com/ghpvc/?username=${profileViews}&label=Profile%20views&color=0e75b6&style=flat`}
                                        alt="Profile views counter"
                                        className="rounded"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Section>

                {/* Introduction Section */}
                <Section
                    title="Introduction"
                    icon={<FaUser className="text-violet-600" />}
                    description="Tell the world who you are"
                >
                    <Card className="border-border/50">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Your Name</Label>
                                {renderInput(name, (e) => setName(e.target.value), "John Doe", 'name')}
                            </div>
                        </CardContent>
                    </Card>
                    <StyleOptions
                        sectionName="Introduction"
                        style={fieldStyles.name}
                        onStyleChange={(style) => setFieldStyle('name', style)}
                    />
                </Section>

                {/* About Me Section */}
                <Section
                    title="About Me"
                    icon={<FaInfoCircle className="text-amber-600" />}
                    description="Share your story and background"
                >
                    <Card className="border-border/50">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">About You</Label>
                                {renderInput(aboutMe, (e) => setAboutMe(e.target.value), "Tell us about yourself", 'aboutMe')}
                            </div>
                        </CardContent>
                    </Card>
                    <StyleOptions
                        sectionName="About Me"
                        style={fieldStyles.aboutMe}
                        onStyleChange={(style) => setFieldStyle('aboutMe', style)}
                    />
                </Section>

                {/* Currently Doing Section */}
                <Section
                    title="What You're Up To"
                    icon={<FaTasks className="text-orange-600" />}
                    description="Share your current projects and interests"
                >
                    <Card className="border-border/50">
                        <CardContent className="pt-6 space-y-2">
                            <div className="grid gap-2">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        💼 Currently Working On
                                    </Label>
                                    {renderInput(currentlyDoing.working, (e) => setCurrentlyDoing('working', e.target.value), "What project are you working on?", 'working')}
                                </div>
                                
                                <Separator className="bg-border/30" />
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        🌱 Currently Learning
                                    </Label>
                                    {renderInput(currentlyDoing.learning, (e) => setCurrentlyDoing('learning', e.target.value), "What are you learning?", 'learning')}
                                </div>
                                
                                <Separator className="bg-border/30" />
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        💬 Ask Me About
                                    </Label>
                                    {renderInput(currentlyDoing.askMeAbout, (e) => setCurrentlyDoing('askMeAbout', e.target.value), "Your areas of expertise", 'askMeAbout')}
                                </div>
                                
                                <Separator className="bg-border/30" />
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        ⚡ Fun Fact
                                    </Label>
                                    {renderInput(currentlyDoing.funFact, (e) => setCurrentlyDoing('funFact', e.target.value), "Share something interesting about yourself", 'funFact')}
                                </div>
                                
                                <Separator className="bg-border/30" />
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        📂 Portfolio
                                    </Label>
                                    {renderInput(currentlyDoing.portfolio, (e) => setCurrentlyDoing('portfolio', e.target.value), "Link to your portfolio", 'portfolio')}
                                </div>
                                
                                <Separator className="bg-border/30" />
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        📝 Blog
                                    </Label>
                                    {renderInput(currentlyDoing.blog, (e) => setCurrentlyDoing('blog', e.target.value), "Link to your blog", 'blog')}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Section>
            </div>
        </div>
    )
}

type SectionType = {
    title: string;
    icon: ReactNode;
    description?: string;
    children: ReactNode;
};

const Section = React.memo(({ title, icon, description, children }: SectionType) => (
    <div className='space-y-4 border-primary/15 bg-background rounded-lg p-4 border' >
        <div className='space-y-2'>
            <div className='flex items-center gap-3'>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                    {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
            </div>
        </div>
        {children}
    </div>
));

Section.displayName = 'Section';

export default Introduction;