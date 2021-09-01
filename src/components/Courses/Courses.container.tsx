import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addCourse,
  loadCourses,
  selectCourses,
  selectCoursesStatus,
} from "../../features/courses/coursesSlice";
import { Course as CourseModel } from "../../utils/models";
import { Course } from "./Course";

export function CourseContainer() {
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const coursesStatus = useAppSelector(selectCoursesStatus);

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addCourse({ name: courseName, price: coursePrice }));
  };

  const onCourseChange = (e: any) => {
    setCourseName(e.target.value);
  };
  const onCoursePriceChange = (e: any) => {
    setCoursePrice(e.target.value);
  };

  if (coursesStatus === "pending") {
    return <h1>Loading courses...</h1>;
  }

  if (coursesStatus === "error") {
    return <h1>Something went wrong :(</h1>;
  }

  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course: CourseModel) => (
          <Course key={course.id} name={course.name} price={course.price} />
        ))
      ) : (
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Create your first course</h1>
          <label>Pick a name</label>
          <input value={courseName} onChange={onCourseChange} />
          <label>Pick a price</label>
          <input value={coursePrice} onChange={onCoursePriceChange} />
          <button type="submit">Create Course</button>
        </form>
      )}
    </div>
  );
}
