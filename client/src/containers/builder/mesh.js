import * as THREE from 'three';
import { boxSize, height, piece } from '../../config/world';
import { tiles } from './tiles';

export const object = new THREE.Object3D();
const cubeGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

export const meshes = tiles.map((tile) => {
    let mesh = new THREE.InstancedMesh(cubeGeometry, tile.material, piece * piece * height);
    object.add(mesh);
    return mesh;
});
