import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "@/app/redux/reducers/reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;