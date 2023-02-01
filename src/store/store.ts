import { combineReducers, configureStore } from "@reduxjs/toolkit";
import supplementReducer from "./reducers/SupplementSlice";
import modalReducer from "./reducers/ModalSlice";

const rootReducer = combineReducers({
  supplementReducer,
  modalReducer
})

export const store = configureStore({
  reducer:{
    rootReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;