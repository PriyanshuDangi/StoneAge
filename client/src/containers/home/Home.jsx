import React from 'react';
import BirdCanvas from '../../components/birdCanvas/BirdCanvas';
import NavBar from '../../components/navBar/NavBar';
import WalletButton from '../../components/walletButton/WalletButton';

import styleClasses from './styles.module.css';

const Home = () => {
    return (
        <>
            {/* <div className={styleClasses.walletButton}>
                <WalletButton />
            </div> */}
            <NavBar />
            <BirdCanvas />
        </>
    );
};

export default Home;
