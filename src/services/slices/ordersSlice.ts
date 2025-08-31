import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrdersApi,
  getFeedsApi,
  orderBurgerApi
} from '../../utils/burger-api';

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
      console.log('Fetching feed data...');
      const feedData = await getFeedsApi();
      console.log('Feed data received:', feedData);
      return feedData;
    } catch (error: any) {
      console.error('Error fetching feed:', error);
      return rejectWithValue(error.message || 'Ошибка загрузки фида');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const orderData = await orderBurgerApi(ingredientIds);
      return orderData.order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка создания заказа');
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
    },
    clearFeed: (state) => {
      state.feed = {
        orders: [],
        total: 0,
        totalToday: 0
      };
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
        if (action.error.name !== 'AbortError') {
          state.error = action.payload as string;
        }
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrders, setCurrentOrder, clearCurrentOrder, clearFeed } =
  ordersSlice.actions;
export default ordersSlice.reducer;
