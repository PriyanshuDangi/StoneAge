import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectLedger, selectLedgerState, ledgerStateType } from '../../store/reducers/ledgerSlice';
import { selectPKH } from '../../store/reducers/walletSlice';
import { tokenToCoordinates } from '../../utils/coordinate/coordinate';

const ChooseCubeModal = (props) => {
    const [cubes, setCubes] = useState([]);
    const [selectedCube, setSelectedCube] = useState(null);
    const [loading, setLoading] = useState(false);
    const pkh = useSelector(selectPKH);
    const ledgerState = useSelector(selectLedgerState);
    const ledger = useSelector(selectLedger);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (ledgerState === ledgerStateType.loading) {
            setMessage('Loading...');
        } else if (ledgerState === ledgerStateType.error) {
            setMessage('Error');
        } else if (!pkh) {
            setMessage('Please connect your wallet first');
        } else if (ledgerState === ledgerStateType.idle && pkh) {
            const myCubes = [];
            ledger.forEach((led) => {
                if (led.address == pkh) {
                    let { x, y } = tokenToCoordinates(led.id);
                    myCubes.push({
                        id: led.id,
                        x,
                        y,
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
    }, [props.show, ledgerState, pkh]);

    const handleClose = () => {
        setLoading(false);
        props.set(false);
    };

    const publish = async (id) => {
        try {
            setLoading(true);
            setMessage('');
            setSelectedCube(id);
            await props.publishCube(id);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            setMessage('Unable to publish cube');
        }
    };

    return (
        <Modal show={props.show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Select Cube ID</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
                {cubes.map((cube, index) => {
                    return (
                        <div key={index} className="d-flex justify-content-between m-3">
                            <div>
                                ({cube.x}, {cube.y})
                            </div>
                            <div>
                                <Button variant="dark" onClick={() => publish(cube.id)} disabled={loading}>
                                    {loading && cube.id === selectedCube ? 'Publishing...' : 'Publish'}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChooseCubeModal;
