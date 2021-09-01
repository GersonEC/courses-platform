import { Link } from "react-router-dom";
import { Course as CourseModel } from "../../utils/models";

interface CourseProps {
  course: CourseModel;
}

export const Course = ({ course }: CourseProps) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5rem",
          border: "1px solid gray",
          marginBlockEnd: "1rem",
          alignItems: "center",
        }}
      >
        <h3>{course.name}</h3> <h4>€ {course.price}</h4>
      </div>
    </Link>
  );
};
