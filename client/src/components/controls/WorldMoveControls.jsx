import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { PointerLockControls } from '@react-three/drei';

import { useThree, useFrame } from '@react-three/fiber';

const SPEED = 1;
const SHIFTSPEED = 5;
const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    KeyE: 'up',
    KeyQ: 'down',
    Shift: 'shift',
    Space: 'jump',
};
const moveFieldByKey = (key) => {
    switch (key) {
        case 'KeyW':
        case 'ArrowUp':
            return 'forward';
        case 'KeyS':
        case 'ArrowDown':
            return 'backward';
        case 'KeyA':
        case 'ArrowLeft':
            return 'left';
        case 'KeyD':
        case 'ArrowRight':
            return 'right';
        case 'KeyE':
            return 'up';
        case 'KeyQ':
            return 'down';
        case 'ShiftLeft':
        case 'ShiftRight':
            return 'shift';
        case 'Space':
            return 'jump';
        default:
            return null;
    }
};

const useMoveControls = () => {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false,
        shift: false,
        jump: false,
    });

    useEffect(() => {
        const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
        const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    return movement;
};

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
const speed = new THREE.Vector3();

const WorldMoveControls = () => {
    const { camera, gl } = useThree();
    const controls = useRef();
    const { forward, backward, left, right, up, down, shift, jump } = useMoveControls();

    useEffect(() => {
        camera.position.set(0, 10, 0);
        // camera.lookAt(0, 0, 0);

        document.addEventListener('click', () => {
            controls.current.lock();
        });
    }, []);

    useFrame(() => {
        direction.y = Number(up) - Number(down);
        direction.z = Number(forward) - Number(backward);
        direction.x = Number(right) - Number(left);
        direction.normalize().multiplyScalar(shift ? SHIFTSPEED : SPEED);

        let minY = 0;
        let maxY = 200;

        if (camera.position.y >= minY && camera.position.y <= maxY) {
            camera.position.y += direction.y;
            if (camera.position.y < minY) {
                camera.position.y = minY;
            } else if (camera.position.y > maxY) {
                camera.position.y = maxY;
            }
        }
        controls.current.moveRight(direction.x);
        controls.current.moveForward(direction.z);
    });

    return <PointerLockControls ref={controls} args={[camera, gl.domElement]} />;
};

export default WorldMoveControls;
