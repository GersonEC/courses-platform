import { useAppSelector } from "../app/hooks";
import { CourseContainer } from "../components/Courses/Courses.container";
import { selectCoursesStatus } from "../features/courses/coursesSlice";

const CoursePage = () => {
  return (
    <div>
      <CourseContainer />
    </div>
  );
};

export default CoursePage;
