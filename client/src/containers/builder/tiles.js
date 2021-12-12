import * as THREE from 'three';
import dirtGrassImg from '../../assets/tiles/dirt_grass.png';
import grassTopImg from '../../assets/tiles/grass_top.png';
import dirtImg from '../../assets/tiles/dirt.png';
import trunkSideImg from '../../assets/tiles/trunk_side.png';
import trunkTopImg from '../../assets/tiles/trunk_top.png';
import leavesTransparentImg from '../../assets/tiles/leaves_transparent.png';
import leavesImg from '../../assets/tiles/leaves.png';
import stoneImg from '../../assets/tiles/stone.png';
import stoneSandImg from '../../assets/tiles/stone_sand.png';
import stoneDirtImg from '../../assets/tiles/stone_dirt.png';

const loader = new THREE.TextureLoader();

const loadMaterial = (img, props = { transparent: false }) => {
    const load = loader.load(img);
    load.encoding = THREE.sRGBEncoding;
    load.magFilter = THREE.NearestFilter;
    const material = new THREE.MeshBasicMaterial({ map: load });
    if (props.transparent) {
        material.transparent = true;
    }
    return material;
};

const dirtGrassMaterial = loadMaterial(dirtGrassImg);
const grassTopMaterial = loadMaterial(grassTopImg);
const dirtMaterial = loadMaterial(dirtImg);
const trunkSideMaterial = loadMaterial(trunkSideImg);
const trunkTopMaterial = loadMaterial(trunkTopImg);
const leavesTransparentMaterial = loadMaterial(leavesTransparentImg, { transparent: true });
const leavesMaterial = loadMaterial(leavesImg);
const stoneMaterial = loadMaterial(stoneImg);
const stoneSandMaterial = loadMaterial(stoneSandImg);
const stoneDirtMaterial = loadMaterial(stoneDirtImg);

const tilesType = ['dirt-grass', 'dirt', 'trunk', 'tree-leaves', 'stone', 'stone-sand'];

export const tiles = [
    {
        type: 'dirt-grass',
        material: [
            dirtGrassMaterial,
            dirtGrassMaterial,
            grassTopMaterial,
            dirtMaterial,
            dirtGrassMaterial,
            dirtGrassMaterial,
        ],
        image: dirtGrassImg,
    },
    {
        type: 'dirt',
        material: dirtMaterial,
        image: dirtImg,
    },
    {
        type: 'trunk',
        image: trunkSideImg,
        material: [
            trunkSideMaterial,
            trunkSideMaterial,
            trunkTopMaterial,
            trunkTopMaterial,
            trunkSideMaterial,
            trunkSideMaterial,
        ],
    },
    {
        type: 'tree-leaves',
        image: leavesImg,
        material: leavesMaterial,
    },
    {
        type: 'stone',
        image: stoneImg,
        material: stoneMaterial,
    },
    {
        type: 'stone-sand',
        image: stoneSandImg,
        material: [
            stoneDirtMaterial,
            stoneDirtMaterial,
            dirtMaterial,
            stoneMaterial,
            stoneDirtMaterial,
            stoneDirtMaterial,
        ],
    },
];

export default tiles;
