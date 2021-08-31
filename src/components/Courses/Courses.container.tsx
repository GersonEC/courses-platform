import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addCourse, selectCourses } from "../../features/courses/coursesSlice";

export function CourseContainer() {
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();
  const [courseName, setCourseName] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addCourse(courseName));
  };

  const onCourseChange = (e: any) => {
    setCourseName(e.target.value);
  };

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
