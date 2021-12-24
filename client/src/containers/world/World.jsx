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
import styleClasses from './styles.module.css';
import InstructModal from '../../components/instructModal/InstructModal';
import InfoButton from '../../components/infoButton/InfoButton';

// import { Perf } from 'r3f-perf';

const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
};

const World = () => {
    const cubesData = useSelector(selectCubesNFT);
    let query = useQuery();
    const [controlsType, setControls] = useState('orbit');
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        if (query.get('controls') == 'move') {
            setControls('move');
        } else if (query.get('controls') == 'fly') {
            setControls('fly');
        } else {
            setControls('orbit');
        }
    }, [query]);

    const infoClicked = (event) => {
        event.stopPropagation();
        setShowInfo(true);
    };

    let controls = <WorldOrbitControls />;
    if (controlsType === 'move') {
        controls = <WordlMoveControls />;
    } else if (controlsType === 'fly') {
        controls = <WorldFlyControls />;
    }

    return (
        <div style={{ height: '100vh' }}>
            <Canvas gl={{ alpha: false }} sRGB camera={{ far: 4000 }}>
                {/* <Perf /> */}
                <Ocean />
                {/* <Ground length={11} breadth={11} /> */}
                {controls}
                <Cubes cubesData={cubesData} />
            </Canvas>
            <InstructModal show={showInfo} set={setShowInfo} type={controlsType} />
            <InfoButton clicked={infoClicked} />
        </div>
    );
};

export default World;
