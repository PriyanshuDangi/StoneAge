import React from 'react';
import { Canvas } from 'react-three-fiber';
import Cubes from '../../components/Cubes/Cubes';
import Ocean from '../../components/ocean/Ocean';
import PlayerControls from '../../components/playerControls/PlayerControls';

const World = () => {
    
    return (
        <div style={{ height: '100vh' }}>
            <Canvas gl={{ alpha: false }} sRGB camera={{ far: 10000 }}>
                <Ocean />
                <PlayerControls />
                <Cubes />
            </Canvas>
        </div>
    );
};

export default World;
