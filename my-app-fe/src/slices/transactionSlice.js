import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listTransactions, createTransaction, updateTransactionById, deleteTransactionById } from '../services/transactions';

export const fetchTransactions = createAsyncThunk(
  'transaction/fetchAll',
  async (filters = {}, thunkAPI) => {
    return await listTransactions(filters);
  }
);

export const addTransaction = createAsyncThunk(
  'transaction/add',
  async (data, thunkAPI) => {
    return await createTransaction(data);
  }
);

export const updateTransaction = createAsyncThunk(
  'transaction/update',
  async ({ id, values }, thunkAPI) => {
    return await updateTransactionById(id, values);
  }
);

export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (id, thunkAPI) => {
    return await deleteTransactionById(id);
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.list = state.list.filter(tx => tx._id !== action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const idx = state.list.findIndex(tx => tx._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export default transactionSlice.reducer;
