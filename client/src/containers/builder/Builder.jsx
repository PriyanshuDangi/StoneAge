import React from "react";
import { Canvas } from "react-three-fiber";
import Ocean from "../../components/ocean/Ocean";
import VoxelBuilder from "../../components/voxelBuilder/VoxelBuilder";

const Builder = () => {
    return (
        <div>
            <div style={{ height: "100vh" }}>
                <Canvas gl={{ alpha: false }} sRGB camera={{ far: 10000 }}>
                    <VoxelBuilder />
                    <Ocean />
                </Canvas>
            </div>
        </div>
    );
};

export default Builder;
