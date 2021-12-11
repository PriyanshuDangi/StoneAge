import React, { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import Ocean from '../../components/ocean/Ocean';
import VoxelBuilder from '../../components/voxelBuilder/VoxelBuilder';

import styleClasses from './styles.module.css';
import { colors } from '../../components/voxelBuilder/Color';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

let cubes = [];

const exportCubes = (cubes) => {
    let cubesToExport = [];
    cubes.forEach((cube) => {
        if (cube && cube.position && checkCube(cube.position.x, cube.position.y, cube.position.z)) {
            cubesToExport.push(cube);
        }
    });
    return cubesToExport;
};

const Builder = () => {
    const dispatch = useDispatch();
    let [boxColor, setBoxColor] = useState(colors[9]);
    const ledgerState = useSelector(selectLedgerState);
    const [showChooseCube, setShowChooseCube] = useState(false);
    const walletConnected = useSelector(selectConnected);

    useEffect(() => {
        function onDocumentKeyDown(event) {
            let num = parseInt(event.key);
            if (Number.isInteger(num) && num >= 0 && num <= 9) {
                setBoxColor(colors[parseInt(event.key)]);
            }
        }
        document.addEventListener('keydown', onDocumentKeyDown);

        return () => {
            document.removeEventListener('keydown', onDocumentKeyDown);
        };
    }, []);

    const setColor = (event, color) => {
        // event.stopImmediatePropagation();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        setBoxColor(color);
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
            <nav className={styleClasses.navbar}>
                <div className={styleClasses.nav}>
                    <div>StoneAge</div>
                    <div className={styleClasses.colors}>
                        {colors.map((color, index) => {
                            let classes = [styleClasses.colorBox];
                            if (color == boxColor) {
                                classes.push(styleClasses.active);
                            }
                            return (
                                <div
                                    key={index}
                                    className={classes.join(' ')}
                                    style={{ background: color, color: color }}
                                    onClickCapture={(event) => setColor(event, color)}
                                >
                                    <div>{index}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                startIcon={<FileUploadRoundedIcon />}
                                onClick={() => selectCube()}
                            >
                                Publish
                            </Button>
                        </Stack>
                    </div>
                </div>
            </nav>
            <div style={{ height: '100vh' }}>
                <Canvas gl={{ alpha: false }} sRGB camera={{ far: 10000 }}>
                    <VoxelBuilder boxColor={boxColor} cubes={cubes} />
                    <Ocean />
                </Canvas>
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
