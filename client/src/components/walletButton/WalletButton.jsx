import React from 'react';
import { useSelector } from 'react-redux';

import {
    connectWalletAsync,
    disconnectWalletAsync,
    selectConnected,
    selectPKH,
} from '../../store/reducers/walletSlice';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import tezosLogo from '../../assets/images/tezos-logo.svg';

const short = (pkh) => {
    if (pkh) return pkh.substring(0, 6) + '...' + pkh.substring(pkh.length - 4);
};

const WalletButton = (props) => {
    const dispatch = useDispatch();
    const walletConnected = useSelector(selectConnected);
    const pkh = useSelector(selectPKH);

    const clicked = () => {
        console.log(walletConnected);
        if (walletConnected) {
            dispatch(disconnectWalletAsync());
        } else {
            dispatch(connectWalletAsync());
        }
    };

    return (
        <>
            {props.dark ? (
                <Button variant="outline-light" onClick={clicked}>
                    <img src={tezosLogo} alt="tezos logo" style={{ width: '20px', height: '20px' }} />
                    {walletConnected && pkh ? short(pkh) : 'Connect Wallet'}
                </Button>
            ) : (
                <Button variant="outline-dark" onClick={clicked}>
                    <img src={tezosLogo} alt="tezos logo" style={{ width: '20px', height: '20px' }} />
                    {walletConnected && pkh ? short(pkh) : 'Connect Wallet'}
                </Button>
            )}
        </>
    );
};

export default WalletButton;
