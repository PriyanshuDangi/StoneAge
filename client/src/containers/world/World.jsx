import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Canvas } from 'react-three-fiber';
import Cubes from '../../components/Cubes/Cubes';
import Ground from '../../components/ground/Ground';
import Ocean from '../../components/ocean/Ocean';
import { selectCubesNFT } from '../../store/reducers/cubesNFTSlice';
import WorldOrbitControls from '../../components/controls/WorldOrbitControls';
import WordlMoveControls from '../../components/controls/WorldMoveControls';
import WorldFlyControls from '../../components/controls/WorldFlyControls';
import { useLocation } from 'react-router';

const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
};

const World = () => {
    const cubesData = useSelector(selectCubesNFT);
    let query = useQuery();
    const [controlsType, setControls] = useState('orbit');

    useEffect(() => {
        if (query.get('controls') == 'move') {
            setControls('move');
        } else if (query.get('controls') == 'fly') {
            setControls('fly');
        } else {
            setControls('orbit');
        }
    }, [query]);

    let controls = <WorldOrbitControls />;
    if (controlsType === 'move') {
        controls = <WordlMoveControls />;
    } else if (controlsType === 'fly') {
        controls = <WorldFlyControls />;
    }

    return (
        <div style={{ height: '100vh' }}>
            <Canvas gl={{ alpha: false }} sRGB camera={{ far: 4000 }}>
                <Ocean />
                {/* <Ground length={11} breadth={11} /> */}
                {controls}
                <Cubes cubesData={cubesData} />
            </Canvas>
        </div>
    );
};

export default World;
