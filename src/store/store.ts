import { combineReducers, configureStore } from "@reduxjs/toolkit";
import supplementReducer from "./reducers/SupplementSlice";

const rootReducer = combineReducers({
  supplementReducer
})

export const store = configureStore({
  reducer:{
    rootReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;