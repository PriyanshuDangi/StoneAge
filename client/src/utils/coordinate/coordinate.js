export const tokenToCoordinates = (token) => {
    let dx = 0;
    let dy = -1;
    let x = 0;
    let y = 0;
    for (let i = 0; i < token; i++) {
        if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
            let t = dx;
            dx = -dy;
            dy = t;
        }
        x += dx;
        y += dy;
    }
    return { x, y };
};

export const coordinatesToToken = (cordinates) => {
    let token = 0;
    let x = 0;
    let y = 0;
    let dx = 0;
    let dy = -1;
    while (x !== cordinates.x || y !== cordinates.y) {
        if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
            let t = dx;
            dx = -dy;
            dy = t;
        }
        x += dx;
        y += dy;
        token++;
    }
    return token;
};
