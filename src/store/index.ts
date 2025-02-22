import { configureStore } from "@reduxjs/toolkit";
import { api as v1 } from "./api";
import authReducer from "./slice/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [v1.reducerPath]: v1.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(v1.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
