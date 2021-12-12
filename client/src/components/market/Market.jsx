import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectCubesNFT,
    selectCubesNFTError,
    selectCubesNFTState,
    cubesNFTStateType,
} from '../../store/reducers/cubesNFTSlice';
import SaleCard from '../saleCard/SaleCard';
import { CardGroup, Container } from 'react-bootstrap';
import { buyToken } from '../../utils/wallet/wallet';

const Market = (props) => {
    const cubeNFTS = useSelector(selectCubesNFT);
    const cubeState = useSelector(selectCubesNFTState);
    const cubeError = useSelector(selectCubesNFTError);
    const [message, setMessage] = React.useState(null);
    const [sale, setSale] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (cubeState === cubesNFTStateType.loading) {
            setMessage('Loading...');
        } else if (cubeState === cubesNFTStateType.error) {
            setMessage('Error!');
        } else if (cubeState === cubesNFTStateType.idle && cubeNFTS) {
            setMessage(null);
            console.log(cubeNFTS);
            const onSale = [];
            for (let i = 0; i < cubeNFTS.length; i++) {
                if (cubeNFTS[i].on_sale) {
                    onSale.push(cubeNFTS[i]);
                }
            }
            setSale(onSale);
        }
    }, [cubeState, cubeNFTS]);

    const buyCube = async (cubeId, price) => {
        try {
            setLoading(true);
            await buyToken(cubeId, price);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <Container>
            <h1>Market</h1>
            <div>
                <div>{message}</div>
                <div>
                    <div className="d-flex flex-wrap justify-content-around align-items-center">
                        {sale.map((sale, index) => {
                            return <SaleCard key={index} sale={sale} buyCube={buyCube} />;
                        })}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Market;
