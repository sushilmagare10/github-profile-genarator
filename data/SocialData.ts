export const SocialData = {
    "shieldIcons": [
        {
            id: "behance",
            label: "Behance",
            url: "https://img.shields.io/badge/-Behance-blue?logo=behance&logoColor=white",
            href: (username: string) => `https://www.behance.net/${username}`
        },
        {
            id: "bitbucket",
            label: "Bitbucket",
            url: "https://img.shields.io/badge/Bitbucket-0747a6?logo=bitbucket&logoColor=white",
            href: (username: string) => `https://bitbucket.org/${username}`
        },
        {
            id: "codechef",
            label: "Codechef",
            url: "https://img.shields.io/badge/Codechef-%23B92B27.svg?&logo=Codechef&logoColor=white",
            href: (username: string) => `https://www.codechef.com/users/${username}`
        },
        {
            id: "codeforces",
            label: "Codeforces",
            url: "https://img.shields.io/badge/Codeforces-445f9d?logo=Codeforces&logoColor=white",
            href: (username: string) => `https://codeforces.com/profile/${username}`
        },
        {
            id: "codepen",
            label: "Codepen",
            url: "https://img.shields.io/badge/Codepen-000000?logo=codepen&logoColor=white",
            href: (username: string) => `https://codepen.io/${username}`
        },
        {
            id: "deviantart",
            label: "DeviantArt",
            url: "https://img.shields.io/badge/DeviantArt-05CC47?logo=deviantart&logoColor=white",
            href: (username: string) => `https://www.deviantart.com/${username}`
        },
        {
            id: "dribbble",
            label: "Dribbble",
            url: "https://img.shields.io/badge/Dribbble-EA4C89?logo=dribbble&logoColor=white",
            href: (username: string) => `https://dribbble.com/${username}`
        },
        {
            id: "facebook",
            label: "Facebook",
            url: "https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white",
            href: (username: string) => `https://www.facebook.com/${username}`
        },
        {
            id: "github",
            label: "GitHub",
            url: "https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white",
            href: (username: string) => `https://github.com/${username}`
        },
        {
            id: "instagram",
            label: "Instagram",
            url: "https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=white",
            href: (username: string) => `https://www.instagram.com/${username}`
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            url: "https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white",
            href: (username: string) => `https://www.linkedin.com/in/${username}`
        },
        {
            id: "pinterest",
            label: "Pinterest",
            url: "https://img.shields.io/badge/Pinterest-%23E60023.svg?&logo=Pinterest&logoColor=white",
            href: (username: string) => `https://www.pinterest.com/${username}`
        },
        {
            id: "twitter",
            label: "Twitter",
            url: "https://img.shields.io/badge/Twitter-000000?logo=X&logoColor=white",
            href: (username: string) => `https://twitter.com/${username}`
        },
        {
            id: "youtube",
            label: "YouTube",
            url: "https://img.shields.io/badge/YouTube-FF0000?logo=youtube&logoColor=white",
            href: (username: string) => `https://www.youtube.com/@${username.trim()}`
        },
        {
            id: "tiktok",
            label: "TikTok",
            url: "https://img.shields.io/badge/TikTok-000000?logo=tiktok&logoColor=white",
            href: (username: string) => `https://www.tiktok.com/@${username.trim()}`
        },
        {
            id: "reddit",
            label: "Reddit",
            url: "https://img.shields.io/badge/Reddit-FF4500?logo=reddit&logoColor=white",
            href: (username: string) => `https://www.reddit.com/user/${username}`
        }
    ],
};