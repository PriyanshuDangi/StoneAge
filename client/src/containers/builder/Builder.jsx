import React, { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import Ocean from '../../components/ocean/Ocean';
import VoxelBuilder from '../../components/voxelBuilder/VoxelBuilder';

import styleClasses from './styles.module.css';
import { colors } from '../../components/voxelBuilder/Color';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { checkCube } from '../../utils/builder/checkCube';
import { useDispatch, useSelector } from 'react-redux';
import { selectLedgerState } from '../../store/reducers/ledgerSlice';
import ChooseCubeModal from '../../components/ChooseCubeModal/ChooseCubeModal';
import { connectWalletAsync, selectConnected } from '../../store/reducers/walletSlice';
import { uploadCube } from '../../utils/upload/upload';
import { updateCubeUrl } from '../../utils/wallet/wallet';
import NavBar from '../../components/navBar/NavBar';
import StoneAgeImg from '../../assets/images/stoneage.png';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import WalletButton from '../../components/walletButton/WalletButton';
import * as THREE from 'three';
import { tiles } from './tiles';

let cubes = tiles.map(() => []);

const exportCubes = (cubes) => {
    let cubesToExport = tiles.map(() => []);
    cubes.forEach((type, index) => {
        cubes[index].forEach((cube) => {
            if (cube && cube.position && checkCube(cube.position.x, cube.position.y, cube.position.z)) {
                cubesToExport[index].push(cube);
            }
        });
    });
    console.log(cubesToExport);
    return cubesToExport;
};

const Builder = () => {
    const dispatch = useDispatch();
    let [meshIndex, setMeshIndex] = useState(0);
    const ledgerState = useSelector(selectLedgerState);
    const [showChooseCube, setShowChooseCube] = useState(false);
    const walletConnected = useSelector(selectConnected);

    useEffect(() => {
        function onDocumentKeyDown(event) {
            let num = parseInt(event.key);
            if (Number.isInteger(num) && num >= 0 && num < tiles.length) {
                setMeshIndex(parseInt(event.key));
            }
        }
        document.addEventListener('keydown', onDocumentKeyDown);

        return () => {
            document.removeEventListener('keydown', onDocumentKeyDown);
        };
    }, []);

    const setIndex = (event, index) => {
        // event.stopImmediatePropagation();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        setMeshIndex(index);
    };

    const selectCube = () => {
        if (!walletConnected) {
            dispatch(connectWalletAsync());
        } else {
            setShowChooseCube(true);
        }
    };

    const publishCube = async (cubeId) => {
        const allCubes = exportCubes(cubes);
        const url = await uploadCube(allCubes, cubeId);
        await updateCubeUrl(cubeId, url);
    };

    return (
        <div>
            <ChooseCubeModal show={showChooseCube} set={setShowChooseCube} publishCube={publishCube} />
            <div className={styleClasses.container}>
                <Navbar bg="dark" variant="dark" expand="md" fixed="top">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <NavLink className="navbar-brand" to="/">
                            <img alt="StoneAge" src={StoneAgeImg} height="30" className="d-inline-block align-top" />
                        </NavLink>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto mx-auto">
                                <div className={styleClasses.colors}>
                                    {tiles.map((tile, index) => {
                                        let classes = [styleClasses.colorBox];
                                        if (index == meshIndex) {
                                            classes.push(styleClasses.active);
                                        }
                                        return (
                                            <div
                                                key={index}
                                                className={classes.join(' ')}
                                                onClickCapture={(event) => setIndex(event, index)}
                                                title={tile.type}
                                            >
                                                <img src={tile.image} alt={tile.type} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                        <div className="d-flex">
                            {/* <WalletButton dark /> */}
                            <Button variant="outline-light" onClick={() => selectCube()}>
                                <svg height="24" color="white" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fill="blue"
                                        d="M7.4 10h1.59v5c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.7 3.7a.9959.9959 0 0 0-1.41 0L6.7 8.29c-.63.63-.19 1.71.7 1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"
                                    ></path>
                                </svg>
                                Publish
                            </Button>
                        </div>
                    </Container>
                </Navbar>
                <div className={styleClasses.canvasContainer}>
                    <Canvas camera={{ far: 10000 }}>
                        <VoxelBuilder meshIndex={meshIndex} cubes={cubes} />
                        <Ocean />
                    </Canvas>
                </div>
            </div>

            <div className={styleClasses.info}>
                <IconButton aria-label="info" size="large" color="secondary">
                    <InfoRoundedIcon fontSize="inherit" />
                </IconButton>
            </div>
        </div>
    );
};

export default Builder;
