import { create } from 'zustand';
import { HeightType, GapType, AlignmentType } from '../types/common';

interface Support {
    id: string;
    url: string;
    href: string;
}

interface SupportStore {
    selectedProvider: string;
    selectedStyle: string;
    icons: Support[];
    iconHeight: HeightType;
    gap: GapType;
    alignment: AlignmentType;
    setSelectedProvider: (provider: string) => void;
    setSelectedStyle: (provider: string) => void;
    setIcons: (icons: Support[]) => void;
    addIcon: (icon: Support) => void;
    removeIcon: (id: string) => void;
    setIconHeight: (height: HeightType) => void;
    setGap: (gap: GapType) => void;
    setAlignment: (alignment: AlignmentType) => void;
}

const useSupportStore = create<SupportStore>((set) => ({
    selectedProvider: "shields.io",
    selectedStyle: "flat",
    icons: [],
    iconHeight: "md",
    gap: "md",
    alignment: 'left',
    setSelectedProvider: (provider) => set({ selectedProvider: provider }),
    setSelectedStyle: (style) => set({ selectedStyle: style }),
    setIcons: (icons) => set({ icons }),
    addIcon: (icon) => set((state) => ({
        icons: [...state.icons.filter(i => i.id !== icon.id), icon]
    })),
    removeIcon: (id) => set((state) => ({
        icons: state.icons.filter(icon => icon.id !== id)
    })),
    setIconHeight: (height) => set({ iconHeight: height }),
    setGap: (gap) => set({ gap }),
    setAlignment: (alignment) => set({ alignment }),
}));

export default useSupportStore;
