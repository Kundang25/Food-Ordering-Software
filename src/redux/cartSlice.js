import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

const updateTotals = (state) => {
  state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.items.reduce(
    (total, item) => total + (item.selling_price * item.quantity),
    0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const{id,category}=action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.category === category
      );
      
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      updateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.category === action.payload.category)
      );
      
      updateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, category, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.category === category
      );
      
      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
      
      updateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;