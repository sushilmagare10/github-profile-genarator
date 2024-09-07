import { create } from 'zustand';

export type CommonCardProps = {
    title_color?: string;
    text_color?: string;
    icon_color?: string;
    border_color?: string;
    bg_color?: string;
    hide_border?: boolean;
    theme?: string;
    cache_seconds?: number;
    locale?: string;
    border_radius?: number;
};

export type StatsCardProps = CommonCardProps & {
    hide?: string;
    hide_title?: boolean;
    card_width?: number;
    hide_rank?: boolean;
    rank_icon?: 'default' | 'github' | 'percentile';
    show_icons?: boolean;
    include_all_commits?: boolean;
    line_height?: number;
    exclude_repo?: string;
    custom_title?: string;
    text_bold?: boolean;
    disable_animations?: boolean;
    ring_color?: string;
    number_format?: 'short' | 'long';
    show?: string[];
};

export type TopLangsCardProps = CommonCardProps & {
    hide?: string;
    hide_title?: boolean;
    layout?: 'normal' | 'compact' | 'donut' | 'donut-vertical' | 'pie';
    card_width?: number;
    langs_count?: number;
    custom_title?: string;
    disable_animations?: boolean;
    hide_progress?: boolean;
};

export type StreakCardProps = {
    type: 'streak';
    user: string;
    theme?: string;
    hide_border?: boolean;
    border_radius?: number;
    background?: string;
    border?: string;
    stroke?: string;
    ring?: string;
    fire?: string;
    currStreakNum?: string;
    sideNums?: string;
    currStreakLabel?: string;
    sideLabels?: string;
    dates?: string;
    excludeDaysLabel?: string;
    date_format?: string;
    locale?: string;
    mode?: 'daily' | 'weekly';
    exclude_days?: string[];
    disable_animations?: boolean;
    card_width?: number;
    card_height?: number;
    hide_total_contributions?: boolean;
    hide_current_streak?: boolean;
    hide_longest_streak?: boolean;
    starting_year?: number;
};

export type RepoCardProps = CommonCardProps & {
    repo: string;
    show_owner?: boolean;
};


export type CardType = 'stats' | 'top-langs' | 'repo-card' | 'streak';

export type Card = {
    type: CardType;
} & (StatsCardProps | TopLangsCardProps | RepoCardProps | StreakCardProps);

type StatsCardStore = {
    username: string;
    cards: Card[];
    addedCardTypes: Set<CardType>;
    setUsername: (username: string) => void;
    addCard: (cardType: CardType, repoName?: string) => void;
    removeCard: (index: number) => void;
    updateCard: (index: number, updates: Partial<Card>) => void;
    setCards: (cards: Card[]) => void;
};

const getDefaultProps = (type: CardType): Card => {
    const commonProps: CommonCardProps = {
        theme: 'default',
        cache_seconds: 1800,
        border_radius: 4,
    };

    switch (type) {
        case 'stats':
            return {
                type,
                ...commonProps,
                hide_title: false,
                hide_rank: false,
                show_icons: true,
                include_all_commits: true,
                line_height: 25,
            };
        case 'top-langs':
            return {
                type,
                ...commonProps,
                hide_title: false,
                layout: 'compact',
                langs_count: 5,
                card_width: 400,
                hide_progress: false,
            };
        case 'repo-card':
            return {
                type,
                ...commonProps,
                show_owner: false,
                repo: '',
            };
        case 'streak':
            return {
                type: 'streak',
                user: '',
                theme: 'default',
                hide_border: false,
                border_radius: 4.5,
                date_format: "M j[, Y]",
                mode: 'daily',
                disable_animations: false,
                hide_total_contributions: false,
                hide_current_streak: false,
                hide_longest_streak: false,
                exclude_days: [],
                locale: 'en',
                card_height: 250
            };
    }

};


const CardData = {
    dummyCards: [
        {
            type: 'stats' as const,
            theme: 'react',
            hide_title: false,
            hide_rank: false,
            show_icons: false,
            include_all_commits: false,
            count_private: true,
            line_height: 25
        },
        {
            type: 'top-langs' as const,
            theme: "react",
            hide_title: false,
            layout: 'compact',
            langs_count: 6,
            hide_progress: false,
            card_width: 400,

        },
        {
            type: 'streak' as const,
            theme: 'react',
            hide_border: false,
            date_format: "M j[, Y]",
            mode: 'daily',
            hide_total_contributions: false,
            hide_current_streak: false,
            hide_longest_streak: false,
            card_height: 200
        },
        {
            type: 'repo-card' as const,
            bg_color: '35,2dd4bf,784BA0,2B86C5',
            show_owner: true,
            title_color: "fff",
            repo: 'Bubble',
            text_color: "fff",
            icon_color: "fff",
        },
    ]
};


const useStatsCardStore = create<StatsCardStore>((set) => ({
    username: 'sushilmagare10',
    cards: [],
    addedCardTypes: new Set<CardType>(),
    setUsername: (username) => set({ username }),

    addCard: (type) => {
        let cardAdded = false;
        set((state) => {
            if (type !== 'repo-card' && state.cards.some(card => card.type === type)) {
                return state;
            }
            const newCard = getDefaultProps(type);
            cardAdded = true;
            return {
                cards: [...state.cards, newCard],
                addedCardTypes: new Set([...Array.from(state.addedCardTypes), type])
            };
        });
        return cardAdded;
    },

    removeCard: (index) => set((state) => {
        const removedCard = state.cards[index];
        const newCards = state.cards.filter((_, i) => i !== index);
        const newAddedCardTypes = new Set(state.addedCardTypes);

        if (removedCard.type !== 'repo-card' && !newCards.some(card => card.type === removedCard.type)) {
            newAddedCardTypes.delete(removedCard.type);
        }

        return {
            cards: newCards,
            addedCardTypes: new Set(Array.from(newAddedCardTypes))
        };
    }),

    updateCard: (index, updates) => set((state) => ({
        cards: state.cards.map((card, i) => i === index ? { ...card, ...updates } : card)
    })),
    setCards: (cards) => set({ cards })
}));

const initializeStore = () => {
    const store = useStatsCardStore.getState();
    store.setCards(CardData.dummyCards);
};

initializeStore();

export default useStatsCardStore;