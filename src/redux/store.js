import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: {
    cart: loadState() || {
      items: [],
      totalItems: 0,
      totalAmount: 0
    }
  }
});

store.subscribe(() => {
    const state = store.getState();
    console.log('Cart state updated:', state.cart);
    saveState(state.cart);
  });

export default store;