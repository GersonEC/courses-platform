import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadCourses,
  selectCourses,
} from "../../features/courses/coursesSlice";
import { Course } from "../../utils/models";

interface ParamTypes {
  courseId: string;
}

export const CourseDetail = () => {
  const { courseId } = useParams<ParamTypes>();
  const courses = useAppSelector(selectCourses);
  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [courseFound, setCourseFound] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      const course = courses.find((c) => c.id === parseInt(courseId));
      if (course) {
        setCurrentCourse(course);
        setCourseFound(true);
      } else {
        setCourseFound(false);
      }
    }
  }, [courseId, courses]);

  if (!currentCourse && courseFound === null) {
    return <h1>Loading Course...</h1>;
  }

  if (!currentCourse && courseFound === false) {
    return <h1>Course doesn't found</h1>;
  }

  return (
    <div>
      {currentCourse && (
        <>
          <h1>Course Id: {currentCourse.id}</h1>
          <h1>Course name: {currentCourse.name}</h1>
        </>
      )}
    </div>
  );
};
