import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { boxSize, piece, height } from '../../config/world.js';
import { checkCube } from '../../utils/builder/checkCube.js';
import landImg from '../../assets/images/bedrock.png';
import { colors } from './Color.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { tiles } from '../../containers/builder/tiles.js';
import { meshes, object } from '../../containers/builder/mesh.js';

const objects = [];
let meshIndex = 0;
let cubeColor = '#000000';

const VoxelBuilder = (props) => {
    const { scene, camera, gl } = useThree();
    // let [stats] = useState(new Stats());
    let { cubes } = props;

    useEffect(() => {
        let color = new THREE.Color();
        let visible = true;
        let transparent = true;
        let opacity = 0.4;
        let wireframe = false;
        let geometries = [];

        const gridHelper = new THREE.GridHelper(boxSize * piece, piece);
        scene.add(gridHelper);
        const geometry = new THREE.PlaneGeometry(boxSize * piece, boxSize * piece);
        geometry.rotateX(-Math.PI / 2);
        let plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
        scene.add(plane);
        objects.push(plane);

        const geometry1 = new THREE.PlaneGeometry(boxSize * piece, boxSize * height, 10, 10);
        geometry1.translate(0, (height * boxSize) / 2, (-boxSize * piece) / 2);

        const geometry2 = new THREE.PlaneGeometry(boxSize * piece, boxSize * height);
        geometry2.rotateY(Math.PI / 2);
        geometry2.translate((-boxSize * piece) / 2, (height * boxSize) / 2, 0);

        const geometry3 = new THREE.PlaneGeometry(boxSize * piece, boxSize * height);
        geometry3.rotateY(Math.PI);
        geometry3.translate(0, (height * boxSize) / 2, (boxSize * piece) / 2);

        const geometry4 = new THREE.PlaneGeometry(boxSize * piece, boxSize * height);
        geometry4.rotateY(-Math.PI / 2);
        geometry4.translate((boxSize * piece) / 2, (height * boxSize) / 2, 0);

        geometries.push(geometry1, geometry2, geometry3, geometry4);

        const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
        const material = new THREE.MeshBasicMaterial({ color, visible, transparent, opacity, wireframe });
        const mesh = new THREE.Mesh(mergedGeometry, material);
        scene.add(mesh);

        // const edges = new THREE.EdgesGeometry(mergedGeometry);
        // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
        // scene.add(line);

        objects.push(mesh);
    }, []);

    useEffect(() => {
        camera.position.set(boxSize * piece, boxSize * piece, boxSize * piece);
        camera.lookAt(0, 0, 0);
        scene.fog = null;

        scene.background = new THREE.Color('skyblue');

        // roll-over helpers

        const rollOverGeo = new THREE.BoxGeometry(boxSize - 0.01, boxSize - 0.01, boxSize - 0.01);
        const rollOverMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x000000),
            opacity: 0.5,
            transparent: true,
        });
        const rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        rollOverMesh.position.addScalar(boxSize / 2);
        scene.add(rollOverMesh);

        // grid

        // const gridHelper = new THREE.GridHelper(boxSize * piece, piece);
        // scene.add(gridHelper);

        let raycaster = new THREE.Raycaster();
        let pointer = new THREE.Vector2();

        // lights

        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        scene.add(directionalLight);

        let canvas = gl.domElement;

        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointerup', onPointerUp);
        document.addEventListener('keydown', onDocumentKeyDown);
        document.addEventListener('keyup', onDocumentKeyUp);

        let isAltDown = false;
        let isRightPointerDown = false;
        let isLeftPointerDown = false;

        const controls = new OrbitControls(camera, gl.domElement);
        controls.target.set(0, 0, 0);
        controls.update();
        // controls.enableRotate = false;
        controls.enablePan = false;
        // controls.enableDamping = true;
        // controls.enableZoom = false;
        controls.minDistance = 7;
        controls.maxDistance = 300;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2;
        // controls.listenToKeyEvents(window);
        controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
        controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;

        const axesHelper = new THREE.AxesHelper(Math.round(piece * 1.2));
        scene.add(axesHelper);

        if (process.env.NODE_ENV === 'development') {
            // document.body.appendChild(stats.dom);
        }

        const matrix = new THREE.Matrix4();
        let mesh = meshes[meshIndex];
        scene.add(object);
        objects.push(object);
        let removed = tiles.map(() => []);

        function onPointerMove(event) {
            if (isRightPointerDown) {
                onPointerDown(event);
            }
            pointer.set((event.clientX / canvas.clientWidth) * 2 - 1, -(event.clientY / canvas.clientHeight) * 2 + 1);
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
                rollOverMesh.position
                    .divideScalar(boxSize)
                    .floor()
                    .multiplyScalar(boxSize)
                    .addScalar(boxSize / 2);
                // rollOverMesh.material.color = new THREE.Color(meshIndex).convertSRGBToLinear();
            }
        }

        let p = 0;
        function onPointerDown(event) {
            mesh = meshes[meshIndex];
            if (event.which === 3) {
                isLeftPointerDown = true;
                return;
            }
            if (event.which === 1) {
                isRightPointerDown = true;
            }
            pointer.set((event.clientX / canvas.clientWidth) * 2 - 1, -(event.clientY / canvas.clientHeight) * 2 + 1);
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                // delete cube
                if (isAltDown) {
                    if (Number.isInteger(intersect.instanceId)) {
                        console.log(intersect);
                        let mesh = intersect.object;
                        removed[mesh.name].push(intersect.instanceId);
                        matrix.setPosition(0, -100, 0);
                        mesh.setMatrixAt(intersect.instanceId, matrix);
                        mesh.instanceMatrix.needsUpdate = true;
                        cubes[mesh.name][intersect.instanceId] = null;
                    }
                    // add cube
                } else {
                    const position = new THREE.Vector3();
                    position.copy(intersect.point).add(intersect.face.normal);
                    position
                        .divideScalar(boxSize)
                        .floor()
                        .multiplyScalar(boxSize)
                        .addScalar(boxSize / 2);
                    matrix.setPosition(position.x, position.y, position.z);
                    if (checkCube(position.x, position.y, position.z)) {
                        let id = cubes[meshIndex].length;
                        let cube = {
                            position: {
                                x: position.x,
                                y: position.y,
                                z: position.z,
                            },
                            type: tiles[meshIndex].type,
                            color: '#ffffff',
                        };
                        if (tiles[meshIndex].type === 'color') {
                            cube.color = cubeColor;
                        }
                        if (removed[meshIndex].length > 0) {
                            id = removed[meshIndex].pop();
                            cubes[meshIndex][id] = cube;
                        } else {
                            cubes[meshIndex].push(cube);
                            p++;
                        }
                        mesh.setMatrixAt(id, matrix);
                        mesh.instanceMatrix.needsUpdate = true;
                        if (tiles[meshIndex].type === 'color') {
                            mesh.setColorAt(id, new THREE.Color(cubeColor).convertSRGBToLinear());
                            mesh.instanceColor.needsUpdate = true;
                        }
                    }
                }
            }
        }

        function onPointerUp(event) {
            if (event.which === 3) {
                isLeftPointerDown = false;
            } else if (event.which === 1) {
                isRightPointerDown = false;
            }
        }

        function onDocumentKeyDown(event) {
            switch (event.code) {
                case 'AltLeft':
                case 'AltRight':
                    isAltDown = true;
                    break;
            }
        }

        function onDocumentKeyUp(event) {
            switch (event.code) {
                case 'AltLeft':
                case 'AltRight':
                    isAltDown = false;
                    break;
            }
        }

        return () => {
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('keydown', onDocumentKeyDown);
            document.removeEventListener('keyup', onDocumentKeyUp);
        };
    }, []);

    useEffect(() => {
        meshIndex = props.meshIndex;
        cubeColor = props.cubeColor;
    }, [props.meshIndex, props.cubeColor]);

    useFrame(() => {
        if (process.env.NODE_ENV === 'development') {
            // stats.update();
        }
    });

    return null;
};

export default VoxelBuilder;
