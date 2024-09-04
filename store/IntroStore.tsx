import { create } from 'zustand';
import { AlignmentType } from '../types/common';

type FieldStyle = {
    bold: boolean;
    fontSize: number;
    margin: number;
    alignment: AlignmentType;
}

type CurrentlyDoing = {
    working: string;
    learning: string;
    askMeAbout: string;
    funFact: string;
    portfolio: string;
    website: string;
    blog: string;
}

type IntroductionState = {
    headerImage: string;
    name: string;
    aboutMe: string;
    currentlyDoing: CurrentlyDoing;
    fieldStyles: {
        headerImage: FieldStyle;
        name: FieldStyle;
        aboutMe: FieldStyle;
        currentlyDoing: FieldStyle;
    };
    profileViews: string;
    setProfileViews: (username: string) => void;
    setFieldStyle: (field: keyof IntroductionState['fieldStyles'], style: Partial<FieldStyle>) => void;
    setHeaderImage: (image: string) => void;
    setName: (name: string) => void;
    setAboutMe: (aboutMe: string) => void;
    setCurrentlyDoing: (key: keyof CurrentlyDoing, value: string) => void;
}

const useIntroductionStore = create<IntroductionState>((set) => ({
    headerImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/79731568097599.5b50bca477735.jpg',
    name: '👋 Hi, my name is Sushil Magare',
    aboutMe: '🚀 Passionate fullstack web developer, creating robust and scalable web applications. Skilled in both front-end and back-end technologies, with a keen eye for user experience and performance optimization.',
    currentlyDoing: {
        working: '💻 Developing a new e-commerce platform using React and Node.js',
        learning: '📚 Exploring Zustand',
        askMeAbout: '💡 JavaScript, React, Node.js, MongoDB, and RESTful APIs',
        funFact: '🎢 I once debugged a issue while on a roller coaster!',
        portfolio: '🔗 https://sushilmagare.dev/portfolio',
        website: '🌐 https://sushilmagare.dev',
        blog: '✍️ https://sushilmagare.dev/blog'
    },
    fieldStyles: {
        headerImage: { bold: false, fontSize: 16, margin: 0, alignment: 'center' },
        name: { bold: true, fontSize: 24, margin: 16, alignment: 'center' },
        aboutMe: { bold: false, fontSize: 16, margin: 12, alignment: 'left' },
        currentlyDoing: { bold: false, fontSize: 14, margin: 8, alignment: 'left' },
    },
    profileViews: '',
    setProfileViews: (username) => set({ profileViews: username }),
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
}));

export default useIntroductionStore;