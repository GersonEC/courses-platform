import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Lesson } from "../../utils/models";
import {
  createLesson,
  updateLesson,
  deleteLesson as destroyLesson,
} from "./lessonsAPI";

export interface LessonsState {
  lessons: Lesson[];
  status: "idle" | "pending" | "success" | "error";
}

const initialState: LessonsState = {
  lessons: [],
  status: "idle",
};

interface AddLessonArgs {
  title: string;
  courseId: number;
}
export const addLesson = createAsyncThunk(
  "lessons/createLesson",
  async (args: AddLessonArgs) => {
    const response = await createLesson(args.title, args.courseId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const saveLesson = createAsyncThunk(
  "lessons/saveLesson",
  async (lesson: Lesson) => {
    const response = await updateLesson(lesson);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (lesson: Lesson) => {
    debugger;
    await destroyLesson(lesson);
    return lesson;
  }
);

export const loadLessons = createAsyncThunk("courses/loadLessons", async () => {
  return fetch("/lessons").then((res) => res.json());
});

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLesson.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(addLesson.fulfilled, (state, action) => {
      state.lessons.push(action.payload);
      state.status = "success";
    });
    builder.addCase(addLesson.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(saveLesson.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(saveLesson.fulfilled, (state, action) => {
      const lesson: Lesson = action.payload;
      const index = state.lessons.findIndex((el) => el.id === lesson.id);
      state.lessons[index] = lesson;
      state.status = "success";
    });
    builder.addCase(saveLesson.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(deleteLesson.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(deleteLesson.fulfilled, (state, action) => {
      debugger;
      const lesson: Lesson = action.payload;
      const lessonsFiltered = state.lessons.filter((el) => el.id !== lesson.id);
      state.lessons = lessonsFiltered;
      state.status = "success";
    });
    builder.addCase(deleteLesson.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(loadLessons.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(loadLessons.fulfilled, (state, action) => {
      state.lessons = action.payload;
      state.status = "success";
    });
  },
});

//export const { openModal } = coursesSlice.actions;

export const selectLessons = (state: RootState) => state.lessons.lessons;

export default lessonsSlice.reducer;
