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

let p = 0;
let boxColor = colors;
const tempObject = new THREE.Object3D();
const { object, meshes } = createMesh(121 * 100);
let cubesCount = tiles.map(() => 0);

const Cubes = (props) => {
    const cubesData = props.cubesData;
    const meshRef = useRef();
    const { scene, camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 200, 200);
        camera.lookAt(0, 0, 0);
        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        scene.add(directionalLight);

        const number = 11;
        const grid = new THREE.GridHelper(piece * boxSize * number, number);
        // grid.position.set((-piece * boxSize) / 2, 0, (-piece * boxSize) / 2);
        scene.add(grid);

        // const grid1 = new THREE.GridHelper(32*boxSize, 32);
        // scene.add(grid1);

        console.log(object);
        scene.add(object);
    }, []);

    useEffect(() => {
        const temp = new THREE.Object3D();
        const func = async () => {
            let cubeGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            let cubeMaterial = new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load(landImg),
                color: new THREE.Color(boxColor),
            });
            const mesh = new THREE.InstancedMesh(cubeGeo, cubeMaterial, 6 * height * piece * piece);
            const matrix = new THREE.Matrix4();
            scene.add(mesh);
            for (let i = 0; i < cubesData.length; i++) {
                let { cube_url, token_id } = cubesData[i];
                let origin = tokenToCoordinates(parseInt(token_id));

                console.log(origin);
                if (cube_url) {
                    let res = await axios.get('https://gateway.pinata.cloud/ipfs/' + cube_url.slice(7));
                    console.log(res.data);
                    const cubes = res.data.cubes;
                    if (cubes) {
                        for (let j = 0; j < cubes.length; j++) {
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
                                    mesh[j].setColorAt(cubesCount[j], new THREE.Color(color).convertSRGBToLinear());
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
            // mesh.instanceColor.needsUpdate = true;
        };
        if (cubesData && cubesData.length > 0) func();
    }, [cubesData]);

    return null;
};

export default Cubes;
