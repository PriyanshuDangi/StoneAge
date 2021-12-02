import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./containers/home/Home";
import MarketPlace from "./containers/marketplace/MarketPlace";
import World from "./containers/world/World";
import Builder from "./containers/builder/Builder";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact element={<Builder />} path={"/builder"} />
                <Route exact element={<World />} path={"/world"} />
                <Route exact element={<MarketPlace />} path={"/marketplace"} />
                <Route exact element={<Home />} path={"/"} />
            </Routes>
        </Router>
    );
}

export default App;
