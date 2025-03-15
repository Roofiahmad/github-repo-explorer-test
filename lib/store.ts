import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../app/redux/globalSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../app/redux/rootSaga";

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const createdStore = configureStore({
    reducer: {
      globalStore: globalSlice,
    },
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);
  return createdStore;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
