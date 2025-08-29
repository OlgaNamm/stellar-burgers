import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, getFeedsApi } from '../../utils/burger-api';

export interface OrdersState {
  userOrders: TOrder[];
  currentOrder: TOrder | null;
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  userOrders: [],
  currentOrder: null,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки заказов');
    }
  }
);

export const fetchFeed = createAsyncThunk(
  'orders/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const feedData = await getFeedsApi();
      return feedData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки фида');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.userOrders = [];
      state.error = null;
    },
    setCurrentOrder: (state, action: PayloadAction<TOrder>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrders, setCurrentOrder, clearCurrentOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
