import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import thunkMiddleware from 'redux-thunk';
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof store.dispatch>["dispatch"];