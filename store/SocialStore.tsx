import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Icon = {
    id: string;
    url: string;
    href: string;
};

type HeightType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const heightValues: Record<HeightType, number> = {
    xs: 16,
    sm: 18,
    md: 24,
    lg: 28,
    xl: 32,
};

type GapType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const gapValues: Record<GapType, number> = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 18
};

type SocialState = {
    icons: Icon[];
    userName: string;
    sectionStyle: string;
    gap: GapType;
    iconHeight: HeightType;
    setIconHeight: (height: HeightType) => void;
    setIcons: (icons: Icon[]) => void;
    addIcon: (icon: Icon) => void;
    removeIcon: (id: string) => void;
    setUserName: (userName: string) => void;
    setSectionStyle: (sectionStyle: string) => void;
    setGap: (gap: GapType) => void;
};

const useSocialStore = create<SocialState>()(
    persist(
        (set) => ({
            icons: [],
            userName: "",
            sectionStyle: "left",
            gap: 'sm',
            iconHeight: 'sm',
            setIconHeight: (iconHeight) => set({ iconHeight }),
            setIcons: (icons) => set({ icons }),
            addIcon: (icon) => set((state) => ({
                icons: [...state.icons.filter(i => i.id !== icon.id), icon]
            })),
            removeIcon: (id) => set((state) => ({
                icons: state.icons.filter(icon => icon.id !== id)
            })),
            setUserName: (userName) => set({ userName }),
            setSectionStyle: (sectionStyle) => set({ sectionStyle }),
            setGap: (gap) => set({ gap })
        }),
        {
            name: 'social-storage',
        }
    )
);

export default useSocialStore;
