"use client";

import React, { useEffect, useState } from 'react';
import useIntroductionStore from '@/store/IntroStore';
import useSocialStore from '@/store/SocialStore';
import useSkillsStore from '@/store/SkillStore';
import useSupportStore from '@/store/SupportStore';
import { heightValues, gapValues } from '@/types/common'
import useStatsCardStore from '@/store/StatsCardStore';

const ProfilePreview = () => {
  const [forceUpdate, setForceUpdate] = useState(0);

  const {
    headerImage,
    name,
    aboutMe,
    currentlyDoing,
    fieldStyles,
    profileViews
  } = useIntroductionStore();

  const {
    gap,
    icons: socialIcons,
    sectionStyle,
    iconHeight: socialIconHeight
  } = useSocialStore();

  const {
    icons: skillIcons,
    iconHeight: skillIconHeight,
    gap: skillIconsGap,
    alignment,
    selectedProvider,
    layout: SkillLayout,
  } = useSkillsStore();

  const {
    gap: SupportIconGap,
    alignment: SupportAlignment,
    iconHeight: SupportIconsHeight,
    icons: SupportIcons
  } = useSupportStore()

  const { username, cards } = useStatsCardStore();

  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [cards]);

  const getCardSrc = (card: any) => {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(card).filter(([_, v]) => v !== undefined && v !== '') as [string, string][])
    );


    switch (card.type) {
      case 'stats':
        return `https://github-readme-stats.vercel.app/api?username=${username}&${params}`;
      case 'top-langs':
        return `https://github-readme-stats.vercel.app/api/top-langs?username=${username}&${params}`;
      case 'repo-card':
        return `https://github-readme-stats.vercel.app/api/pin?username=${username}&${params}`;
      case 'streak':
        return `https://streak-stats.demolab.com/?user=${username}&${params}`;
      default:
        return '';
    }
  };

  const renderHTML = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const applyStyle = (content: string, style: any) => {
    return (
      <div
        style={{
          fontSize: `${style.fontSize}px`,
          textAlign: style.alignment,
          fontWeight: style.bold ? 'bold' : 'normal',
          fontStyle: style.italic ? 'italic' : 'normal',
        }}
      >
        {renderHTML(content)}
      </div>
    );
  };
  const iconsPerRow = 6;

  return (
    <div className='flex flex-col justify-start items-center bg-card p-6 h-full overflow-scroll scrollbar-hide border border-gray-300 w-full shadow-lg rounded-lg'>
      <div className='h-full w-full  border-none'>
        <h1 className='text-2xl font-bold mb-4'>Profile Preview</h1>

        <div className='mt-2 pb-8 space-y-6'>
          {headerImage && (
            <div className='text-center'>
              {headerImage.startsWith('http') ? (
                <img src={headerImage} alt={name} className='max-w-full rounded-md shadow-md' />
              ) : (
                <div>{headerImage}</div>
              )}
            </div>
          )}

          {profileViews && (
            <div className='text-center'>
              <img
                src={`https://komarev.com/ghpvc/?username=${profileViews}&label=Profile%20views&color=0e75b6&style=flat`}
                alt="Profile views counter"
              />
            </div>
          )}

          {name && (
            <div className='text-center'>
              {applyStyle(name, fieldStyles.name)}
            </div>
          )}

          <div className='text-left'>
            <div
              className='flex flex-wrap'
              style={{
                columnGap: `${gapValues[gap]}px`,
                rowGap: "6px",
                justifyContent: sectionStyle,
              }}
            >
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='transition transform '
                >
                  <img
                    src={icon.url}
                    alt='social'
                    className='rounded-md '
                    style={{ height: `${heightValues[socialIconHeight]}px` }}
                  />
                </a>
              ))}
            </div>
          </div>

          {aboutMe && (
            <div className='text-center'>
              {applyStyle(aboutMe, fieldStyles.aboutMe)}
            </div>
          )}

          {(currentlyDoing.working || currentlyDoing.learning || currentlyDoing.askMeAbout || currentlyDoing.funFact || currentlyDoing.portfolio || currentlyDoing.blog) && (
            <div className='text-left'>
              <h3 className='font-bold text-xl mb-2'>Rapid Fire:</h3>
              <ul className='list-disc list-inside space-y-1'>
                {currentlyDoing.working && (
                  <li className='flex items-center text-lg'>
                    <span className='mr-2'>💼</span> I&apos;m currently working on: <strong className='ml-2'>{renderHTML(currentlyDoing.working)}</strong>
                  </li>
                )}
                {currentlyDoing.learning && (
                  <li className='flex items-center text-lg'>
                    <span className='mr-2'>🌱</span> I&apos;m currently learning: <strong className='ml-2'>{renderHTML(currentlyDoing.learning)}</strong>
                  </li>
                )}
                {currentlyDoing.askMeAbout && (
                  <li className='flex items-center text-lg'>
                    <span className='mr-2'>💬</span> Ask me about: <strong className='ml-2'>{renderHTML(currentlyDoing.askMeAbout)}</strong>
                  </li>
                )}
                {currentlyDoing.funFact && (
                  <li className='flex items-center text-lg'>
                    <span className='mr-2'>⚡</span> Fun fact: <strong className='ml-2'>{renderHTML(currentlyDoing.funFact)}</strong>
                  </li>
                )}
                {currentlyDoing.portfolio && (
                  <li className='flex items-center text-lg'>
                    <span className='mr-2'>📂</span> My portfolio: <a href={currentlyDoing.portfolio} target="_blank" rel="noopener noreferrer" className='ml-2 text-blue-500 hover:underline'>{currentlyDoing.portfolio}</a>
                  </li>
                )}
                {currentlyDoing.blog && (
                  <li className='flex items-center text-lg'>
                    <span className='mr-2'>📝</span> My blog: <a href={currentlyDoing.blog} target="_blank" rel="noopener noreferrer" className='ml-2 text-blue-500 hover:underline'>{currentlyDoing.blog}</a>
                  </li>
                )}
              </ul>
            </div>
          )}

        </div>



        {SkillLayout === "Layout-1" && (
          <div className='text-left'>
            <h3 className='font-bold text-xl mb-2'>Skills:</h3>
            <div
              className='flex flex-wrap'
              style={{
                columnGap: `${gapValues[skillIconsGap]}px`,
                rowGap: "6px",
                justifyContent: alignment,
              }}
            >
              {skillIcons.map((icon, index) => (
                <p
                  key={index}
                  className='transition transform hover:scale-105'
                >
                  <img
                    src={icon.url}
                    alt={icon.label}
                    className='rounded-md'
                    style={{ height: `${heightValues[skillIconHeight]}px` }}
                  />
                </p>
              ))}
            </div>
          </div>
        )}

        {SkillLayout === "Layout-2" && (
          <div className="w-full mb-4">
            <h3 className="font-bold text-xl mb-2">Skills:</h3>
            <table className="w-full table-auto border-collapse">
              <tbody>
                {Array(Math.ceil(skillIcons.length / iconsPerRow))
                  .fill(0)
                  .map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {skillIcons
                        .slice(rowIndex * iconsPerRow, (rowIndex + 1) * iconsPerRow)
                        .map((icon) => (
                          <td
                            key={icon.id}
                            className="px-2 py-4 text-center border border-gray-300"
                          >
                            <div
                              style={{
                                display: "grid", // Set the div inside the td as a grid
                                placeItems: `center center`, // Align both horizontally and vertically
                              }}
                            >
                              <img
                                src={icon.url}
                                alt={icon.label}
                                className="rounded-md"
                                style={{ height: `${heightValues[skillIconHeight]}px` }}
                              />
                            </div>
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}


        <div className='flex flex-col w-full justify-start items-center '>
          <h2 className='font-bold text-xl mb-2 self-start'>GitHub Stats</h2>
          <div className='grid grid-cols-2 w-full gap-x-2 gap-y-3'>
            {cards.map((card, index) => (
              <img
                key={`${index}-${forceUpdate}`}
                src={getCardSrc(card)}
                alt={`GitHub ${card.type} Card`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ))}
          </div>
        </div>


        <div className='text-left'>
          <h3 className='font-bold text-xl mb-2'>Support Me:</h3>
          <div
            className='flex flex-wrap'
            style={{
              columnGap: `${gapValues[SupportIconGap]}px`,
              rowGap: "6px",
              justifyContent: SupportAlignment,
            }}
          >
            {SupportIcons.map((icon, index) => (
              <a
                key={index}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className='transition transform hover:scale-105'
              >
                <img
                  src={icon.url}
                  className='rounded-md shadow-md'
                  style={{ height: `${heightValues[SupportIconsHeight]}px` }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;