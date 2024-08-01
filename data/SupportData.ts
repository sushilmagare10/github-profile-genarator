export const SupportData = {
    "shieldIcons": [
        {
            id: "patreon",
            label: "Patreon",
            url: "https://img.shields.io/badge/Patreon-F96854?logo=patreon&logoColor=white",
            href: (username: string) => `https://www.patreon.com/${username}`
        },
        {
            id: "ko-fi",
            label: "Ko-fi",
            url: "https://img.shields.io/badge/Ko--fi-F16061?logo=kofi&logoColor=white",
            href: (username: string) => `https://ko-fi.com/${username}`
        },
        {
            id: "buymeacoffee",
            label: "Buy Me a Coffee",
            url: "https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FC8F5F?logo=buy-me-a-coffee&logoColor=white",
            href: (username: string) => `https://buymeacoffee.com/${username}`
        },
        {
            id: "paypal",
            label: "PayPal",
            url: "https://img.shields.io/badge/PayPal-00457C?logo=paypal&logoColor=white",
            href: (username: string) => `https://paypal.me/${username}`
        },
        {
            id: "liberapay",
            label: "Liberapay",
            url: "https://img.shields.io/badge/Liberapay-F9A821?logo=liberapay&logoColor=white",
            href: (username: string) => `https://liberapay.com/${username}`
        },
        {
            id: "flattr",
            label: "Flattr",
            url: "https://img.shields.io/badge/Flattr-0074E4?logo=flattr&logoColor=white",
            href: (username: string) => `https://flattr.com/profile/${username}`
        }
    ],
    "simpleIcons": [
        {
            id: "simple-icons-patreon",
            label: "Patreon",
            url: "https://img.simpleicons.org/patreon/F96854?logo=patreon&logoColor=white",
            href: (username: string) => `https://www.patreon.com/${username}`
        },
        {
            id: "simple-icons-kofi",
            label: "Ko-fi",
            url: "https://img.simpleicons.org/kofi/F16061?logo=kofi&logoColor=white",
            href: (username: string) => `https://ko-fi.com/${username}`
        },
        {
            id: "simple-icons-buymeacoffee",
            label: "Buy Me a Coffee",
            url: "https://simpleicons.org/icons/buymeacoffee.svg",
            href: (username: string) => `https://buymeacoffee.com/${username}`
        },
        {
            id: "simple-icons-paypal",
            label: "PayPal",
            url: "https://img.simpleicons.org/paypal/00457C?logo=paypal&logoColor=white",
            href: (username: string) => `https://paypal.me/${username}`
        },
        {
            id: "simple-icons-liberapay",
            label: "Liberapay",
            url: "https://img.simpleicons.org/liberapay/F9A821?logo=liberapay&logoColor=white",
            href: (username: string) => `https://liberapay.com/${username}`
        },
        {
            id: "simple-icons-flattr",
            label: "Flattr",
            url: "https://img.simpleicons.org/flattr/0074E4?logo=flattr&logoColor=white",
            href: (username: string) => `https://flattr.com/profile/${username}`
        }
    ],
}