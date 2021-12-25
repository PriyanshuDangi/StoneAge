import * as config from '../../config/wallet';
import { fetchBigMap } from './tzkt';

export const fetchCubesNFT = async () => {
    try {
        // console.log('Fetching cubes NFT');
        const response = await fetchBigMap(config.NFT_REGISTRY_ADDRESS, 'token_metadata');
        const tokens = response.data.map((token) => {
            return {
                cube_url: token.value.cube_url,
                map_url: token.value.map_url,
                on_sale: token.value.on_sale,
                price: parseInt(token.value.price),
                token_id: parseInt(token.value.token_id),
            };
        });
        // console.log(tokens);
        return tokens;
    } catch (err) {
        console.log(err);
    }
};

export const fetchLedger = async () => {
    const query = {
        value: 1,
    };
    const response = await fetchBigMap(config.NFT_REGISTRY_ADDRESS, 'ledger', query);
    const ledger = response.data.map((res) => {
        return {
            id: res.key.nat,
            address: res.key.address,
        };
    });
    return ledger;
};
