import React from 'react';
import { Card, Button, Form, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import image from '../../assets/images/pixels.jpg';
import { connectWalletAsync, selectPKH } from '../../store/reducers/walletSlice';
import { tokenToCoordinates } from '../../utils/coordinate/coordinate';

const SaleCard = (props) => {
    const { x, y } = tokenToCoordinates(props.sale.token_id);
    const pkh = useSelector(selectPKH);
    const dispatch = useDispatch();

    const buy = async (token_id, price) => {
        if (!pkh) {
            dispatch(connectWalletAsync());
            return;
        } else {
            await props.buyCube(token_id, price);
        }
    };

    const delist = async (token_id) => {
        if (!pkh) {
            dispatch(connectWalletAsync());
            return;
        } else {
            await props.delistCube(token_id);
        }
    };

    const list = async (token_id, price) => {
        if (!pkh) {
            dispatch(connectWalletAsync());
            return;
        } else {
            await props.listCube(token_id, price);
        }
    };

    const listForm = (event) => {
        event.preventDefault();
        list(props.sale.token_id, event.target.price.value);
    };

    return (
        <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>Cube - {props.sale.token_id} </Card.Title>

                <div className="card-text">
                    <div>
                        ({x}, {y})
                    </div>
                    <div>Price: {props.sale.price} Mutez</div>
                </div>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    {props.self ? (
                        props.sale.on_sale ? (
                            <Button onClick={() => delist(props.sale.token_id)}>Delist</Button>
                        ) : (
                            <Form className="d-flex" onSubmit={listForm}>
                                <FormControl
                                    type="number"
                                    placeholder="Price"
                                    className="me-2"
                                    aria-label="Price"
                                    name="price"
                                    required
                                    any="1"
                                    min="1"
                                />
                                <Button type="submit">List</Button>
                            </Form>
                        )
                    ) : (
                        <Button onClick={() => buy(props.sale.token_id, props.sale.price)}>Buy</Button>
                    )}
                </small>
            </Card.Footer>
        </Card>
    );
};

export default SaleCard;
