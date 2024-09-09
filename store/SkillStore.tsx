import { create } from 'zustand';
import { HeightType, GapType, AlignmentType } from '../types/common';

type Skill = {
    id: string;
    label: string;
    url: string
}

type SkillsStore = {
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
    selectedProvider: 'Devicons',
    selectedStyle: 'for-the-badge',
    selectedCategory: 'Languages',
    icons: [],
    iconHeight: 'sm',
    gap: 'xs',
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


const initializeStore = () => {
    const store = useSkillsStore.getState();
    const dummyIcons: Skill[] = [
        { id: "JavaScript-shields", label: "JavaScript", url: "https://img.shields.io/badge/JavaScript-F7DF1C?logo=javascript&logoColor=white" },
        { id: "React-shields", label: "React", url: "https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" },
        { id: "TypeScript-shields", label: "TypeScript", url: "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" },
        { id: "Nodejs-shields", label: "Node.js", url: "https://img.shields.io/badge/Node.js-8CC84B?logo=node.js&logoColor=white" },
        { id: "TailwindCSS-shields", label: "Tailwind CSS", url: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" },
        { id: "Prisma-shields", label: "Prisma", url: "https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" },
        { id: "GSAP-shields", label: "GSAP", url: "https://img.shields.io/badge/GSAP-00D084?logo=gsap&logoColor=white" },
        { id: "Express-shields", label: "Express", url: "https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" },
        { id: "MongoDB-shields", label: "MongoDB", url: "https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white" },
        { id: "PostgreSQL-shields", label: "PostgreSQL", url: "https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white" },
        { id: "MySQL-shields", label: "MySQL", url: "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" },

    ];
    store.setIcons(dummyIcons);
};

initializeStore();

export default useSkillsStore;
