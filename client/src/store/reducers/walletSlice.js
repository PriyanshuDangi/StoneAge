import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { connectWallet, disconnectWallet } from '../../utils/wallet/wallet';

const initialState = {
    connected: false,
    pkh: null,
    error: null,
};

export const connectWalletAsync = createAsyncThunk('wallet/connect', async () => {
    const wallet = await connectWallet();
    const pkh = wallet.pkh || (await wallet.getPKH());
    return pkh;
});

export const disconnectWalletAsync = createAsyncThunk('wallet/disconnect', async () => {
    await disconnectWallet();
});

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {
        setPKH: (state, address) => {
            state.connected = true;
            state.pkh = address.payload;
        },
        removePKH: (state) => {
            state.connected = false;
            state.pkh = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWalletAsync.fulfilled, (state, action) => {
                state.connected = true;
                state.pkh = action.payload;
            })
            .addCase(disconnectWalletAsync.fulfilled, (state, action) => {
                state.connected = false;
                state.pkh = null;
            });
    },
});

export const { setPKH, removePKH } = walletSlice.actions;

export const selectConnected = (state) => state.wallet.connected;
export const selectPKH = (state) => state.wallet.pkh;

export default walletSlice.reducer;
