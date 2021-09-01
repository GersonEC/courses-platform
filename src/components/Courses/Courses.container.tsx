import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addCourse,
  loadCourses,
  selectCourses,
  selectCoursesStatus,
} from "../../features/courses/coursesSlice";

export function CourseContainer() {
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();
  const [courseName, setCourseName] = useState("");
  const coursesStatus = useAppSelector(selectCoursesStatus);

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addCourse(courseName));
  };

  const onCourseChange = (e: any) => {
    setCourseName(e.target.value);
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
        courses.map((course) => {
          return (
            <ul>
              <li>{course && course.name}</li>
            </ul>
          );
        })
      ) : (
        <form onSubmit={onSubmit}>
          <h1>Create your first course</h1>
          <label>Pick a name</label>
          <input value={courseName} onChange={onCourseChange} />
          <button type="submit">Create Course</button>
        </form>
      )}
    </div>
  );
}
