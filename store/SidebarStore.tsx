import { create } from 'zustand'

type sidebarType = {
    isOpen: boolean;
    activeSection: string;
    toggleSidebar: () => void;
    setActiveSection: (section: string) => void;
}

const useSidebarStore = create<sidebarType>((set) => ({
    isOpen: false,
    activeSection: "introduction",
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    setActiveSection: (section) => set({ activeSection: section })
}))

export default useSidebarStore