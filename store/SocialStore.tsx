import { create } from 'zustand';
import { HeightType, GapType, AlignmentType } from '../types/common';

type Icon = {
    id: string;
    url: string;
    href: string;
};

type SocialState = {
    icons: Icon[];
    selectedStyle: string;
    sectionStyle: AlignmentType;
    gap: GapType;
    iconHeight: HeightType;
    setIconHeight: (height: HeightType) => void;
    setIcons: (icons: Icon[]) => void;
    addIcon: (icon: Icon) => void;
    removeIcon: (id: string) => void;
    setSelectedStyle: (style: string) => void;
    setSectionStyle: (sectionStyle: AlignmentType) => void;
    setGap: (gap: GapType) => void;
};


const SocialData = {
    "shieldIcons": [
        {
            id: "github",
            label: "GitHub",
            url: "https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white",
            href: (username: string) => `https://github.com/${username}`
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            url: "https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white",
            href: (username: string) => `https://www.linkedin.com/in/${username}`
        },
        {
            id: "twitter",
            label: "Twitter",
            url: "https://img.shields.io/badge/Twitter-000000?logo=X&logoColor=white",
            href: (username: string) => `https://twitter.com/${username}`
        },
    ],
};

const useSocialStore = create<SocialState>((set) => ({
    icons: [],
    selectedStyle: "for-the-badge",
    sectionStyle: "left",
    gap: 'xs',
    iconHeight: 'xs',
    setIconHeight: (iconHeight) => set({ iconHeight }),
    setIcons: (icons) => set({ icons }),
    addIcon: (icon) => set((state) => ({
        icons: [...state.icons.filter(i => i.id !== icon.id), icon]
    })),
    removeIcon: (id) => set((state) => ({
        icons: state.icons.filter(icon => icon.id !== id)
    })),
    setSelectedStyle: (style) => set(() => ({ selectedStyle: style })),
    setSectionStyle: (sectionStyle) => set({ sectionStyle }),
    setGap: (gap) => set({ gap }),
}));


const initializeStore = () => {
    const store = useSocialStore.getState();
    const dummyIcons = [
        { id: "github", url: SocialData.shieldIcons.find(icon => icon.id === "github")!.url, href: SocialData.shieldIcons.find(icon => icon.id === "github")!.href("sushilmagare10") },
        { id: "linkedin", url: SocialData.shieldIcons.find(icon => icon.id === "linkedin")!.url, href: SocialData.shieldIcons.find(icon => icon.id === "linkedin")!.href("sushil-magare") },
        { id: "twitter", url: SocialData.shieldIcons.find(icon => icon.id === "twitter")!.url, href: SocialData.shieldIcons.find(icon => icon.id === "twitter")!.href("Sushil__SM") },
    ];
    store.setIcons(dummyIcons);
};

initializeStore();

export default useSocialStore;
