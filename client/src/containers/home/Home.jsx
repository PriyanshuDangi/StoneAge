import React from 'react';
import BirdCanvas from '../../components/birdCanvas/BirdCanvas';
import WalletButton from '../../components/walletButton/WalletButton';

import styleClasses from './styles.module.css';

const Home = () => {
    return (
        <>
            <div className={styleClasses.walletButton}>
                <WalletButton />
            </div>
            <BirdCanvas />
        </>
    );
};

export default Home;
