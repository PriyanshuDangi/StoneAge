import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { cubesNFTStateType, selectCubesNFT, selectCubesNFTState } from '../../store/reducers/cubesNFTSlice';
import { ledgerStateType, selectLedger, selectLedgerState } from '../../store/reducers/ledgerSlice';
import { selectPKH } from '../../store/reducers/walletSlice';
import { tokenToCoordinates } from '../../utils/coordinate/coordinate';
import { delistToken, listToken } from '../../utils/wallet/wallet';
import SaleCard from '../saleCard/SaleCard';

const MyCubes = () => {
    const cubesData = useSelector(selectCubesNFT);
    const cubesNFTState = useSelector(selectCubesNFTState);
    const ledger = useSelector(selectLedger);
    const ledgerState = useSelector(selectLedgerState);
    const pkh = useSelector(selectPKH);

    const [message, setMessage] = useState(null);
    const [cubes, setCubes] = useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (!pkh) {
            setMessage('Please connect your wallet!');
        } else if (cubesNFTState === cubesNFTStateType.loading || ledgerState === ledgerStateType.loading) {
            setMessage('Loading...');
        } else if (cubesNFTState === cubesNFTStateType.error || ledgerState === ledgerStateType.error) {
            setMessage('Error!');
        } else if (cubesNFTState === cubesNFTStateType.idle && ledgerState === ledgerStateType.idle) {
            const myCubes = [];
            ledger.forEach((led) => {
                if (led.address == pkh) {
                    let { x, y } = tokenToCoordinates(led.id);
                    let { on_sale, price } = cubesData[led.id];
                    myCubes.push({
                        token_id: led.id,
                        x,
                        y,
                        on_sale,
                        price,
                    });
                }
            });
            if (myCubes.length === 0) {
                setMessage("You don't own any cubes! You can buy them from the marketplace");
            } else {
                setMessage('');
                setCubes(myCubes);
            }
        }
    }, [pkh, cubesData, ledger]);

    const listCube = async (token_id, price) => {
        try {
            setLoading(true);
            await listToken(token_id, price);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const delistCube = async (token_id) => {
        try {
            setLoading(true);
            await delistToken(token_id);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <Container>
            <h1>My Cubes</h1>
            <div>
                <div>{message}</div>
                <div>
                    <div className="d-flex flex-wrap justify-content-around align-items-center">
                        {cubes.map((sale, index) => {
                            return (
                                <SaleCard self key={index} sale={sale} listCube={listCube} delistCube={delistCube} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MyCubes;
