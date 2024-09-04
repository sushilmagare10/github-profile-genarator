export type HeightType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const heightValues: Record<HeightType, number> = {
    xs: 28,
    sm: 32,
    md: 36,
    lg: 40,
    xl: 44,
    xxl: 48
};

export type GapType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const gapValues: Record<GapType, number> = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 18
};

export type AlignmentType = 'left' | 'center' | 'right';
