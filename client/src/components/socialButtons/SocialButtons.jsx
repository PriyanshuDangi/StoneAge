import React from 'react';
import styleClasses from './styles.module.css';
import twitterLogo from '../../assets/logo/twitter.png';
import discordLogo from '../../assets/logo/discord.png';
import mediumLogo from '../../assets/logo/medium.png';

export const socialLinks = [
    {
        src: twitterLogo,
        link: 'https://twitter.com/OriginXGames',
        alt: 'Follow us on Twitter',
        title: 'twitter',
    },
    {
        src: discordLogo,
        link: 'http://discord.gg/BYFY76KPhd',
        alt: 'Join us on Discord',
        title: 'discord',
    },
    {
        src: mediumLogo,
        link: 'https://originx-games.medium.com',
        alt: 'Follow us on Medium',
        title: 'medium',
    },
];

const SocialButtons = () => {
    return (
        <div className={styleClasses.socialContainer}>
            {socialLinks.map((link, index) => (
                <div key={index}>
                    <a href={link.link} target="_blank" rel="noopener noopener" title={link.title}>
                        <img src={link.src} alt={link.alt} />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default SocialButtons;
