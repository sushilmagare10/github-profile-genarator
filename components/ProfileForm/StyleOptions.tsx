import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useIntroductionStore from '@/store/IntroStore'; // Adjust the import path as needed

type FieldStyle = ReturnType<typeof useIntroductionStore>['fieldStyles']['headerImage'];

interface StyleOptionsProps {
    style: FieldStyle;
    onStyleChange: (style: Partial<FieldStyle>) => void;
    sectionName: string;
}

const StyleOptions = ({ style, onStyleChange, sectionName }: StyleOptionsProps) => {
    return (
        <div className="flex flex-col mt-2">
            <h4 className="font-semibold">{sectionName} Style Options:</h4>
            <div className="flex items-center gap-3 mt-2">
                <Checkbox
                    checked={style.bold}
                    onCheckedChange={(checked) => onStyleChange({ bold: !!checked })}
                />
                <Label>Bold</Label>

                <Checkbox
                    checked={style.italic}
                    onCheckedChange={(checked) => onStyleChange({ italic: !!checked })}
                />
                <Label>Italic</Label>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <Label>Font Size:</Label>
                <Input
                    type="number"
                    value={style.fontSize}
                    onChange={(e) => onStyleChange({ fontSize: Number(e.target.value) })}
                    className="w-20"
                />

                <Label>Alignment:</Label>
                <Select
                    value={style.alignment}
                    onValueChange={(value: 'left' | 'center' | 'right') => onStyleChange({ alignment: value })}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">

            </div>
        </div>
    );
};

export default StyleOptions;