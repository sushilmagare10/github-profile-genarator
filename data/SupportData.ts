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
            url: "https://img.shields.io/badge/Ko--fi-343B45?logo=kofi&logoColor=Black",
            href: (username: string) => `https://ko-fi.com/${username}`
        },
        {
            id: "buymeacoffee",
            label: "Buy Me a Coffee",
            url: "https://img.shields.io/badge/Buy%20Me%20a%20Coffee-fde047?logo=buy-me-a-coffee&logoColor=white",
            href: (username: string) => `https://buymeacoffee.com/${username}`
        },
        {
            id: "paypal",
            label: "PayPal",
            url: "https://img.shields.io/badge/PayPal-00457C?logo=paypal&logoColor=white",
            href: (username: string) => `https://paypal.me/${username}`
        },
        
    ],
};
