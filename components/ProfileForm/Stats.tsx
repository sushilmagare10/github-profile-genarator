"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const Themes = [
    "default",
    "dark",
    "radical",
    "merko",
    "gruvbox",
    "tokyonight",
    "onedark",
    "cobalt",
    "synthwave",
    "highcontrast",
    "dracula",
    "prussian",
    "monokai",
    "vue",
    "vue-dark",
    "shades-of-purple",
    "nightowl",
    "buefy",
    "blue-green",
    "algolia",
    "great-gatsby",
    "darcula",
    "bear",
    "solarized-dark",
    "solarized-light",
    "chartreuse-dark",
    "nord",
    "gotham",
    "material-palenight",
    "graywhite",
    "vision-friendly-dark",
    "ayu-mirage",
    "midnight-purple",
    "calm",
    "flag-india",
    "omni",
    "react",
    "jolly",
    "maroongold",
    "yeblu",
    "blueberry",
    "slateorange",
    "kacho_ga",
    "outrun",
    "ocean_dark",
    "city_lights",
    "github_dark",
    "discord_old_blurple",
    "aura_dark",
    "panda",
    "noctis_minimus",
    "cobalt2",
    "swift",
    "aura",
    "apprentice",
    "moltack",
    "codeSTACKr",
    "rose_pine",
]

const Stats = () => {
    const [showIcons, setShowIcons] = useState(true)
    const [theme, setTheme] = useState("radical")
    const [streakTheme, setStreakTheme] = useState("default")
    const [langTheme, setLangTheme] = useState("default")
    const [trophyTheme, setTrophyTheme] = useState("default")
    const [profileTheme, setProfileTheme] = useState("default")
    const [wakatimeTheme, setWakatimeTheme] = useState("default")
    const [contributionTheme, setContributionTheme] = useState("default")

    const username = "sushilmagare10"

    return (
        <Card className='w-full flex flex-col p-0 border-none gap-4 '>
            <CardTitle>GitHub Stats for {username}</CardTitle>
            <CardContent className='p-0 flex flex-col gap-4'>
                <StatCard
                    title="GitHub Stats"
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=${showIcons}&theme=${theme}`}
                    showIcons={showIcons}
                    setShowIcons={setShowIcons}
                    selectedTheme={theme}
                    setSelectedTheme={setTheme}
                    themes={Themes}
                />
                <StatCard
                    title="GitHub Streak Stats"
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${streakTheme}`}
                    selectedTheme={streakTheme}
                    setSelectedTheme={setStreakTheme}
                    themes={Themes}
                />
                <StatCard
                    title="Top Languages"
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${langTheme}`}
                    selectedTheme={langTheme}
                    setSelectedTheme={setLangTheme}
                    themes={Themes}
                />
                <StatCard
                    title="GitHub Trophies"
                    src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=${trophyTheme}`}
                    selectedTheme={trophyTheme}
                    setSelectedTheme={setTrophyTheme}
                    themes={Themes}
                />
                <StatCard
                    title="Profile Details"
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=${profileTheme}`}
                    selectedTheme={profileTheme}
                    setSelectedTheme={setProfileTheme}
                    themes={Themes}
                />
                <StatCard
                    title="Wakatime Stats"
                    src={`https://github-readme-stats.vercel.app/api/wakatime?username=${username}&layout=compact&theme=${wakatimeTheme}`}
                    selectedTheme={wakatimeTheme}
                    setSelectedTheme={setWakatimeTheme}
                    themes={Themes}
                />
                <StatCard
                    title="GitHub Contribution Graph"
                    src={`https://activity-graph.herokuapp.com/graph?username=${username}&theme=${contributionTheme}`}
                    selectedTheme={contributionTheme}
                    setSelectedTheme={setContributionTheme}
                    themes={Themes}
                />
            </CardContent>
        </Card>
    )
}

const StatCard = ({ title, src, showIcons, setShowIcons, selectedTheme, setSelectedTheme, themes }) => (
    <Card className='rounded-sm flex justify-betweenv p-0 items-center gap-1 h-60'>
        <CardContent className='flex flex-col flex-[2] h-full px-2 py-0'>
            <CardHeader className='p-0 font-semibold text-primary mt-2'>{title}</CardHeader>
            <img src={src} alt={title} className='mt-4 h-56 w-full' />
        </CardContent>
        <CardContent className=' flex-1 mt-4'>
            {setShowIcons && (
                <div className='flex justify-between items-center gap-1'>
                    <label>Show Icons</label>
                    <Switch checked={showIcons} onCheckedChange={setShowIcons} className='border-black/10' />
                </div>
            )}
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select a Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Themes</SelectLabel>
                        {themes.map(theme => (
                            <SelectItem key={theme} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CardContent>
    </Card>
)

export default Stats
