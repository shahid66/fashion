import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {} };

const currency = "$";
const delivary_fee = 10;

// const addToCart = async (itemId, size) => {
//   if (!size) {
//     toast.error("Please select size");
//     return;
//   }
//   let cartData = structuredClone(cartItems);
//   if (cartData[itemId]) {
//     if (cartData[itemId][size]) {
//       cartData[itemId][size] += 1;
//     } else {
//       cartData[itemId][size] = 1;
//     }
//   } else {
//     cartData[itemId] = {};
//     cartData[itemId][size] = 1;
//   }

//   setCartItems(cartData);
// };

// const value = {
//   products,
//   currency,
//   delivary_fee,
//   showSearch,
//   setShowSearch,
//   search,
//   setSearch,
//   cartItems,
//   addToCart,
//   getCartCount,
//   updateqty,
//   getCartAmount,
//   navigate,
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, qty, size, name, image, price } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.cartItems.push({
          productId,
          qty,
          size,
          name,
          image,
          price,
        });
      }

      return updateCart(state);
    },
    increment: (state, action) => {
      const { productId, size } = action.payload;

      const item = state.cartItems.find(
        (item) => item.productId === productId && item.size === size
      );
      if (item) {
        item.qty += 1;
      }
      return updateCart(state);
    },
    decrement: (state, action) => {
      const { productId, size } = action.payload;
      const item = state.cartItems.find(
        (item) => item.productId === productId && item.size === size
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
    clearShippingAddress: (state, action) => {
      state.shippingAddress = {};
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  clearShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
