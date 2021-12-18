import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber';
import { boxSize, piece } from '../../config/world';
import dirtImg from '../../assets/tiles/dirt.png';
import snowImg from '../../assets/tiles/snow.png';
import sandImg from '../../assets/tiles/sand.png';
import stoneSilverImg from '../../assets/tiles/stone_silver.png';

const Ground = (props) => {
    const { length, breadth } = props;
    const { scene } = useThree();

    useEffect(() => {
        const geometry = new THREE.BoxGeometry(length * piece * boxSize, breadth * piece * boxSize, boxSize);
        geometry.rotateX(Math.PI / 2);
        const loader = new THREE.TextureLoader();
        // const dirtTexture = loader.load(dirtImg);
        // dirtTexture.encoding = THREE.sRGBEncoding;
        // dirtTexture.repeat.set(boxSize, boxSize);
        // const dirtMaterial = new THREE.MeshStandardMaterial({ map: dirtTexture, roughness: 0.5, metalness: 0.5 });

        const texture = loader.load(
            // 'https://raw.githubusercontent.com/PriyanshuDangi/Delta-Hackathon/city/frontend/src/assets/images/grasslight-big.jpg',
            stoneSilverImg,
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(piece * boxSize, piece * boxSize);
        texture.anisotropy = 16;
        texture.encoding = THREE.sRGBEncoding;
        // texture.repeat.set(length*piece, length*piece);
        const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 2, color: '#666' });

        // let materials = [dirtMaterial, dirtMaterial, dirtMaterial, dirtMaterial, material, material];
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y -= boxSize / 2;
        scene.add(mesh);
    }, []);
    return null;
};

export default Ground;
