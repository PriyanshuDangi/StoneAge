import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import * as config from '../../config/wallet';

const Tezos = new TezosToolkit(config.RPC_URL);

const options = {
    name: config.NAME,
    iconUrl: config.ICON_URL,
    preferredNetwork: config.NETWORK,
};

const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

const connectWallet = async () => {
    await wallet.requestPermissions({
        network: {
            type: config.NETWORK,
        },
    });
    return wallet;
};

const disconnectWallet = async () => {
    await wallet.clearActiveAccount();
};

const getPKH = async () => {
    const pkh = await wallet.getPKH();
    return pkh;
};

const getActiveAccount = async () => {
    const activeAccount = await wallet.client.getActiveAccount();
    return activeAccount;
};

const getContract = async (address) => {
    const contract = await Tezos.wallet.at(address);
    return contract;
};

const getRegistry = async () => {
    return await getContract(config.NFT_REGISTRY_ADDRESS);
};

const getContractStorage = async () => {
    const storage = await (await getRegistry()).storage();
    console.log(storage);
    return storage;
};

const mintToken = async () => {
    const registry = await getRegistry(config.NFT_REGISTRY_ADDRESS);
    const newEmptyMapWithoutArg = new MichelsonMap();
    const op = await registry.methods.mint(newEmptyMapWithoutArg).send();
    await op.confirmation(1);
}

const updateCubeUrl = async (cubeId, url) => {
    const registry = await getRegistry();
    const op = await registry.methods.update_cube(url, cubeId).send();
    await op.confirmation(1);
};

const buyToken = async (cubeId, price) => {
    const registry = await getRegistry();
    const op = await registry.methods.buy_token(cubeId).send({ amount: price, mutez: true });
    await op.confirmation(1);
    console.log('token bought ' + cubeId);
};

const listToken = async (cubeId, price) => {
    const registry = await getRegistry();
    const op = await registry.methods.list_token(price, cubeId).send();
    await op.confirmation(1);
    console.log('token listed ' + cubeId);
};

const delistToken = async (cubeId) => {
    const registry = await getRegistry();
    const op = await registry.methods.delist_token(cubeId).send();
    await op.confirmation(1);
    console.log('token delisted ' + cubeId);
};

export {
    wallet,
    Tezos,
    connectWallet,
    disconnectWallet,
    getPKH,
    getActiveAccount,
    getContract,
    getContractStorage,
    mintToken,
    updateCubeUrl,
    buyToken,
    listToken,
    delistToken,
};
