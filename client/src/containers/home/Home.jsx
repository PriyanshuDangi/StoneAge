import React from 'react';
import BirdCanvas from '../../components/birdCanvas/BirdCanvas';
import NavBar from '../../components/navBar/NavBar';
import SocialButtons from '../../components/socialButtons/SocialButtons';
import WalletButton from '../../components/walletButton/WalletButton';

import styleClasses from './styles.module.css';

const Home = () => {
    return (
        <div className={styleClasses.homeContainer}>
            {/* <NavBar fixed="top" /> */}
            <SocialButtons />
            <BirdCanvas />
        </div>
    );
};

export default Home;
