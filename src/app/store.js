import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { currencyApi } from "../services/currencyApi";
const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middelware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware, cryptoNewsApi.middleware, currencyApi.middleware),
});
setupListeners(store.dispatch);

export default store;
