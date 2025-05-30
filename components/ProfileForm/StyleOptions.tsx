import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FaBold, FaAlignLeft, FaAlignCenter, FaAlignRight, FaPalette } from 'react-icons/fa';
import { Button } from '../ui/button';

type StyleProps = {
    bold: boolean;
    alignment: 'left' | 'center' | 'right';
}

type StyleOptionsProps = {
    style: StyleProps;
    onStyleChange: (style: Partial<StyleProps>) => void;
    sectionName: string;
}

const StyleOptions = ({ style, onStyleChange, sectionName }: StyleOptionsProps) => {
    const getAlignmentIcon = (alignment: string) => {
        switch (alignment) {
            case 'left': return <FaAlignLeft className="w-4 h-4" />;
            case 'center': return <FaAlignCenter className="w-4 h-4" />;
            case 'right': return <FaAlignRight className="w-4 h-4" />;
            default: return <FaAlignLeft className="w-4 h-4" />;
        }
    };

    const alignmentOptions = [
        { value: 'left', label: 'Left', icon: <FaAlignLeft className="w-4 h-4" /> },
        { value: 'center', label: 'Center', icon: <FaAlignCenter className="w-4 h-4" /> },
        { value: 'right', label: 'Right', icon: <FaAlignRight className="w-4 h-4" /> }
    ];

    return (
        <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                        <FaPalette className="w-4 h-4 text-violet-600" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold tracking-tight">{sectionName} Styling</h3>
                        <p className="text-xs text-muted-foreground">
                            Customize the appearance and alignment of your {sectionName.toLowerCase()} section
                        </p>
                    </div>
                </div>
            </div>

            
            {/* Text Style Section */}
            <Card className="border-border/50 flex justify-between items-center">
                <CardContent className="space-y-4 flex flex-col justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="bold-checkbox"
                            checked={style.bold}
                            onCheckedChange={(checked) => onStyleChange({ bold: !!checked })}
                            className="border-primary/80"
                        />
                        <Label 
                            htmlFor="bold-checkbox" 
                            className="text-sm font-medium cursor-pointer flex items-center gap-2"
                        >
                            <FaBold className="w-3 h-3" />
                            Bold text
                        </Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Make your {sectionName.toLowerCase()} text appear in bold weight
                    </p>
                </CardContent>
                <CardContent className="space-y-4">
                    <div className="space-y-3">                        
                        <Select
                            value={style.alignment}
                            onValueChange={(value: 'left' | 'center' | 'right') => onStyleChange({ alignment: value })}
                        >
                            <SelectTrigger className="w-full max-w-xs border-border/50 focus:border-border transition-colors">
                                <SelectValue placeholder="Select alignment" />
                            </SelectTrigger>
                            <SelectContent>
                                {alignmentOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <div className="flex items-center gap-2">
                                            {option.icon}
                                            <span className="font-medium">{option.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                       
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Set the horizontal alignment for your {sectionName.toLowerCase()} content
                    </p>
                </CardContent>
            </Card>

           
        </div>
    );
};

export default StyleOptions;