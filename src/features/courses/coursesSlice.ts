import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Course } from "../../utils/models";
import { createCourse } from "./coursesAPI";

export interface CoursesState {
  courses: Course[];
  status: "idle" | "pending" | "success" | "error";
  isModalVisible: boolean;
}

const initialState: CoursesState = {
  courses: [],
  status: "idle",
  isModalVisible: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
interface AddCourseArgs {
  name: string;
  price: number;
}

export const addCourse = createAsyncThunk(
  "courses/createCourse",
  async (args: AddCourseArgs) => {
    const response = await createCourse(args.name, args.price);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const loadCourses = createAsyncThunk("courses/loadCourses", async () => {
  return fetch("/courses").then((res) => res.json());
});

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openModal: (state) => {
      state.isModalVisible = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCourse.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.courses.push(action.payload);
      state.status = "success";
      state.isModalVisible = false;
    });
    builder.addCase(addCourse.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(loadCourses.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(loadCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
      state.status = "success";
    });
  },
});

export const { openModal } = coursesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCoursesStatus = (state: RootState) => state.courses.status;
export const selectIsModalVisible = (state: RootState) =>
  state.courses.isModalVisible;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };*/

export default coursesSlice.reducer;
