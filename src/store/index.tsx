import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import TodoReducer from "./reducers/TodoReducer";

const store = configureStore({
    reducer: {
        authentication: AuthReducer,
        todos: TodoReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;