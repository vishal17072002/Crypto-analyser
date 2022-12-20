import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd";
  // /jpy.json"

const createRequest = (url) => ({ url });

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: (currency) =>
        createRequest(
          `/${currency.toLowerCase()}.json`
        ),
    }),
  }),
});

export const { useGetCurrencyQuery } = currencyApi;
