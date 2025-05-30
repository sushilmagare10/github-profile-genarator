"use client"

import React, { useState } from 'react';
import { Card as UICard, CardContent, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useStatsCardStore, { Card, CommonCardProps, CardType, RepoCardProps, StatsCardProps, StreakCardProps, TopLangsCardProps } from '@/store/StatsCardStore';
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
import { HelpCircle, X } from 'lucide-react';




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
        const newCardIndex = cards.length;
        addCard(type);
        if (cards.length > newCardIndex) {
            setSelectedCardIndex(newCardIndex);
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
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Title Color</Label>
                        <Input
                            type="text"
                            placeholder="e.g., 2F80ED"
                            value={(card as CommonCardProps).title_color || ''}
                            onChange={(e) => handleUpdateCard(index, { title_color: e.target.value })}
                            className="border-border/50 focus:border-border transition-colors"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Text Color</Label>
                        <Input
                            type="text"
                            placeholder="e.g., 434D58"
                            value={(card as CommonCardProps).text_color || ''}
                            onChange={(e) => handleUpdateCard(index, { text_color: e.target.value })}
                            className="border-border/50 focus:border-border transition-colors"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Icon Color</Label>
                        <Input
                            type="text"
                            placeholder="e.g., 2F80ED"
                            value={(card as CommonCardProps).icon_color || ''}
                            onChange={(e) => handleUpdateCard(index, { icon_color: e.target.value })}
                            className="border-border/50 focus:border-border transition-colors"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Border Color</Label>
                        <Input
                            type="text"
                            placeholder="e.g., E4E2E2"
                            value={(card as CommonCardProps).border_color || ''}
                            onChange={(e) => handleUpdateCard(index, { border_color: e.target.value })}
                            className="border-border/50 focus:border-border transition-colors"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Background Color</Label>
                        <div className='relative'>
                            <Input
                                type="text"
                                placeholder="e.g., 35,2dd4bf,784BA0,2B86C5"
                                value={(card as CommonCardProps).bg_color || ''}
                                onChange={(e) => handleUpdateCard(index, { bg_color: e.target.value })}
                                className="border-border/50 focus:border-border transition-colors pr-8"
                            />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="w-4 h-4 absolute right-2 top-3 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-xs p-3 bg-popover border shadow-lg'>
                                        <div className="space-y-2 text-sm">
                                            <p>Enter hex values without the `#` symbol.</p>
                                            <p>For gradients: degree,color1,color2,color3</p>
                                            <p className="text-muted-foreground">Example: 35,2dd4bf,784BA0,2B86C5</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Border Radius</Label>
                        <Input
                            type="number"
                            placeholder="5"
                            value={card.border_radius || ''}
                            onChange={(e) => handleUpdateCard(index, { border_radius: parseFloat(e.target.value) || undefined })}
                            className="border-border/50 focus:border-border transition-colors"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Theme</Label>
                        <Select
                            value={card.theme || 'default'}
                            onValueChange={(value) => handleUpdateCard(index, { theme: value })}
                        >
                            <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2'>
                        <Label className="text-sm font-medium">Locale</Label>
                        <Select
                            value={card.locale || 'en'}
                            onValueChange={(value) => handleUpdateCard(index, { locale: value })}
                        >
                            <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                <SelectValue placeholder="Select locale" />
                            </SelectTrigger>
                            <SelectContent>
                                {locales.map((locale) => (
                                    <SelectItem key={locale} value={locale}>{locale}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-2 py-2">
                    <Switch
                        id={`hide-border-${index}`}
                        checked={card.hide_border || false}
                        onCheckedChange={(checked) => handleUpdateCard(index, { hide_border: checked })}
                    />
                    <Label htmlFor={`hide-border-${index}`} className="text-sm font-medium">Hide Border</Label>
                </div>
            </div>
        );
        switch (card.type) {
            case 'stats':
                return (
                    <div className="space-y-6">
                        {commonSettings}
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Ring Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g., 2F80ED"
                                        value={(card as StatsCardProps).ring_color || ''}
                                        onChange={(e) => handleUpdateCard(index, { ring_color: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Line Height</Label>
                                    <Input
                                        type="number"
                                        placeholder="25"
                                        value={(card as StatsCardProps).line_height || ''}
                                        onChange={(e) => handleUpdateCard(index, { line_height: parseInt(e.target.value) || undefined })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-sm font-medium">Custom Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Your custom title"
                                    value={(card as StatsCardProps).custom_title || ''}
                                    onChange={(e) => handleUpdateCard(index, { custom_title: e.target.value })}
                                    className="border-border/50 focus:border-border transition-colors"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Rank Icon</Label>
                                    <Select
                                        value={(card as StatsCardProps).rank_icon || 'default'}
                                        onValueChange={(value: "default" | "github" | "percentile") => handleUpdateCard(index, { rank_icon: value })}
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select rank icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {rankIcons.map((icon) => (
                                                <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Number Format</Label>
                                    <Select
                                        value={(card as StatsCardProps).number_format || 'short'}
                                        onValueChange={(value: "short" | "long") => handleUpdateCard(index, { number_format: value })}
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select number format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {numberFormats.map((format) => (
                                                <SelectItem key={format} value={format}>{format}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <Label className="text-sm font-medium">Display Options</Label>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                                    {[
                                        { key: 'hide_title', label: 'Hide Title' },
                                        { key: 'hide_rank', label: 'Hide Rank' },
                                        { key: 'show_icons', label: 'Show Icons' },
                                        { key: 'include_all_commits', label: 'Include All Commits' },
                                        { key: 'text_bold', label: 'Bold Text' },
                                        { key: 'disable_animations', label: 'Disable Animations' }
                                    ].map(({ key, label }) => (
                                        <div key={key} className="flex items-center space-x-2">
                                            <Switch
                                                id={`${key}-${index}`}
                                                checked={(card as StatsCardProps)[key as keyof StatsCardProps] as boolean || false}
                                                onCheckedChange={(checked) => handleUpdateCard(index, { [key]: checked })}
                                            />
                                            <Label htmlFor={`${key}-${index}`} className="text-sm">{label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <Label className="text-sm font-medium">Additional Stats</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {['reviews', 'discussions_started', 'discussions_answered', 'prs_merged', 'prs_merged_percentage'].map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
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
                                            <Label htmlFor={`show_${option}_${index}`} className="text-sm">
                                                {option.replace(/_/g, ' ')}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'top-langs':
                return (
                    <div className="space-y-6">
                        {commonSettings}
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label className="text-sm font-medium">Custom Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Most Used Languages"
                                    value={(card as TopLangsCardProps).custom_title || ''}
                                    onChange={(e) => handleUpdateCard(index, { custom_title: e.target.value })}
                                    className="border-border/50 focus:border-border transition-colors"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Layout</Label>
                                    <Select
                                        value={(card as TopLangsCardProps).layout || 'normal'}
                                        onValueChange={(value: "normal" | "compact" | "donut" | "donut-vertical" | "pie") =>
                                            handleUpdateCard(index, { layout: value })
                                        }
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select layout" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {layouts.map((layout) => (
                                                <SelectItem key={layout} value={layout}>{layout}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Languages Count</Label>
                                    <Input
                                        type="number"
                                        placeholder="8"
                                        value={(card as TopLangsCardProps).langs_count || ''}
                                        onChange={(e) => handleUpdateCard(index, { langs_count: parseInt(e.target.value) || undefined })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <Label className="text-sm font-medium">Display Options</Label>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                                    {[
                                        { key: 'hide_title', label: 'Hide Title' },
                                        { key: 'disable_animations', label: 'Disable Animations' },
                                        { key: 'hide_progress', label: 'Hide Progress' }
                                    ].map(({ key, label }) => (
                                        <div key={key} className="flex items-center space-x-2">
                                            <Switch
                                                id={`${key}-${index}`}
                                                checked={(card as TopLangsCardProps)[key as keyof TopLangsCardProps] as boolean || false}
                                                onCheckedChange={(checked) => handleUpdateCard(index, { [key]: checked })}
                                            />
                                            <Label htmlFor={`${key}-${index}`} className="text-sm">{label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'repo-card':
                return (
                    <div className="space-y-6">
                        <div className='space-y-2'>
                            <Label className="text-sm font-medium">Repository Name</Label>
                            <Input
                                type="text"
                                placeholder="username/repository-name"
                                value={(card as RepoCardProps).repo || ''}
                                onChange={(e) => handleUpdateCard(index, { repo: e.target.value })}
                                className="border-border/50 focus:border-border transition-colors"
                            />
                        </div>
                        {commonSettings}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id={`show-owner-${index}`}
                                checked={(card as RepoCardProps).show_owner || false}
                                onCheckedChange={(checked) => handleUpdateCard(index, { show_owner: checked })}
                            />
                            <Label htmlFor={`show-owner-${index}`} className="text-sm font-medium">Show Owner</Label>
                        </div>
                    </div>
                );
            case 'streak':
                return (
                    <div className="space-y-6">
                        {commonSettings}
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Theme</Label>
                                    <Select
                                        value={(card as StreakCardProps).theme || 'default'}
                                        onValueChange={(value) => handleUpdateCard(index, { theme: value })}
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Streakthemes.map((theme) => (
                                                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Border Radius</Label>
                                    <Input
                                        type="number"
                                        placeholder="Border Radius"
                                        value={(card as StreakCardProps).border_radius || ''}
                                        onChange={(e) => handleUpdateCard(index, { border_radius: parseFloat(e.target.value) || undefined })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Background Color</Label>
                                    <div className='relative'>
                                        <Input
                                            type="text"
                                            placeholder="Background Color"
                                            value={(card as StreakCardProps).background || ''}
                                            onChange={(e) => handleUpdateCard(index, { background: e.target.value })}
                                            className="border-border/50 focus:border-border transition-colors"
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
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Border Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Border Color"
                                        value={(card as StreakCardProps).border || ''}
                                        onChange={(e) => handleUpdateCard(index, { border: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Stroke Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Stroke Color"
                                        value={(card as StreakCardProps).stroke || ''}
                                        onChange={(e) => handleUpdateCard(index, { stroke: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Ring Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ring Color"
                                        value={(card as StreakCardProps).ring || ''}
                                        onChange={(e) => handleUpdateCard(index, { ring: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Fire Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Fire Color"
                                        value={(card as StreakCardProps).fire || ''}
                                        onChange={(e) => handleUpdateCard(index, { fire: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Current Streak Number Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Current Streak Number Color"
                                        value={(card as StreakCardProps).currStreakNum || ''}
                                        onChange={(e) => handleUpdateCard(index, { currStreakNum: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Side Numbers Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Side Numbers Color"
                                        value={(card as StreakCardProps).sideNums || ''}
                                        onChange={(e) => handleUpdateCard(index, { sideNums: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Current Streak Label Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Current Streak Label Color"
                                        value={(card as StreakCardProps).currStreakLabel || ''}
                                        onChange={(e) => handleUpdateCard(index, { currStreakLabel: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Side Labels Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Side Labels Color"
                                        value={(card as StreakCardProps).sideLabels || ''}
                                        onChange={(e) => handleUpdateCard(index, { sideLabels: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Dates Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Dates Color"
                                        value={(card as StreakCardProps).dates || ''}
                                        onChange={(e) => handleUpdateCard(index, { dates: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Exclude Days Label Color</Label>
                                    <Input
                                        type="text"
                                        placeholder="Exclude Days Label Color"
                                        value={(card as StreakCardProps).excludeDaysLabel || ''}
                                        onChange={(e) => handleUpdateCard(index, { excludeDaysLabel: e.target.value })}
                                        className="border-border/50 focus:border-border transition-colors"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Date Format</Label>
                                    <Select
                                        value={(card as StreakCardProps).date_format || "d F[, Y]"}
                                        onValueChange={(value) => handleUpdateCard(index, { date_format: value })}
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select date format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dateFormats.map(({ format, description }) => (
                                                <SelectItem key={format} value={format}>
                                                    {`${description}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
            
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Locale</Label>
                                    <Select
                                        value={(card as StreakCardProps).locale || "en"}
                                        onValueChange={(value) => handleUpdateCard(index, { locale: value })}
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select locales" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locales.map((locale) => (
                                                <SelectItem key={locale} value={locale}>{locale}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-sm font-medium">Streak Mode</Label>
                                    <Select
                                        value={(card as StreakCardProps).mode || 'daily'}
                                        onValueChange={(value) => handleUpdateCard(index, { mode: value as 'daily' | 'weekly' })}
                                    >
                                        <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                            <SelectValue placeholder="Select streak mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {streakModes.map((mode) => (
                                                <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
            
                            <div className='space-y-3'>
                                <Label className="text-sm font-medium">Exclude Days</Label>
                                <div className='flex flex-wrap gap-2'>
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
            
                            <div className='space-y-3'>
                                <Label className="text-sm font-medium">Display Options</Label>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                                    {[
                                        { key: 'disable_animations', label: 'Disable Animations' },
                                        { key: 'hide_total_contributions', label: 'Hide Total Contributions' },
                                        { key: 'hide_current_streak', label: 'Hide Current Streak' },
                                        { key: 'hide_longest_streak', label: 'Hide Longest Streak' }
                                    ].map(({ key, label }) => (
                                        <div key={key} className="flex items-center space-x-2">
                                            <Switch
                                                id={`${key}-${index}`}
                                                checked={(card as StreakCardProps)[key as keyof StreakCardProps] as boolean || false}
                                                onCheckedChange={(checked) => handleUpdateCard(index, { [key]: checked })}
                                            />
                                            <Label htmlFor={`${key}-${index}`} className="text-sm">{label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <UICard className='w-full bg-background  border-border/60 shadow-xl backdrop-blur-sm'>
    <div className="p-6 space-y-6">
        <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                GitHub Stats Cards
            </CardTitle>
            <p className="text-muted-foreground text-sm">Create beautiful GitHub profile cards with customizable themes and settings</p>
        </div>
        
        <CardContent className='p-0 space-y-8'>
            <div className="space-y-3">
                <Label htmlFor="username" className="text-sm font-semibold text-foreground/90">GitHub Username</Label>
                <div className="relative">
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your GitHub username"
                        className="h-12 px-4 border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-background/50 backdrop-blur-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                       <X/>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground/90">Choose Card Type</h3>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">Click to add</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                    {(['stats', 'top-langs', 'repo-card', 'streak'] as CardType[]).map((type) => (
                        <div
                            key={type}
                            className={`group relative cursor-pointer rounded-xl border  overflow-hidden  border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300  ${selectedCardIndex === null ? 'hover:scale-[1.02]' : ''}`}
                            onClick={() => handleAddCard(type)}
                        >
                            <div className="aspect-[2/1] p-4">
                                <img
                                    src={getCardSrc({ type, ...(type === 'streak' ? { user: username || 'sushilmagare10' } : { username: username || 'sushilmagare10' }) } as Card)}
                                    alt={`GitHub ${type} Card`}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ${selectedCardIndex !== null ? 'hidden' : ''}`}>
                                <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    Add {type.charAt(0).toUpperCase() + type.slice(1)} Card
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {cards.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground/90">Your Cards</h3>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                            {cards.length} card{cards.length !== 1 ? 's' : ''} added
                        </span>
                    </div>
                    
                    <div className='space-y-6'>
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={`group relative bg-gradient-to-br from-background via-background to-muted/10 rounded-xl border transition-all duration-300 overflow-hidden ${
                                    selectedCardIndex === index 
                                        ? 'border-primary/60 shadow-lg shadow-primary/10 ring-2 ring-primary/20' 
                                        : 'border-border/40 hover:border-border/60 hover:shadow-md'
                                }`}
                            >
                                <button
                                    className="absolute top-4 right-4 w-8 h-8 font-bold rounded-full border border-border/40 bg-background/80 backdrop-blur-sm text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 z-10 opacity-70 hover:opacity-100"
                                    onClick={() => handleRemoveCard(index)}
                                >
                                    ✕
                                </button>
                                
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-center">
                                        <div 
                                            className="relative cursor-pointer rounded-lg overflow-hidden border border-border/20 hover:border-border/40 transition-all duration-200"
                                            onClick={() => setSelectedCardIndex(index)}
                                        >
                                            <img
                                                src={getCardSrc({ ...card, ...(card.type === 'streak' ? { user: username } : { username }) })}
                                                alt={`GitHub ${card.type} Card`}
                                                className="w-full max-w-lg h-48 object-contain bg-background/50"
                                            />
                                            {selectedCardIndex !== index && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200">
                                                    <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">
                                                        Click to customize
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {selectedCardIndex === index && (
                                        <div className="bg-muted/30 border border-border/30 rounded-lg p-6 space-y-4 backdrop-blur-sm">
                                            <div className='flex justify-between items-center'>
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-lg text-foreground/90">Card Settings</h3>
                                                    <p className="text-sm text-muted-foreground">Customize your {card.type} card appearance</p>
                                                </div>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-muted border border-border/40 hover:bg-muted/80 transition-colors duration-200'>
                                                                <span className='font-bold text-muted-foreground cursor-pointer'>?</span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs p-3 bg-popover border border-border shadow-xl'>
                                                            <div className="space-y-2 text-sm">
                                                                <p className="font-medium">Color Customization</p>
                                                                <p className="text-muted-foreground">
                                                                    Enter hex values without the `#` symbol to customize colors.
                                                                </p>
                                                                <div className="bg-muted/50 p-2 rounded font-mono text-xs">
                                                                    Example: 784BA0
                                                                </div>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <div className="border-t border-border/30 pt-4">
                                                {renderCardSettings(card, index)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </CardContent>
    </div>
</UICard>
    );
};

export default StatsCard;