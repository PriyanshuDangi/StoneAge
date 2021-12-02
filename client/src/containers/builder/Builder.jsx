import React from "react";
import { Canvas } from "react-three-fiber";
import VoxelBuilder from "../../components/voxelBuilder/VoxelBuilder";

const Builder = () => {
    return (
        <div>
            <div>Hey</div>
            <div style={{ height: "100vh" }}>
                <Canvas gl={{ alpha: false }} sRGB camera={{ far: 10000 }}>
                    <VoxelBuilder />
                </Canvas>
            </div>
        </div>
    );
};

export default Builder;
