import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cubesNFTSlice from './reducers/cubesNFTSlice';
import ledgerSlice from './reducers/ledgerSlice';
import walletReducer from './reducers/walletSlice.js';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        wallet: walletReducer,
        ledger: ledgerSlice,
        cubesNFT: cubesNFTSlice,
    },
});
