import React, { useState } from 'react';
import NavBar from '../../components/navBar/NavBar';
import { Button, Alert, Spinner } from 'react-bootstrap';
import styleClasses from './styles.module.css';
import { useSelector } from 'react-redux';
import { selectPKH } from '../../store/reducers/walletSlice';
import { mintToken } from '../../utils/wallet/wallet';

const Mint = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const pkh = useSelector(selectPKH);

    const mint = async () => {
        if (!pkh) {
            setMessage('Please connect your wallet');
            return;
        } else {
            try {
                setLoading(true);
                await mintToken();
                setMessage('Cube minted');
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className={'container'}>
                {message && (
                    <Alert variant={'dark'} dismissible onClose={() => setMessage(null)}>
                        {message}
                    </Alert>
                )}
                <div className={styleClasses.center}>
                    <h1 className={styleClasses.heading}>Mint</h1>
                    <Button variant="outline-dark" onClick={mint} disabled={loading}>
                        {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                        MINT
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Mint;
