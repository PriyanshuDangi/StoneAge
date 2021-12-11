import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import { useThree } from '@react-three/fiber';

const PlayerControls = () => {
    const { scene, camera, gl } = useThree();

    useEffect(() => {
        // const controls = new PointerLockControls(camera, gl.domElement);
        // controls.minPolarAngle = 0;
        // controls.maxPolarAngle = Math.PI / 2;
        // scene.add(controls.getObject());

        // document.addEventListener('click', function () {
        //     controls.lock();
        // });
        const controls = new OrbitControls(camera, gl.domElement);
        controls.target.set(0, 0, 0);
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minDistance = 7;
        controls.maxDistance = 300;
        controls.enablePan = false;
        controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
        controls.update();
    }, []);

    return null;
};

export default PlayerControls;
