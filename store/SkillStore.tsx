import { create } from 'zustand';
import { HeightType, GapType, AlignmentType } from '../types/common';

interface Skill {
    id: string;
    label: string;
}

interface SkillsStore {
    selectedProvider: string;
    selectedStyle: string;
    selectedCategory: string;
    icons: Skill[];
    iconHeight: HeightType;
    gap: GapType;
    alignment: AlignmentType;
    setSelectedProvider: (provider: string) => void;
    setSelectedStyle: (style: string) => void;
    setSelectedCategory: (category: string) => void;
    setIcons: (icons: Skill[]) => void;
    addIcon: (icon: Skill) => void;
    removeIcon: (id: string) => void;
    setIconHeight: (height: HeightType) => void;
    setGap: (gap: GapType) => void;
    setAlignment: (alignment: AlignmentType) => void;
}

const useSkillsStore = create<SkillsStore>((set) => ({
    selectedProvider: 'shields.io',
    selectedStyle: 'flat',
    selectedCategory: 'Languages',
    icons: [],
    iconHeight: 'md',
    gap: 'md',
    alignment: 'left',
    setSelectedProvider: (provider) => set(() => ({ selectedProvider: provider })),
    setSelectedStyle: (style) => set(() => ({ selectedStyle: style })),
    setSelectedCategory: (category) => set(() => ({ selectedCategory: category })),
    setIcons: (icons) => set({ icons }),
    addIcon: (icon) => set((state) => ({
        icons: state.icons.some(existingIcon => existingIcon.id === icon.id)
            ? state.icons
            : [...state.icons, icon]
    })),
    removeIcon: (id) => set((state) => ({
        icons: state.icons.filter((icon) => icon.id !== id)
    })),
    setIconHeight: (height) => set(() => ({ iconHeight: height })),
    setGap: (gap) => set(() => ({ gap })),
    setAlignment: (alignment) => set(() => ({ alignment })),
}));

export default useSkillsStore;
