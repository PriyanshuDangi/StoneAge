import React from 'react';
import styleClasses from './styles.module.css';
import twitterLogo from '../../assets/logo/twitter.png';
import discordLogo from '../../assets/logo/discord.png';
import mediumLogo from '../../assets/logo/medium.png';

const links = [
    {
        src: twitterLogo,
        link: 'https://twitter.com/OriginXGames',
        alt: 'Follow us on Twitter',
        title: 'twitter'
    },
    {
        src: discordLogo,
        link: 'http://discord.gg/BYFY76KPhd',
        alt: 'Join us on Discord',
        title: 'discord'
    },
    {
        src: mediumLogo,
        link: 'https://originx-games.medium.com',
        alt: 'Follow us on Medium',
        title: 'medium'
    },
];

const SocialButtons = () => {
    return (
        <div className={styleClasses.socialContainer}>
            {links.map((link, index) => (
                <div>
                     <a href={link.link} target="_blank"  rel="noopener noopener" title={links.title}>
                    <img src={link.src} alt={links.alt} />
                </a>
                </div>
            ))}
        </div>
    );
};

export default SocialButtons;
