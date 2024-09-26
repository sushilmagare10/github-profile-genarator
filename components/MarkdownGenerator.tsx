import React, { useState } from 'react';
import useIntroductionStore from '@/store/IntroStore';
import useSocialStore from '@/store/SocialStore';
import useSkillsStore from '@/store/SkillStore';
import useSupportStore from '@/store/SupportStore';
import useStatsCardStore, { RepoCardProps } from '@/store/StatsCardStore';
import { heightValues, gapValues } from '@/types/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { IoLogoMarkdown } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion'


const MarkdownGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdownCode, setMarkdownCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { headerImage, name, aboutMe, currentlyDoing, fieldStyles, profileViews } = useIntroductionStore();
  const { gap, icons: socialIcons, sectionStyle, iconHeight: socialIconHeight } = useSocialStore();
  const { icons: skillIcons, iconHeight: skillIconHeight, gap: skillIconsGap, alignment, layout: SkillLayout, selectedProvider } = useSkillsStore();
  const { gap: SupportIconGap, alignment: SupportAlignment, iconHeight: SupportIconsHeight, icons: SupportIcons } = useSupportStore();
  const { username, cards } = useStatsCardStore();

  const isShieldsIO = selectedProvider === 'shields.io';
  const iconsPerRow = isShieldsIO ? 6 : 12;

  const generateMarkdown = () => {
    let markdown = '';

    if (headerImage) {
      markdown += `![${name}](${headerImage})\n\n`;
    }

    if (profileViews) {
      markdown += `![Profile views](https://komarev.com/ghpvc/?username=${profileViews}&label=Profile%20views&color=0e75b6&style=flat)\n\n`;
    }

    if (name) {
      markdown += `<div id="toc">\n`;
      markdown += `  <ul align="${fieldStyles.name.alignment}" style="list-style: none">\n`;
      markdown += `    <summary>\n`;
      markdown += `      <h1>\n`;
      markdown += `        ${name}\n`;
      markdown += `      </h1>\n`;
      markdown += `    </summary>\n`;
      markdown += `  </ul>\n`;
      markdown += `</div>\n\n`;
    }

    if (socialIcons.length > 0) {
      markdown += `**<h3 align="${sectionStyle}">Connect with me:</h3>** \n`;
      markdown += `<p align="${sectionStyle}">`;
      markdown += socialIcons
        .filter(icon => icon.href)
        .map(icon =>
          `<a href="${icon.href}" target="_blank"><img src="${icon.url}" height="${heightValues[socialIconHeight]}" style="margin-right: ${gapValues[gap]}px"></a>`
        ).join(' ');
      markdown += '</p>\n\n';
    }

    if (aboutMe) {
      markdown += ` **<h3 align="${fieldStyles.aboutMe.alignment}">${aboutMe}</h3>**\n\n`;
    }

    if (Object.values(currentlyDoing).some(value => value)) {
      markdown += `**<h3 align="left">Rapid Fire</h3>**\n\n`;
      const fields = [
        { emoji: '💼', label: 'I\'m currently working on', value: currentlyDoing.working },
        { emoji: '🌱', label: 'I\'m currently learning', value: currentlyDoing.learning },
        { emoji: '💬', label: 'Ask me about', value: currentlyDoing.askMeAbout },
        { emoji: '⚡', label: 'Fun fact', value: currentlyDoing.funFact },
      ];

      fields.forEach(field => {
        if (field.value) {
          markdown += `- ${field.emoji} ${field.label}: **${field.value}**\n`;
        }
      });

      if (currentlyDoing.portfolio) {
        markdown += `- 📂 Portfolio: **<a href="${currentlyDoing.portfolio}" target="_blank">${currentlyDoing.portfolio}</a>**\n`;
      }
      if (currentlyDoing.blog) {
        markdown += `- 📝 Blog: **<a href="${currentlyDoing.blog}" target="_blank">${currentlyDoing.blog}</a>**\n\n`;
      }
      markdown += '\n';
    }

    if (skillIcons.length > 0) {
      markdown += ` **<h3 align="${alignment}">Skills</h3>**\n\n`;
      if (SkillLayout === "Layout-1") {
        markdown += `<div style="display: flex; flex-wrap: wrap; gap: ${gapValues[skillIconsGap]}px; justify-content: ${alignment};">`;
        markdown += skillIcons.map(icon =>
          `<img src="${icon.url}" height="${heightValues[skillIconHeight]}" alt="${icon.label}" style="margin-right: ${gapValues[skillIconsGap]}px">`
        ).join(' ');
        markdown += `</div>\n\n`;
      } else if (SkillLayout === "Layout-2") {
        markdown += `<table style="width: 100%; border: 0px solid white;">`;
        skillIcons.forEach((icon, index) => {
          if (index % iconsPerRow === 0) {
            markdown += `<tr>`;
          }
          markdown += `<td style="text-align: center; border: 0px; padding: 12px;">`;
          markdown += `<img src="${icon.url}" height="${heightValues[skillIconHeight]}" alt="${icon.label}"/>`;
          markdown += `</td>`;
          if (index % iconsPerRow === iconsPerRow - 1) {
            markdown += `</tr>`;
          }
        });
        markdown += `</table>\n\n`;
      }
    }


    if (cards.length > 0) {
      markdown += ` **<h3 align="left">GitHub Stats</h3>**\n\n`;
      for (let i = 0; i < cards.length; i += 2) {
        const card1 = cards[i];
        const card2 = i + 1 < cards.length ? cards[i + 1] : null;

        const getCardUrl = (card: any) => {
          switch (card.type) {
            case 'stats':
              return `https://github-readme-stats.vercel.app/api?username=${username}`;
            case 'top-langs':
              return `https://github-readme-stats.vercel.app/api/top-langs?username=${username}`;
            case 'repo-card':
              return `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${(card as RepoCardProps).repo}`;
            case 'streak':
              return `https://streak-stats.demolab.com/?user=${username}`;
            default:
              return '';
          }
        };

        const addParams = (url: string, card: any): string => {
          const params = new URLSearchParams(
            Object.entries(card)
              .filter(([k, v]) => k !== 'type' && k !== 'repo' && v !== undefined && v !== '')
              .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
          ).toString();
          return `${url}${params ? `&${params}` : ''}`;
        };


        markdown += `<p align="left">\n`;

        // First card
        let cardUrl1 = addParams(getCardUrl(card1), card1);
        markdown += `  <img width="48%" src="${cardUrl1}" alt="GitHub ${card1.type} Card" />\n`;

        // Second card if exists
        if (card2) {
          let cardUrl2 = addParams(getCardUrl(card2), card2);
          markdown += `  <img width="48%" src="${cardUrl2}" alt="GitHub ${card2.type} Card" />\n`;
        }

        markdown += `</p>\n\n`;
      }
    }

    if (SupportIcons.length > 0) {
      markdown += ` **<h3 align="${SupportAlignment}">Support Me</h3>**\n\n`;
      markdown += `<p align="${SupportAlignment}">`;
      markdown += SupportIcons
        .filter(icon => icon.href)
        .map(icon =>
          `<a href="${icon.href}" target="_blank"><img src="${icon.url}" height="${heightValues[SupportIconsHeight]}" style="margin-right: ${gapValues[SupportIconGap]}px"></a>`
        ).join(' ');
      markdown += '</p>';
    }

    setMarkdownCode(markdown);
    setIsOpen(true);
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={generateMarkdown} className=' px-2 py-1 md:px-4 flex justify-between items-center gap-3'>
          <IoLogoMarkdown />
          <span className=''>
            Generate Markdown
          </span>
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='w-full max-w-[95vw] md:max-w-[80vw] lg:max-w-[980px]'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle>Copy the Markdown Code</DialogTitle>
                </DialogHeader>
                <Textarea
                  rows={18}
                  value={markdownCode}
                  readOnly
                  className="font-mono mt-4 text-sm md:text-base w-full"
                />
                <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                  <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={copyToClipboard}>
                      {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarkdownGenerator;