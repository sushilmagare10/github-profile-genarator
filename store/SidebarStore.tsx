import { create } from 'zustand'

type SidebarType = {
    isOpen: boolean;
    activeSection: string;
    toggleSidebar: () => void;
    setActiveSection: (section: string) => void;
    setIsOpen: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarType>((set) => ({
    isOpen: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    activeSection: 'introduction',
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    setActiveSection: (section) => set({ activeSection: section }),
    setIsOpen: (isOpen) => set({ isOpen }),
}))

export default useSidebarStore
