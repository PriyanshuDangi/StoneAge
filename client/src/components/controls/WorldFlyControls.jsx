import React, { useEffect, useState } from 'react';
import { FirstPersonControls } from '@react-three/drei';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

let movementSpeed = 16;
let shiftMovementSpeed = 120;

let lookSpeed = 0.1;
let shiftLookSpeed = lookSpeed * 2;

const WorldFlyControls = () => {
    const { scene, camera, gl } = useThree();
    const [shiftDown, setShiftDown] = useState(false);

    useEffect(() => {
        camera.position.set(0, 5, 0);
        camera.lookAt(0, 0, 0);

        const handleKeyDown = (e) => {
            switch (e.code) {
                case 'ShiftLeft':
                case 'ShiftRight':
                    return setShiftDown(true);
            }
        };

        const handleKeyUp = (e) => {
            switch (e.code) {
                case 'ShiftLeft':
                case 'ShiftRight':
                    return setShiftDown(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <FirstPersonControls
            movementSpeed={shiftDown ? shiftMovementSpeed : movementSpeed}
            lookSpeed={shiftDown ? shiftLookSpeed : lookSpeed}
            heightMin={0}
            heightMax={1}
            heightSpeed={true}
            heightCoef={0}
        />
    );
};

export default WorldFlyControls;
