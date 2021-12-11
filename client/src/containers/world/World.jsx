import React from 'react';
import { useSelector } from 'react-redux';
import { Canvas } from 'react-three-fiber';
import Cubes from '../../components/Cubes/Cubes';
import Ocean from '../../components/ocean/Ocean';
import PlayerControls from '../../components/playerControls/PlayerControls';
import { selectCubesNFT } from '../../store/reducers/cubesNFTSlice';

const World = () => {
    const cubesData = useSelector(selectCubesNFT);

    return (
        <div style={{ height: '100vh' }}>
            <Canvas gl={{ alpha: false }} sRGB camera={{ far: 10000 }}>
                <Ocean />
                <PlayerControls />
                <Cubes cubesData={cubesData} />
            </Canvas>
        </div>
    );
};

export default World;
