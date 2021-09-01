import { useAppSelector } from "../app/hooks";
import { CourseContainer } from "../components/Courses/Courses.container";
import { selectCoursesStatus } from "../features/courses/coursesSlice";

const CoursePage = () => {
  const coursesStatus = useAppSelector(selectCoursesStatus);

  if (coursesStatus === "pending") {
    return <h1>Loading courses...</h1>;
  }

  if (coursesStatus === "error") {
    return <h1>Something went wrong :(</h1>;
  }

  return (
    <div>
      <CourseContainer />
    </div>
  );
};

export default CoursePage;
