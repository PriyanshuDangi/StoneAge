import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {colors} from "./Color.js";

const boxSize = 2;
const piece = 32;
const height = 16;
const objects = [];
let gridHelpers = [];
let verticalPlanes = [];
const VoxelBuilder = () => {
    const { scene, camera, gl } = useThree();
    // const [gridHelpers, setGridHelpers] = useState([]);
    // window.camera = camera;
    let [stats] = useState(new Stats());

    useEffect(() => {
        let gridHelper1 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper1.position.set(
            (boxSize * piece) / 4,
            (height * boxSize) / 2,
            (-boxSize * piece) / 2
        );
        gridHelper1.rotation.x = Math.PI / 2;

        let gridHelper2 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper2.position.set(
            -(boxSize * piece) / 4,
            (height * boxSize) / 2,
            (-boxSize * piece) / 2
        );
        gridHelper2.rotation.x = Math.PI / 2;

        let gridHelper3 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper3.position.set(
            -(boxSize * piece) / 2,
            (height * boxSize) / 2,
            -(boxSize * piece) / 4
        );
        gridHelper3.rotation.z = Math.PI / 2;

        let gridHelper4 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper4.position.set(
            -(boxSize * piece) / 2,
            (height * boxSize) / 2,
            (boxSize * piece) / 4
        );
        gridHelper4.rotation.z = Math.PI / 2;

        let gridHelper5 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper5.position.set(
            -(boxSize * piece) / 4,
            (height * boxSize) / 2,
            (boxSize * piece) / 2
        );
        gridHelper5.rotation.x = -Math.PI / 2;

        let gridHelper6 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper6.position.set(
            (boxSize * piece) / 4,
            (height * boxSize) / 2,
            (boxSize * piece) / 2
        );
        gridHelper6.rotation.x = -Math.PI / 2;

        let gridHelper7 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper7.position.set(
            (boxSize * piece) / 2,
            (height * boxSize) / 2,
            (boxSize * piece) / 4
        );
        gridHelper7.rotation.z = -Math.PI / 2;

        let gridHelper8 = new THREE.GridHelper(
            height * boxSize,
            height,
            "grey",
            "grey"
        );
        gridHelper8.position.set(
            (boxSize * piece) / 2,
            (height * boxSize) / 2,
            -(boxSize * piece) / 4
        );
        gridHelper8.rotation.z = -Math.PI / 2;

        scene.add(gridHelper1);
        scene.add(gridHelper2);
        scene.add(gridHelper3);
        scene.add(gridHelper4);
        scene.add(gridHelper5);
        scene.add(gridHelper6);
        scene.add(gridHelper7);
        scene.add(gridHelper8);
        gridHelpers.push(gridHelper1);
        gridHelpers.push(gridHelper2);
        gridHelpers.push(gridHelper3);
        gridHelpers.push(gridHelper4);
        gridHelpers.push(gridHelper5);
        gridHelpers.push(gridHelper6);
        gridHelpers.push(gridHelper7);
        gridHelpers.push(gridHelper8);

        const geometry1 = new THREE.PlaneGeometry(
            boxSize * piece,
            boxSize * height
        );

        let plane1 = new THREE.Mesh(
            geometry1,
            new THREE.MeshBasicMaterial({ visible: false })
        );
        plane1.position.set(0, (height * boxSize) / 2, (-boxSize * piece) / 2);

        const geometry2 = new THREE.PlaneGeometry(
            boxSize * piece,
            boxSize * height
        );
        geometry2.rotateY(Math.PI / 2);

        let plane2 = new THREE.Mesh(
            geometry2,
            new THREE.MeshBasicMaterial({ visible: false })
        );
        plane2.position.set((-boxSize * piece) / 2, (height * boxSize) / 2, 0);

        const geometry3 = new THREE.PlaneGeometry(
            boxSize * piece,
            boxSize * height
        );
        geometry3.rotateY(Math.PI);
        let plane3 = new THREE.Mesh(
            geometry3,
            new THREE.MeshBasicMaterial({ visible: false })
        );
        plane3.position.set(0, (height * boxSize) / 2, (boxSize * piece) / 2);

        const geometry4 = new THREE.PlaneGeometry(
            boxSize * piece,
            boxSize * height
        );
        geometry4.rotateY(-Math.PI / 2);
        let plane4 = new THREE.Mesh(
            geometry4,
            new THREE.MeshBasicMaterial({ visible: false })
        );
        plane4.position.set((boxSize * piece) / 2, (height * boxSize) / 2, 0);

        scene.add(plane1);
        scene.add(plane2);
        scene.add(plane3);
        scene.add(plane4);
        objects.push(plane1);
        objects.push(plane2);
        objects.push(plane3);
        objects.push(plane4);
    }, []);

    useEffect(() => {
        camera.position.set(
            (boxSize * piece) / 2,
            (boxSize * piece) / 2,
            (boxSize * piece) / 2
        );
        camera.lookAt(0, 0, 0);
        scene.fog = null;

        scene.background = new THREE.Color();

        // roll-over helpers

        const rollOverGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const rollOverMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
        });
        const rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        rollOverMesh.position.addScalar(boxSize / 2);
        scene.add(rollOverMesh);

        // cubes

        let cubeGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        // let cubeMaterial = new THREE.MeshLambertMaterial({
        //     map: new THREE.TextureLoader().load(img),
        // });
        let cubeMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0xffffff),
        });

        // grid

        const gridHelper = new THREE.GridHelper(boxSize * piece, piece);
        scene.add(gridHelper);

        let raycaster = new THREE.Raycaster();
        let pointer = new THREE.Vector2();

        const geometry = new THREE.PlaneGeometry(
            boxSize * piece,
            boxSize * piece
        );
        geometry.rotateX(-Math.PI / 2);

        let plane = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({ visible: false })
        );
        scene.add(plane);

        objects.push(plane);

        // lights

        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        scene.add(directionalLight);

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("keydown", onDocumentKeyDown);
        document.addEventListener("keyup", onDocumentKeyUp);

        let isShiftDown = false;
        let isPointerDown = false;
        let isAltDown = false;

        const controls = new OrbitControls(camera, gl.domElement);
        controls.target.set(0, 0, 0);
        controls.update();
        controls.enableRotate = false;
        controls.enablePan = false;
        // controls.enableDamping = true;
        // controls.enableZoom = false;
        controls.minDistance = 7;
        controls.maxDistance = 300;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2;

        const axesHelper = new THREE.AxesHelper(Math.round(piece * 1.2));
        scene.add(axesHelper);

        if (process.env.NODE_ENV === "development") {
            document.body.appendChild(stats.dom);
        }

        const mesh = new THREE.InstancedMesh(
            cubeGeo,
            cubeMaterial,
            piece * piece * height
        );
        const matrix = new THREE.Matrix4();
        console.log(mesh);
        scene.add(mesh);
        objects.push(mesh);
        let removed = [];
        let boxColor = "rgb(255, 255, 0)";

        function onPointerMove(event) {
            if (isAltDown) {
                updateGrids();
                return;
            }
            if (isPointerDown) {
                onPointerDown(event);
            }
            pointer.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                // console.log(intersects[0]);
                const intersect = intersects[0];
                rollOverMesh.position
                    .copy(intersect.point)
                    .add(intersect.face.normal);
                rollOverMesh.position
                    .divideScalar(boxSize)
                    .floor()
                    .multiplyScalar(boxSize)
                    .addScalar(boxSize / 2);
            }
        }

        const updateGrids = () => {
            let angle = controls.getAzimuthalAngle();
            scene.remove(gridHelpers[0]);
            scene.remove(gridHelpers[1]);
            scene.remove(gridHelpers[2]);
            scene.remove(gridHelpers[3]);
            scene.remove(gridHelpers[4]);
            scene.remove(gridHelpers[5]);
            scene.remove(gridHelpers[6]);
            scene.remove(gridHelpers[7]);
            if (angle >= -Math.PI / 8 && angle <= Math.PI / 2) {
                scene.add(gridHelpers[0]);
                scene.add(gridHelpers[1]);
                scene.add(gridHelpers[2]);
                scene.add(gridHelpers[3]);
            } else if (angle >= Math.PI / 2 && angle <= Math.PI) {
                scene.add(gridHelpers[2]);
                scene.add(gridHelpers[3]);
                scene.add(gridHelpers[4]);
                scene.add(gridHelpers[5]);
            } else if (angle >= -Math.PI && angle <= -Math.PI / 2) {
                scene.add(gridHelpers[4]);
                scene.add(gridHelpers[5]);
                scene.add(gridHelpers[6]);
                scene.add(gridHelpers[7]);
            } else {
                scene.add(gridHelpers[6]);
                scene.add(gridHelpers[7]);
                scene.add(gridHelpers[0]);
                scene.add(gridHelpers[1]);
            }
        };
        updateGrids();
        let p = 0;
        function onPointerDown(event) {
            // console.log(mesh);
            if (isAltDown) return;
            isPointerDown = true;
            pointer.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                console.log(intersect);
                // delete cube
                if (isShiftDown) {
                    if (intersect.object !== plane && Number.isInteger(intersect.instanceId)) {
                        removed.push(intersect.instanceId);
                        matrix.setPosition(0, -100, 0);
                        mesh.setMatrixAt(intersect.instanceId, matrix);
                        mesh.instanceMatrix.needsUpdate = true;
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
                    console.log(position);
                    if (
                        Math.abs(position.x) < (boxSize * piece) / 2 &&
                        Math.abs(position.y) < boxSize * height &&
                        Math.abs(position.z) < (boxSize * piece) / 2
                    ) {
                        let id = p;
                        console.log(removed);
                        if (removed.length > 0) {
                            console.log("hey");
                            id = removed.pop();
                        } else {
                            console.log("ho")
                            p++;
                        }
                        mesh.setMatrixAt(id, matrix);
                        mesh.setColorAt(id, new THREE.Color(boxColor));
                        mesh.instanceMatrix.needsUpdate = true;
                        mesh.instanceColor.needsUpdate = true;
                    }
                }
            }
        }

        function onPointerUp(event) {
            isPointerDown = false;
        }

        function onDocumentKeyDown(event) {
            switch (event.code) {
                case "ShiftLeft":
                case "ShiftRight":
                    isShiftDown = true;
                    break;
                case "AltLeft":
                case "AltRight":
                    isAltDown = true;
                    controls.enableRotate = true;
                    break;
                case "Digit1":
                    boxColor = colors[1];
                    break;
                case "Digit2":
                    boxColor = colors[2];
                    break;
                case "Digit3":
                    boxColor = colors[3];
                    break;
                case "Digit4":
                    boxColor = colors[4];
                    break;
                case "Digit5":
                    boxColor = colors[5];
                    break;
                case "Digit6":
                    boxColor = colors[6];
                    break;
                case "Digit7":
                    boxColor = colors[7];
                    break;
                case "Digit8":
                    boxColor = colors[8];
                    break;
                case "Digit9":
                    boxColor = colors[9];
                    break;
                case "Digit0":
                    boxColor = colors[0];
                    break;
            }
        }

        function onDocumentKeyUp(event) {
            switch (event.code) {
                case "ShiftLeft":
                case "ShiftRight":
                    isShiftDown = false;
                    break;
                case "AltLeft":
                case "AltRight":
                    isAltDown = false;
                    controls.enableRotate = false;
                    break;
            }
        }
    }, []);

    useFrame(() => {
        if (process.env.NODE_ENV === "development") {
            stats.update();
        }
    });

    return null;
};

export default VoxelBuilder;
