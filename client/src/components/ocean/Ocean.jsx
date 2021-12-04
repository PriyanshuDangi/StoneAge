import { useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import WaterNormals from "../../assets/world/waternormals.jpg";

const Ocean = () => {
    const { scene, gl, camera } = useThree();
    const [water] = useState(
        new Water(new THREE.PlaneGeometry(10000, 10000), {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(
                WaterNormals,
                function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }
            ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined,
        })
    );

    useEffect(() => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        // camera.position.set( 30, 30, 100 );

        let sun = new THREE.Vector3();

        water.position.y = -10;
        water.rotation.x = -Math.PI / 2;
        scene.add(water);

        const sky = new Sky();
        sky.scale.setScalar(10000);
        scene.add(sky);

        const skyUniforms = sky.material.uniforms;

        skyUniforms["turbidity"].value = 10;
        skyUniforms["rayleigh"].value = 2;
        skyUniforms["mieCoefficient"].value = 0.005;
        skyUniforms["mieDirectionalG"].value = 0.8;

        const parameters = {
            elevation: 0.1,
            azimuth: 180,
        };

        const pmremGenerator = new THREE.PMREMGenerator(gl);

        function updateSun() {
            const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
            const theta = THREE.MathUtils.degToRad(parameters.azimuth);

            sun.setFromSphericalCoords(1, phi, theta);

            sky.material.uniforms["sunPosition"].value.copy(sun);
            // water.material.uniforms["sunDirection"].value.copy(sun).normalize();

            scene.environment = pmremGenerator.fromScene(sky).texture;
        }

        updateSun();

        // const gui = new GUI();

        // const folderSky = gui.addFolder("Sky");
        // folderSky.add(parameters, "elevation", 0, 90, 0.1).onChange(updateSun);
        // folderSky
        //     .add(parameters, "azimuth", -180, 180, 0.1)
        //     .onChange(updateSun);
        // folderSky.open();

        // const waterUniforms = water.material.uniforms;

        // const folderWater = gui.addFolder("Water");
        // folderWater
        //     .add(waterUniforms.distortionScale, "value", 0, 8, 0.1)
        //     .name("distortionScale");
        // folderWater.add(waterUniforms.size, "value", 0.1, 10, 0.1).name("size");
        // folderWater.open();
    }, []);

    useFrame(() => {
        water.material.uniforms["time"].value += 1.0 / 60.0;
    });

    return null;
};

export default Ocean;
