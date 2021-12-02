import React from "react";
import { Canvas } from "react-three-fiber";
import Ocean from "../../components/ocean/Ocean";
import PlayerControls from "../../components/playerControls/PlayerControls";

const World = () => {
    return (
        <div style={{ height: "100vh" }}>
            <Canvas
                shadows
                gl={{ alpha: false }}
                sRGB
                camera={{ position: [0, 10, 10] }}
            >
                <Ocean />
                <PlayerControls />
            </Canvas>
        </div>
    );
};

export default World;
