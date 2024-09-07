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
    iconHeight: 'md',
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
        { id: "JavaScript-skillicons", label: "JavaScript", url: "https://skillicons.dev/icons?i=js" },
        { id: "React-skillicons", label: "React", url: "https://skillicons.dev/icons?i=react" },
        { id: "Node.js-skillicons", label: "Node.js", url: "https://skillicons.dev/icons?i=nodejs" },
        { id: "TypeScript-skillicons", label: "TypeScript", url: "https://skillicons.dev/icons?i=ts" },
        { id: "Python-skillicons", label: "Python", url: "https://skillicons.dev/icons?i=python" },
        { id: "React-Devicons-1", label: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { id: "Tailwind CSS-Devicons-1", label: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { id: "Prisma-Devicons-2", label: "Prisma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original-wordmark.svg" },
        { id: "Next.js-Devicons-1", label: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },

    ];
    store.setIcons(dummyIcons);
};

initializeStore();

export default useSkillsStore;
