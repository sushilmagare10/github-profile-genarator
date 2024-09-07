"use client"

import React, { useState } from 'react';
import { Card as UICard, CardContent, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useStatsCardStore, { Card, CardType, RepoCardProps, StatsCardProps, StreakCardProps, TopLangsCardProps } from '@/store/StatsCardStore';
import { Button } from '../ui/button';
import {
    locales,
    dateFormats,
    dayAbbreviations,
    layouts,
    numberFormats,
    rankIcons,
    streakModes,
    themes,
    Streakthemes
} from '@/data/StatsData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';




const StatsCard = () => {
    const { username, cards, setUsername, addCard, removeCard, updateCard } = useStatsCardStore();
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    const getCardSrc = (card: Card) => {
        const params = new URLSearchParams({
            user: username,
            ...Object.fromEntries(Object.entries(card).filter(([_, v]) => v !== undefined && v !== ''))
        });

        switch (card.type) {
            case 'stats':
                return `https://github-readme-stats.vercel.app/api?${params}`;
            case 'top-langs':
                return `https://github-readme-stats.vercel.app/api/top-langs?${params}`;
            case 'repo-card':
                return `https://github-readme-stats.vercel.app/api/pin?${params}`;
            case 'streak':
                return `https://streak-stats.demolab.com?${params}`;
            default:
                return '';
        }
    };

    const handleAddCard = (type: CardType) => {
        const newCard = addCard(type);
        if (newCard) {
            setSelectedCardIndex(cards.length);
        } else if (type !== 'repo-card') {
            console.log(`A ${type} card already exists`);
        }
    };
    const handleRemoveCard = (index: number) => {
        removeCard(index);
        setSelectedCardIndex(null);
    };

    const handleUpdateCard = (index: number, updates: Partial<Card>) => {
        updateCard(index, updates);
    };


    const renderCardSettings = (card: Card, index: number) => {
        const commonSettings = (
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex justify-between items-center gap-4'>
                    <Input
                        type="text"
                        placeholder="Title Color"
                        value={card.title_color || ''}
                        onChange={(e) => handleUpdateCard(index, { title_color: e.target.value })} />
                    <Input
                        type="text"
                        placeholder="Text Color"
                        value={card.text_color || ''}
                        onChange={(e) => handleUpdateCard(index, { text_color: e.target.value })}
                    />
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <Input
                        type="text"
                        placeholder="Icon Color"
                        value={card.icon_color || ''}
                        onChange={(e) => handleUpdateCard(index, { icon_color: e.target.value })}
                    />
                    <Input
                        type="text"
                        placeholder="Border Color"
                        value={card.border_color || ''}
                        onChange={(e) => handleUpdateCard(index, { border_color: e.target.value })}
                    />
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <div className='relative w-full flex justify-between items-center'>
                        <Input
                            type="text"
                            placeholder="Background Color"
                            value={card.bg_color || ''}
                            className='w-full'
                            onChange={(e) => handleUpdateCard(index, { bg_color: e.target.value })}
                        />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='w-5 h-5 mb-1 absolute top-[10px] right-1 flex justify-center items-center rounded-full bg-secondary border'>
                                        <span className=' font-bold text-gray-500 cursor-pointer'>?</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='w-80 p-2 bg-secondary flex flex-col gap-2 shadow-lg'>
                                    <span>
                                        To customize the background, enter hex values without the `#` symbol. For a gradient background, start with the degree of the gradient, followed by hex values separated by commas.
                                    </span>
                                    <span>
                                        eg: 35,2dd4bf,784BA0,2B86C5
                                    </span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        type="number"
                        placeholder="Border Radius"
                        value={card.border_radius || ''}
                        onChange={(e) => handleUpdateCard(index, { border_radius: parseFloat(e.target.value) || undefined })}
                    />
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <Select
                        value={card.theme || 'default'}
                        onValueChange={(value) => handleUpdateCard(index, { theme: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {themes.map((theme) => (
                                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={card.locale || 'en'}
                        onValueChange={(value) => handleUpdateCard(index, { locale: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select locale" />
                        </SelectTrigger>
                        <SelectContent>
                            {locales.map((locale) => (
                                <SelectItem key={locale} value={locale}>{locale}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 py-4">
                    <Switch
                        id={`hide-border-${index}`}
                        checked={card.hide_border || false}
                        onCheckedChange={(checked) => handleUpdateCard(index, { hide_border: checked })}
                    />
                    <Label htmlFor={`hide-border-${index}`}>Hide Border</Label>
                </div>
            </div>
        );

        switch (card.type) {
            case 'stats':
                return (
                    <>
                        {commonSettings}
                        <div className=' flex flex-col gap-4'>
                            <div className='flex justify-between items-center gap-4'>
                                <Input
                                    type="text"
                                    placeholder="Ring Color"
                                    value={(card as StatsCardProps).ring_color || ''}
                                    onChange={(e) => handleUpdateCard(index, { ring_color: e.target.value })}
                                />
                            </div>
                            <div className='flex justify-between items-center gap-4 w-full '>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Label htmlFor={`line-height-${index}`}>Line Height</Label>
                                    <Input
                                        type="number"
                                        placeholder="Line Height"
                                        value={(card as StatsCardProps).line_height || ''}
                                        onChange={(e) => handleUpdateCard(index, { line_height: parseInt(e.target.value) || undefined })}
                                    />
                                </div>
                                <div className=' flex flex-col gap-2 w-full'>
                                    <Label htmlFor={`custom-title-${index}`}>Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="Custom Title"
                                        value={(card as StatsCardProps).custom_title || ''}
                                        onChange={(e) => handleUpdateCard(index, { custom_title: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-4'>
                                <Select
                                    value={(card as StatsCardProps).rank_icon || 'default'}
                                    onValueChange={(value: "default" | "github" | "percentile") => handleUpdateCard(index, { rank_icon: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select rank icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rankIcons.map((icon) => (
                                            <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={(card as StatsCardProps).number_format || 'short'}
                                    onValueChange={(value: "short" | "long") => handleUpdateCard(index, { number_format: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select number format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {numberFormats.map((format) => (
                                            <SelectItem key={format} value={format}>{format}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`hide-title-${index}`}
                                        checked={(card as StatsCardProps).hide_title || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { hide_title: checked })}
                                    />
                                    <Label htmlFor={`hide-title-${index}`}>Hide Title</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`hide-rank-${index}`}
                                        checked={(card as StatsCardProps).hide_rank || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { hide_rank: checked })}
                                    />
                                    <Label htmlFor={`hide-rank-${index}`}>Hide Rank</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`show-icons-${index}`}
                                        checked={(card as StatsCardProps).show_icons || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { show_icons: checked })}
                                    />
                                    <Label htmlFor={`show-icons-${index}`}>Show Icons</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`include-all-commits-${index}`}
                                        checked={(card as StatsCardProps).include_all_commits || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { include_all_commits: checked })}
                                    />
                                    <Label htmlFor={`include-all-commits-${index}`}>Include All Commits</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`text-bold-${index}`}
                                        checked={(card as StatsCardProps).text_bold || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { text_bold: checked })}
                                    />
                                    <Label htmlFor={`text-bold-${index}`}>Text Bold</Label>
                                </div>
                                <div className="flex items-center space-x-2 ">
                                    <Switch
                                        id={`disable-animations-${index}`}
                                        checked={(card as StatsCardProps).disable_animations || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { disable_animations: checked })}
                                    />
                                    <Label htmlFor={`disable-animations-${index}`}>Disable Animations</Label>
                                </div>
                            </div>
                            <Label className='font-bold mt-4'>Show Options</Label>
                            <div className="mb-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {['reviews', 'discussions_started', 'discussions_answered', 'prs_merged', 'prs_merged_percentage'].map((option) => (
                                    <div key={option} className="flex items-center">
                                        <Switch
                                            id={`show_${option}_${index}`}
                                            checked={((card as StatsCardProps).show || []).includes(option)}
                                            onCheckedChange={(checked) => {
                                                const currentShow = (card as StatsCardProps).show || [];
                                                const newShow = checked
                                                    ? [...currentShow, option]
                                                    : currentShow.filter((item: any) => item !== option);
                                                handleUpdateCard(index, { show: newShow });
                                            }}
                                        />
                                        <Label htmlFor={`show_${option}_${index}`} className="ml-2">
                                            {option.replace(/_/g, ' ')}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            case 'top-langs':
                return (
                    <>
                        {commonSettings}
                        <div className=' flex flex-col gap-4'>
                            <div className='flex justify-start items-center gap-4 '>
                                <Input
                                    type="text"
                                    placeholder="Custom Title"
                                    value={(card as TopLangsCardProps).custom_title || ''}
                                    onChange={(e) => handleUpdateCard(index, { custom_title: e.target.value })}
                                />
                            </div>
                            <div className='flex justify-between w-full items-center gap-4 '>
                                <div className='flex w-full flex-col justify-start gap-2 '>
                                    <Label>Layout</Label>
                                    <Select
                                        value={(card as TopLangsCardProps).layout || 'normal'}
                                        onValueChange={(value: "normal" | "compact" | "donut" | "donut-vertical" | "pie") =>
                                            handleUpdateCard(index, { layout: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select layout" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {layouts.map((layout) => (
                                                <SelectItem key={layout} value={layout}>{layout}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex w-full flex-col justify-start gap-2 '>
                                    <Label>Languages Count</Label>
                                    <Input
                                        type="number"
                                        placeholder="Languages Count"
                                        value={(card as TopLangsCardProps).langs_count || ''}
                                        onChange={(e) => handleUpdateCard(index, { langs_count: parseInt(e.target.value) || undefined })}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-start items-center gap-4 my-2'>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`hide-title-${index}`}
                                        checked={(card as TopLangsCardProps).hide_title || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { hide_title: checked })}
                                    />
                                    <Label htmlFor={`hide-title-${index}`}>Hide Title</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`disable-animations-${index}`}
                                        checked={(card as TopLangsCardProps).disable_animations || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { disable_animations: checked })}
                                    />
                                    <Label htmlFor={`disable-animations-${index}`}>Disable Animations</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`hide-progress-${index}`}
                                        checked={(card as TopLangsCardProps).hide_progress || false}
                                        onCheckedChange={(checked) => handleUpdateCard(index, { hide_progress: checked })}
                                    />
                                    <Label htmlFor={`hide-progress-${index}`}>Hide Progress</Label>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'repo-card':
                return (
                    <>
                        <Input
                            className='mb-4'
                            type="text"
                            placeholder="Repository Name"
                            value={(card as RepoCardProps).repo || ''}
                            onChange={(e) => handleUpdateCard(index, { repo: e.target.value })}
                        />
                        {commonSettings}
                        <div className='flex flex-col gap-4'>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id={`show-owner-${index}`}
                                    checked={(card as RepoCardProps).show_owner || false}
                                    onCheckedChange={(checked) => handleUpdateCard(index, { show_owner: checked })}
                                />
                                <Label htmlFor={`show-owner-${index}`}>Show Owner</Label>
                            </div>
                        </div>
                    </>
                );
            case 'streak':
                return (
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-start items-center gap-4'>
                            <Select
                                value={(card as StreakCardProps).theme || 'default'}
                                onValueChange={(value) => handleUpdateCard(index, { theme: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Streakthemes.map((theme) => (
                                        <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                type="number"
                                placeholder="Border Radius"
                                value={(card as StreakCardProps).border_radius || ''}
                                onChange={(e) => handleUpdateCard(index, { border_radius: parseFloat(e.target.value) || undefined })}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-4 '>
                            <div className='relative w-full flex justify-between items-center'>
                                <Input
                                    type="text"
                                    placeholder="Background Color"
                                    value={(card as StreakCardProps).background || ''}
                                    onChange={(e) => handleUpdateCard(index, { background: e.target.value })}
                                />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className='w-5 h-5 mb-1 absolute top-[10px] right-1 flex justify-center items-center rounded-full bg-secondary border'>
                                                <span className=' font-bold text-gray-500 cursor-pointer'>?</span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className='w-80 p-2 bg-secondary flex flex-col gap-2 shadow-lg'>
                                            <span>
                                                To customize the background, enter hex values without the `#` symbol. For a gradient background, start with the degree of the gradient, followed by hex values separated by commas.
                                            </span>
                                            <span>
                                                eg: 35,2dd4bf,784BA0,2B86C5
                                            </span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Input
                                type="text"
                                placeholder="Border Color"
                                value={(card as StreakCardProps).border || ''}
                                onChange={(e) => handleUpdateCard(index, { border: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-4 '>
                            <Input
                                type="text"
                                placeholder="Stroke Color"
                                value={(card as StreakCardProps).stroke || ''}
                                onChange={(e) => handleUpdateCard(index, { stroke: e.target.value })}
                            />
                            <Input
                                type="text"
                                placeholder="Ring Color"
                                value={(card as StreakCardProps).ring || ''}
                                onChange={(e) => handleUpdateCard(index, { ring: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-4 '>
                            <Input
                                type="text"
                                placeholder="Fire Color"
                                value={(card as StreakCardProps).fire || ''}
                                onChange={(e) => handleUpdateCard(index, { fire: e.target.value })}
                            />
                            <Input
                                type="text"
                                placeholder="Current Streak Number Color"
                                value={(card as StreakCardProps).currStreakNum || ''}
                                onChange={(e) => handleUpdateCard(index, { currStreakNum: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-4 '>                            <Input
                            type="text"
                            placeholder="Side Numbers Color"
                            value={(card as StreakCardProps).sideNums || ''}
                            onChange={(e) => handleUpdateCard(index, { sideNums: e.target.value })}
                        />
                            <Input
                                type="text"
                                placeholder="Current Streak Label Color"
                                value={(card as StreakCardProps).currStreakLabel || ''}
                                onChange={(e) => handleUpdateCard(index, { currStreakLabel: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-4 '>
                            <Input
                                type="text"
                                placeholder="Side Labels Color"
                                value={(card as StreakCardProps).sideLabels || ''}
                                onChange={(e) => handleUpdateCard(index, { sideLabels: e.target.value })}
                            />
                            <Input
                                type="text"
                                placeholder="Dates Color"
                                value={(card as StreakCardProps).dates || ''}
                                onChange={(e) => handleUpdateCard(index, { dates: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-start items-center gap-4 '>
                            <Input
                                type="text"
                                placeholder="Exclude Days Label Color"
                                value={(card as StreakCardProps).excludeDaysLabel || ''}
                                onChange={(e) => handleUpdateCard(index, { excludeDaysLabel: e.target.value })}
                            />
                            <Select
                                value={(card as StreakCardProps).date_format || "d F[, Y]"}
                                onValueChange={(value) => handleUpdateCard(index, { date_format: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dateFormats.map((format) => (
                                        <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex justify-start items-center gap-4 '>
                            <Select
                                value={(card as StreakCardProps).locale || "en"}
                                onValueChange={(value) => handleUpdateCard(index, { locale: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select locales" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locales.map((locale) => (
                                        <SelectItem key={locale} value={locale}>{locale}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={(card as StreakCardProps).mode || 'daily'}
                                onValueChange={(value) => handleUpdateCard(index, { mode: value as 'daily' | 'weekly' })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select streak mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {streakModes.map((mode) => (
                                        <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Exclude Days</Label>
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {dayAbbreviations.map((day) => (
                                    <Button
                                        key={day}
                                        variant={(card as StreakCardProps).exclude_days?.includes(day) ? 'default' : 'outline'}
                                        onClick={() => {
                                            const currentExcludeDays = (card as StreakCardProps).exclude_days || [];
                                            const newExcludeDays = currentExcludeDays.includes(day)
                                                ? currentExcludeDays.filter(d => d !== day)
                                                : [...currentExcludeDays, day];
                                            handleUpdateCard(index, { exclude_days: newExcludeDays });
                                        }}
                                    >
                                        {day}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            <div className='flex justify-between items-center gap-4'>
                                <Switch
                                    id={`disable-animations-${index}`}
                                    checked={(card as StreakCardProps).disable_animations || false}
                                    onCheckedChange={(checked) => handleUpdateCard(index, { disable_animations: checked })}
                                />
                                <Label htmlFor={`disable-animations-${index}`}>Disable Animations</Label>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <Switch
                                    id={`hide-total-contributions-${index}`}
                                    checked={(card as StreakCardProps).hide_total_contributions || false}
                                    onCheckedChange={(checked) => handleUpdateCard(index, { hide_total_contributions: checked })}
                                />
                                <Label htmlFor={`hide-total-contributions-${index}`}>Hide Total Contributions</Label>
                            </div>
                            <div className="flex items-center justify-between">
                                <Switch
                                    id={`hide-current-streak-${index}`}
                                    checked={(card as StreakCardProps).hide_current_streak || false}
                                    onCheckedChange={(checked) => handleUpdateCard(index, { hide_current_streak: checked })}
                                />
                                <Label htmlFor={`hide-current-streak-${index}`}>Hide Current Streak</Label>
                            </div>
                            <div className="flex items-center justify-between">
                                <Switch
                                    id={`hide-longest-streak-${index}`}
                                    checked={(card as StreakCardProps).hide_longest_streak || false}
                                    onCheckedChange={(checked) => handleUpdateCard(index, { hide_longest_streak: checked })}
                                />
                                <Label htmlFor={`hide-longest-streak-${index}`}>Hide Longest Streak</Label>
                            </div>
                        </div >
                    </div>
                );
        }
    };

    return (
        <UICard className='w-full flex flex-col p-4 border-none gap-4'>
            <CardTitle>GitHub Stats Cards</CardTitle>
            <CardContent className='p-0'>
                <div className="mb-4">
                    <Label htmlFor="username">GitHub Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your GitHub username"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 h-56">
                    {(['stats', 'top-langs', 'repo-card', 'streak'] as CardType[]).map((type) => (
                        <div
                            key={type}
                            className={`relative cursor-pointer rounded-md border border-gray-200 overflow-hidden ${selectedCardIndex === null ? 'hover:border-gray-400' : ''}`}
                            onClick={() => handleAddCard(type)}
                        >
                            <img
                                src={getCardSrc({ type, ...(type === 'streak' ? { user: username || 'sushilmagare10' } : { username: username || 'sushilmagare10' }) } as Card)}
                                alt={`GitHub ${type} Card`}
                                className="w-full h-full object-contain"
                            />
                            <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity ${selectedCardIndex !== null ? 'hidden' : ''}`}>
                                <span className="text-white font-bold">Add Card</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='pb-10 md:p-0 flex flex-col justify-center items-center gap-4 w-full'>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`relative flex w-full flex-col items-center p-4 rounded-md gap-4 border border-gray-200 overflow-hidden cursor-pointer ${selectedCardIndex === index ? 'border-primary border' : 'hover:border-gray-400'}`}
                        >
                            <button
                                className="absolute top-2 right-2 text-destructive z-10"
                                onClick={() => handleRemoveCard(index)}
                            >
                                ✕
                            </button>
                            <img
                                src={getCardSrc({ ...card, ...(card.type === 'streak' ? { user: username } : { username }) })}
                                alt={`GitHub ${card.type} Card`}
                                className="w-4/5 h-56 text-center object-contain"
                                onClick={() => setSelectedCardIndex(index)}
                            />
                            {selectedCardIndex === index && (
                                <div className="mt-4 p-4 w-full bg-card shadow-md rounded-md">
                                    <h3 className="font-bold mb-2">Card Settings</h3>
                                    {renderCardSettings(card, index)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </UICard>
    );
};

export default StatsCard;