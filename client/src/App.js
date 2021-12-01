import React from "react";
import {Counter} from "./features/counter/Counter";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BirdCanvas from "./components/birdCanvas/BirdCanvas";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact element={<Counter />} path={"/builder"} />
                <Route exact element={<Counter />} path={"/world"} />
                <Route exact element={<Counter />} path={"/marketplace"} />
                <Route exact element={<BirdCanvas />} path={"/"} />
            </Routes>
        </Router>
    );
}

export default App;
