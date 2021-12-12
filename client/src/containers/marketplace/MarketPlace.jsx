import React, { useState } from 'react';
import Market from '../../components/market/Market';
import MarketTabs from '../../components/marketTabs/MarketTabs';
import MyCubes from '../../components/myCubes/MyCubes';
import NavBar from '../../components/navBar/NavBar';

const tabList = ['Market', 'My Cubes'];

const MarketPlace = () => {
    const [currentTab, setCurrentTab] = useState(0);
    let component = <Market />;
    if (currentTab === 1) {
        component = <MyCubes />;
    }
    return (
        <>
            <NavBar />
            <MarketTabs tabList={tabList} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {component}
        </>
    );
};

export default MarketPlace;
