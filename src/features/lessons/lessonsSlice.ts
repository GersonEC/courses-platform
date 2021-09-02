import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Lesson } from "../../utils/models";
import { createLesson } from "./lessonsAPI";

export interface CoursesState {
  lessons: Lesson[];
  status: "idle" | "pending" | "success" | "error";
}

const initialState: CoursesState = {
  lessons: [],
  status: "idle",
};

interface AddLessonArgs {
  title: string;
  courseId: number;
}
export const addLesson = createAsyncThunk(
  "courses/createLesson",
  async (args: AddLessonArgs) => {
    const response = await createLesson(args.title, args.courseId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/*export const loadCourses = createAsyncThunk("courses/loadCourses", async () => {
  return fetch("/courses").then((res) => res.json());
});*/

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
  },
});

//export const { openModal } = coursesSlice.actions;

export const selectLessons = (state: RootState) => state.lessons.lessons;

export default lessonsSlice.reducer;
