import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import coursesReducer from "../features/courses/coursesSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    lessons: lessonsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
