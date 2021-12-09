import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLedger } from '../../utils/storage/fetch';

export const ledgerStateType = {
    loading: 'loading',
    idle: 'idle',
    error: 'error',
};

const initialState = {
    ledger: [],
    state: ledgerStateType.loading,
    error: null,
};

export const setLedgerAsync = createAsyncThunk('ledger/fetchLedger', async () => {
    const ledger = await fetchLedger();
    return ledger;
});

export const ledgerSlice = createSlice({
    name: 'ledger',
    initialState,
    reducers: {
        setLedger: (state, action) => {
            state.state = ledgerStateType.idle;
            state.ledger = action.payload;
        },
        setLedgerError: (state, action) => {
            state.state = ledgerStateType.error;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setLedgerAsync.pending, (state) => {
                state.state = ledgerStateType.loading;
            })
            .addCase(setLedgerAsync.fulfilled, (state, action) => {
                state.state = ledgerStateType.idle;
                state.ledger = action.payload;
            })
            .addCase(setLedgerAsync.rejected, (state, action) => {
                state.state = ledgerStateType.error;
                state.error = action.payload;
            });
    },
});

export const { setLedger, setLedgerError } = ledgerSlice.actions;

export const selectLedger = (state) => state.ledger.ledger;
export const selectLedgerState = (state) => state.ledger.state;
export const selectLedgerError = (state) => state.ledger.error;

export default ledgerSlice.reducer;
