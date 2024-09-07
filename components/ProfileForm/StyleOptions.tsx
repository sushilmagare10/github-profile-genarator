import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useIntroductionStore from '@/store/IntroStore';


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
    return (
        <div className="flex flex-col mt-2">
            <h4 className="font-semibold">{sectionName} Style Options:</h4>
            <div className="flex items-center gap-4 mt-2">
                <Label>Bold</Label>
                <Checkbox
                    checked={style.bold}
                    onCheckedChange={(checked) => onStyleChange({ bold: !!checked })}
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
        </div>
    );
};

export default StyleOptions;