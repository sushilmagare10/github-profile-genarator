"use client"

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useIntroductionStore from '@/store/IntroStore';
import useSocialStore from '@/store/SocialStore';


const heightValues = {
  xs: 16,
  sm: 18,
  md: 24,
  lg: 28,
  xl: 32,
};

const gapValues = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 18
}

const ProfilePreview = () => {
  const {
    headerImage,
    name,
    aboutMe,
    currentlyDoing,
    visibleFields,
    fieldStyles,
  } = useIntroductionStore();

  const { gap, icons, sectionStyle, userName, iconHeight } = useSocialStore();

  const applyStyle = (content, style) => {
    const styledContent = (
      <div
        style={{
          fontSize: `${style.fontSize}px`,
          textAlign: style.alignment,
          fontWeight: style.bold ? 'bold' : 'normal',
          fontStyle: style.italic ? 'italic' : 'normal',
        }}
      >
        {content}
      </div>
    );
    return styledContent;
  };


  return (
    <div className='flex flex-col justify-start items-center bg-card p-4 h-full max-h-screen border border-black/40 w-full shadow-lg rounded-md'>
      <div className='h-full w-full border-none'>
        <h1>Preview</h1>
        <div className='mt-2 space-y-4'>
          {visibleFields.headerImage && headerImage && (
            <div style={{ textAlign: 'center' }}>
              {headerImage.startsWith('http') ? (
                <img src={headerImage} alt={name} />
              ) : (
                <div>{headerImage}</div>
              )}
            </div>
          )}
          {visibleFields.introduction && name && applyStyle(` ${name}`, fieldStyles.name)}
          {visibleFields.aboutMe && aboutMe && applyStyle(aboutMe, fieldStyles.aboutMe)}
          {(currentlyDoing.learning || currentlyDoing.askMeAbout || currentlyDoing.funFact) && (
            <div>
              <h3 className='font-bold my-2'>Rapid Fire:</h3>
              <ul>
                {currentlyDoing.learning && (
                  <li>🌱 I'm currently learning <strong>{currentlyDoing.learning}</strong></li>
                )}
                {currentlyDoing.askMeAbout && (
                  <li>💬 Ask me about <strong>{currentlyDoing.askMeAbout}</strong></li>
                )}
                {currentlyDoing.funFact && (
                  <li>⚡ Fun fact: <strong>{currentlyDoing.funFact}</strong></li>
                )}
              </ul>
            </div>
          )}
          <h3 className='font-bold '>Connect with me:</h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: `${gapValues[gap]}px`,
              rowGap: "6px",
              justifyContent: sectionStyle,
            }}
          >
            {icons.map((icon, index) => (
              <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={icon.url}
                  alt={userName}
                  height={iconHeight}
                  style={{ height: `${heightValues[iconHeight]}px`, }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
