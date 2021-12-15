import * as THREE from 'three';
import { boxSize, height, piece } from '../../config/world';
import { tiles } from './tiles';

export const object = new THREE.Object3D();
const cubeGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

export const meshes = tiles.map((tile, index) => {
    let mesh = new THREE.InstancedMesh(cubeGeometry, tile.material, 500);
    mesh.name = index;
    object.add(mesh);
    return mesh;
});

export const createMesh = (count) => {
    const object = new THREE.Object3D();
    const meshes = tiles.map((tile, index) => {
        let mesh = new THREE.InstancedMesh(cubeGeometry, tile.material, count);
        mesh.name = index;
        object.add(mesh);
        return mesh;
    });
    return { object, meshes };
};
