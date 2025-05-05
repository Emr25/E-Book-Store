import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
};

const initialState = {
    products: getBasketFromStorage(),
    totalAmount: 0,
};

const writeBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
};

export const BasketSlice = createSlice({
    name: "Basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products.find(
                (product) => product._id === action.payload._id
            );

            if (findProduct) {
                const updatedProducts = state.products.map((product) =>
                    product._id === action.payload._id
                        ? { ...product, count: product.count + action.payload.count }
                        : product
                );
                state.products = updatedProducts;
            } else {
                state.products.push(action.payload);
            }

            writeBasketToStorage(state.products);
        },

        removeFromCart: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload._id
            );
            writeBasketToStorage(state.products);
        },

        completeCart: (state) => {
            state.products = [];
            localStorage.removeItem("basket");
        },
    },
});

export const { addToBasket, removeFromCart, completeCart } = BasketSlice.actions;
export default BasketSlice.reducer;
