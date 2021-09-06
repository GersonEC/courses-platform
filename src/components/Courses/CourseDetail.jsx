import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadCourses,
  selectCourses,
} from "../../features/courses/coursesSlice";
import {
  deleteLesson,
  loadLessons,
  saveLesson,
  selectLessons,
} from "../../features/lessons/lessonsSlice";
import { NewLesson } from "../Lessons/NewLesson";
import EditableLabel from "react-editable-label";

/*interface ParamTypes {
  courseId: string;
}*/

export const CourseDetail = ({ children }) => {
  const { courseId } = useParams();
  const courses = useAppSelector(selectCourses);
  const lessons = useAppSelector(selectLessons);
  const [currentCourse, setCurrentCourse] = useState();
  const [courseFound, setCourseFound] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCourses());
    dispatch(loadLessons());
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

  const onLessonEdit = (lesson, newTitle) => {
    const lessonEdited = { ...lesson };
    lessonEdited.title = newTitle;
    dispatch(saveLesson(lessonEdited));
  };

  const onLessonDelete = (lesson) => {
    dispatch(deleteLesson(lesson));
  };

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
          <div>
            <h1>Course Id: {currentCourse.id}</h1>
            <h1>Course name: {currentCourse.name}</h1>
          </div>
          <div style={{ textAlign: "left", marginLeft: "2rem" }}>
            <div>
              {lessons.length > 0 && (
                <ul>
                  {lessons
                    .filter((lesson) => lesson.courseId === currentCourse.id)
                    .map((lesson) => (
                      <li
                        style={{
                          display: "flex",
                          gap: "2rem",
                          marginBlockEnd: "1rem",
                        }}
                        key={lesson.id}
                      >
                        <Link
                          to={`/courses/${currentCourse.id}/lessons/${lesson.id}`}
                        >
                          Select
                        </Link>
                        <div
                          style={{
                            border: "1px dashed gray",
                            display: "flex",
                            ":hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          <EditableLabel
                            initialValue={lesson.title}
                            save={(newTitle) => onLessonEdit(lesson, newTitle)}
                          />
                          <button
                            style={{ marginLeft: "2rem" }}
                            onClick={() => onLessonDelete(lesson)}
                          >
                            delete
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
              <NewLesson courseId={currentCourse.id} />
            </div>
          </div>
          <div>{children}</div>
        </>
      )}
    </div>
  );
};
