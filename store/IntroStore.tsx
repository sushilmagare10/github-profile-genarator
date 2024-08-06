import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Alignment = 'left' | 'center' | 'right';

type FieldStyle = {
    bold: boolean;
    italic: boolean;
    fontSize: number;
    margin: number;
    alignment: Alignment;
    height: number;
    radius: number;
}

type CurrentlyDoing = {
    working: string;
    learning: string;
    askMeAbout: string;
    funFact: string;
}

type IntroductionState = {
    headerImage: string;
    name: string;
    aboutMe: string;
    currentlyDoing: CurrentlyDoing;
    visibleFields: {
        headerImage: boolean;
        introduction: boolean;
        aboutMe: boolean;
        currentlyDoing: boolean;
    };
    fieldStyles: {
        headerImage: FieldStyle;
        name: FieldStyle;
        aboutMe: FieldStyle;
        currentlyDoing: FieldStyle;
    };
    setFieldStyle: (field: keyof IntroductionState['fieldStyles'], style: Partial<FieldStyle>) => void;
    setHeaderImage: (image: string) => void;
    setName: (name: string) => void;
    setAboutMe: (aboutMe: string) => void;
    setCurrentlyDoing: (key: keyof CurrentlyDoing, value: string) => void;
    toggleField: (field: keyof IntroductionState['visibleFields']) => void;
}

const useIntroductionStore = create<IntroductionState>()(
    persist(
        (set) => ({
            headerImage: '',
            name: '',
            aboutMe: '',
            currentlyDoing: {
                working: '',
                learning: '',
                askMeAbout: '',
                funFact: '',
            },
            visibleFields: {
                headerImage: false,
                introduction: true,
                aboutMe: true,
                currentlyDoing: true,
            },
            fieldStyles: {
                headerImage: { bold: false, italic: false, fontSize: 16, margin: 0, alignment: 'left', height: 0, radius: 0 },
                name: { bold: true, italic: false, fontSize: 24, margin: 8, alignment: 'left', height: 0, radius: 0 },
                aboutMe: { bold: false, italic: false, fontSize: 16, margin: 8, alignment: 'left', height: 0, radius: 0 },
                currentlyDoing: { bold: false, italic: false, fontSize: 16, margin: 8, alignment: 'left', height: 0, radius: 0 },
            },
            setFieldStyle: (field, style) => set((state) => ({
                fieldStyles: {
                    ...state.fieldStyles,
                    [field]: { ...state.fieldStyles[field], ...style },
                },
            })),
            setHeaderImage: (image) => set({ headerImage: image }),
            setName: (name) => set({ name }),
            setAboutMe: (aboutMe) => set({ aboutMe }),
            setCurrentlyDoing: (key, value) => set((state) => ({
                currentlyDoing: { ...state.currentlyDoing, [key]: value }
            })),
            toggleField: (field) => set((state) => ({
                visibleFields: { ...state.visibleFields, [field]: !state.visibleFields[field] }
            }))
        }),
        {
            name: 'introduction-storage', // unique name for the storage
        }
    )
)

export default useIntroductionStore;
