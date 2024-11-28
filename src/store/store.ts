import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from './habits-slice';

const store = configureStore({
    reducer: {
        habits: habitsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;