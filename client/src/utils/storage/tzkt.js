import * as config from '../../config/wallet';
import axios from 'axios';

export const getBigMapUrl = (address, name, query = {}) => {
    let url = `${config.TZKT_URL}/v1/contracts/${address}/bigmaps/${name}/keys`;
    if (query) {
        url += '?';
        if (query.value) {
            url += `value=${query.value}`;
        }
    }
    return url;
};

export const fetchBigMap = async (address, name) => {
    const url = getBigMapUrl(address, name);
    return await axios.get(url);
};
