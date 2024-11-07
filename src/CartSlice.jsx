import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Remove any '$' symbol and convert cost to a number
      const numericCost = parseFloat(cost.replace('$', '')) || 0;

      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost: numericCost, quantity: 1 });
      }

      // Recalculate totalCost
      state.totalCost = state.items.reduce(
        (total, item) => total + item.cost * item.quantity,
        0
      ).toFixed(2); // Format to 2 decimal places
    },

    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);

      // Recalculate totalCost
      state.totalCost = state.items.reduce(
        (total, item) => total + item.cost * item.quantity,
        0
      ).toFixed(2);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = Math.max(quantity, 1); // Ensure quantity is at least 1
      }

      // Recalculate totalCost
      state.totalCost = state.items.reduce(
        (total, item) => total + item.cost * item.quantity,
        0
      ).toFixed(2);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
