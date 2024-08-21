export type HeightType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const heightValues: Record<HeightType, number> = {
    xs: 16,
    sm: 18,
    md: 24,
    lg: 28,
    xl: 32,
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
