import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './containers/home/Home';
import MarketPlace from './containers/marketplace/MarketPlace';
import World from './containers/world/World';
import Builder from './containers/builder/Builder';
import { useDispatch } from 'react-redux';
import { getActiveAccount } from './utils/wallet/wallet';
import { removePKH, setPKH } from './store/reducers/walletSlice';
import { setLedgerAsync } from './store/reducers/ledgerSlice';
import { setCubesNFTAsync } from './store/reducers/cubesNFTSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLedgerAsync());
        dispatch(setCubesNFTAsync());
    }, []);

    useEffect(() => {
        async function func() {
            const activeAccount = await getActiveAccount();
            if (activeAccount) {
                const address = activeAccount.address;
                dispatch(setPKH(address));
            } else {
                dispatch(removePKH());
            }
        }
        func();
    }, []);

    return (
        <Router>
            <Routes>
                <Route exact element={<Builder />} path={'/builder'} />
                <Route exact element={<World />} path={'/world'} />
                <Route exact element={<MarketPlace />} path={'/marketplace'} />
                <Route exact element={<Home />} path={'/'} />
            </Routes>
        </Router>
    );
}

export default App;
