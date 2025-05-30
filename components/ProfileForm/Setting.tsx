"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { motion, Reorder } from "framer-motion";
import { FaCog, FaGripVertical, FaAlignLeft, FaAlignCenter, FaAlignRight, FaRulerVertical, FaExpandArrowsAlt } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

const Setting = ({
    icons,
    sectionStyle,
    setGap,
    setSectionStyle,
    setIconHeight,
    setIcons,
    removeIcon,
    gapOptions = ["xs", "sm", "md", "lg", "xl"],
    heightOptions = ["xs", "sm", "md", "lg", "xl", "xxl"],
    alignmentOptions = ["left", "center", "right"],
    title = "Edit"
}: {
    icons: any;
    sectionStyle: any;
    setGap: any;
    setSectionStyle: any;
    setIconHeight: any;
    setIcons: any;
    removeIcon: any;
    gapOptions?: string[] | undefined;
    heightOptions?: string[] | undefined;
    alignmentOptions?: string[] | undefined;
    title?: string | undefined;
}) => {

    const isEmpty = icons && icons.length === 0;

    const getAlignmentIcon = (alignment: string) => {
        switch (alignment) {
            case 'left': return <FaAlignLeft className="w-4 h-4" />;
            case 'center': return <FaAlignCenter className="w-4 h-4" />;
            case 'right': return <FaAlignRight className="w-4 h-4" />;
            default: return <FaAlignLeft className="w-4 h-4" />;
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Alignment Section */}
            <Card className="border-border/50">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        {getAlignmentIcon(sectionStyle)}
                        <CardTitle className="text-base">Alignment</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Choose alignment for your icons</Label>
                        <div className="flex items-center gap-2">
                            {alignmentOptions.map(option => (
                                <Button
                                    key={option}
                                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                                        sectionStyle === option 
                                            ? 'shadow-sm' 
                                            : 'hover:bg-primary/10'
                                    }`}
                                    variant={sectionStyle === option ? 'default' : 'secondary'}
                                    onClick={() => setSectionStyle(option)}
                                >
                                    <div className="flex items-center gap-2">
                                        {getAlignmentIcon(option)}
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Icon Style Section */}
            <Card className="border-border/50">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <FaCog className="w-4 h-4 text-violet-600" />
                        <CardTitle className="text-base">Icon Style</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <FaRulerVertical className="w-3 h-3" />
                                Height
                            </Label>
                            <Select onValueChange={(value) => setIconHeight(value)} defaultValue="lg">
                                <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                    <SelectValue placeholder="Select Height" />
                                </SelectTrigger>
                                <SelectContent>
                                    {heightOptions.map(option => (
                                        <SelectItem key={option} value={option}>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{option.toUpperCase()}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <FaExpandArrowsAlt className="w-3 h-3" />
                                Gap
                            </Label>
                            <Select onValueChange={(value) => setGap(value)} defaultValue="xs">
                                <SelectTrigger className="border-border/50 focus:border-border transition-colors">
                                    <SelectValue placeholder="Select Gap" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gapOptions.map(option => (
                                        <SelectItem key={option} value={option}>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{option.toUpperCase()}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Selected Items Section */}
            <Card className="border-border/50">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaGripVertical className="w-4 h-4 text-orange-600" />
                            <CardTitle className="text-base">Selected Items</CardTitle>
                        </div>
                        {!isEmpty && (
                            <Badge variant="secondary" className="w-fit">
                                {icons.length} item{icons.length !== 1 ? 's' : ''}
                            </Badge>
                        )}
                    </div>
                    {!isEmpty && (
                        <p className="text-sm text-muted-foreground">
                            Drag items to reorder them
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {isEmpty ? (
                            <Card className="border-dashed border-2 border-border/30">
                                <CardContent className="flex flex-col justify-center items-center py-8">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                        <FaCog className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground text-sm font-medium">No items selected</p>
                                    <p className="text-muted-foreground text-xs text-center mt-1">
                                        Add social media platforms to see them here
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <Reorder.Group values={icons} onReorder={(newOrder) => setIcons(newOrder)}>
                                {icons.map((icon: any) => (
                                    <Reorder.Item
                                        value={icon}
                                        key={icon.id}
                                        className="cursor-grab  active:cursor-grabbing"
                                    >
                                        <motion.div
                                            className="group w-full flex my-1.5 items-center justify-between border border-border/30 bg-background hover:bg-accent/50 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaGripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                                <img
                                                    src={icon.url}
                                                    alt={icon.id}
                                                    className="h-6 rounded"
                                                />
                                                <span className="text-sm font-medium capitalize">
                                                    {icon.id}
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                                onClick={() => removeIcon(icon.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </motion.div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Setting;