import { create } from 'zustand';
import { HeightType, GapType, AlignmentType } from '../types/common';

type Support = {
    id: string;
    url: string;
    href: string;
}

type SupportStore = {
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


const SupportData = {
    "shieldIcons": [
        {
            id: "ko-fi",
            label: "Ko-fi",
            url: "https://img.shields.io/badge/Ko--fi-343B45?logo=kofi&logoColor=Black",
            href: (username: string) => `https://ko-fi.com/${username}`
        },
    ],
};


const useSupportStore = create<SupportStore>((set) => ({
    selectedProvider: "shields.io",
    selectedStyle: "for-the-badge",
    icons: [],
    iconHeight: "md",
    gap: "xs",
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


const initializeStore = () => {
    const store = useSupportStore.getState();
    const dummyIcons = [
        {
            id: "ko-fi",
            url: SupportData.shieldIcons.find(icon => icon.id === "ko-fi")!.url,
            href: SupportData.shieldIcons.find(icon => icon.id === "ko-fi")!.href("sushil_"),
        },
    ];
    store.setIcons(dummyIcons);
};

initializeStore();



export default useSupportStore;
