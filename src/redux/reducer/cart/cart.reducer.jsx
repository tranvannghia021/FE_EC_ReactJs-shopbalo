import { createSlice } from '@reduxjs/toolkit';
const dataShop = JSON.parse(localStorage.getItem("cart"));
const yourCart = !!dataShop ? dataShop.cart.cartData : [];
// callAPI
//const initialState = !!yourCart ? yourCart : [];
export const productReducer = createSlice({
  name: 'cart',
  initialState:{
    cartData:!!yourCart ? yourCart : [],
  },
  reducers: {
    addProductCart: (state, action) => {
      const inCart = state.cartData.find((item) =>
        item.id === action.payload.id
      );
      return (inCart)
        ?{cartData: state.cartData.map((item) =>
          item.id === action.payload.id
            ?{ ...item, qty: item.qty + 1 }
            : item
        )}
        :   { id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          amount:action.payload.amount
          , qty: action.payload.quantity };
    },
    addProductCartWithQuantity: (state, action) => {
      const inCart = state.cartData.find((item) =>{
        return  item.id === action.payload.id
        }

      );

      return inCart
        ? {cartData: state.cartData.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + action.payload.quantity }
            : item
        )}
        : {cartData:[
          ...state.cartData,
          { id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image,
            amount:action.payload.amount
            , qty: action.payload.quantity },
        ]};
    },
    increaseQuantityCart:(state, action)=>{
    return {cartData: state.cartData.map((item) =>
        item.id === action.payload.id
          ?{ ...item, qty: item.qty + 1 }
          : item
      )}
    },
    decreaseQuantityCart:(state, action)=>{
      return {cartData: state.cartData.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty === 1 ? 1 : item.qty - 1 }
            : item
        )}
    },
    deleteItemCart:(state, action)=>{
      let newCart= state.cartData.filter((item) =>item.id !== action.payload.id)
      localStorage.setItem('cart',JSON.stringify({ cart:{cartData:newCart}}))
      return {cartData:newCart}
     },


  },
});

export const { addProductCart,addProductCartWithQuantity,increaseQuantityCart,decreaseQuantityCart,deleteItemCart } = productReducer.actions;

export default productReducer.reducer;
