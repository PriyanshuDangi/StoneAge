import { boxSize, piece, height } from '../../config/world.js';

export const checkCube = (x, y, z) => {
    if (Math.abs(x) < (boxSize * piece) / 2 && Math.abs(y) < boxSize * height && Math.abs(z) < (boxSize * piece) / 2) {
        return true;
    } else {
        return false;
    }
};
