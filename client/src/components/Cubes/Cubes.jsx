import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { selectCubesNFT, selectCubesNFTLoaded } from '../../store/reducers/cubesNFTSlice';
import { colors } from '../voxelBuilder/Color';
import axios from 'axios';
import landImg from '../../assets/images/bedrock.png';
import { boxSize, height, piece } from '../../config/world';
import { useThree } from '@react-three/fiber';
import { tokenToCoordinates } from '../../utils/coordinate/coordinate';
import { createMesh } from '../../containers/builder/mesh';
import { tiles } from '../../containers/builder/tiles';
// import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { useFrame } from 'react-three-fiber';

let p = 0;
let boxColor = colors;
const tempObject = new THREE.Object3D();
const { object, meshes } = createMesh(121 * 100 * 5);
let cubesCount = tiles.map(() => 0);
// const stats = new Stats();

const Cubes = (props) => {
    const cubesData = props.cubesData;
    const meshRef = useRef();
    const { scene, camera } = useThree();

    useEffect(() => {
        // document.body.appendChild(stats.dom);

        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        scene.add(directionalLight);

        const number = 11;
        const grid = new THREE.GridHelper(piece * boxSize * number, number);
        // grid.position.set((-piece * boxSize) / 2, 0, (-piece * boxSize) / 2);
        // scene.add(grid);

        // const grid1 = new THREE.GridHelper(32*boxSize, 32);
        // scene.add(grid1);

        console.log(object);
        scene.add(object);
    }, []);

    useEffect(() => {
        const temp = new THREE.Object3D();
        const func = async () => {
            const matrix = new THREE.Matrix4();
            for (let i = 0; i < cubesData.length; i++) {
                let { cube_url, token_id } = cubesData[i];
                let origin = tokenToCoordinates(parseInt(token_id));

                if (cube_url) {
                    let res = await axios.get('https://gateway.pinata.cloud/ipfs/' + cube_url.slice(7));
                    const cubes = res.data.cubes;
                    if (cubes) {
                        for (let j = 0; j < cubes.length; j++) {
                            cubes[j] = cubes[j].slice(0, 100); // to render only 100 cubes
                            for (let k = 0; k < cubes[j].length; k++) {
                                const cube = cubes[j][k];
                                const { position, color } = cube;
                                if (position)
                                    matrix.setPosition(
                                        position.x + origin.x * piece * boxSize,
                                        position.y,
                                        position.z + origin.y * piece * boxSize,
                                    );
                                meshes[j].setMatrixAt(cubesCount[j], matrix);
                                if (tiles[j].type === 'color' && color) {
                                    meshes[j].setColorAt(cubesCount[j], new THREE.Color(color).convertSRGBToLinear());
                                }
                                cubesCount[j]++;
                            }
                        }
                    }
                }
            }
            meshes.forEach((mesh) => {
                mesh.instanceMatrix.needsUpdate = true;
            });
            meshes[0].instanceColor.needsUpdate = true;
        };
        if (cubesData && cubesData.length > 0) func();
    }, [cubesData]);

    // useFrame(() => {
    //     stats.update();
    // });

    return null;
};

export default Cubes;
