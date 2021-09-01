import { useParams } from "react-router-dom";

interface ParamTypes {
  courseId: string;
}

export const CourseDetail = () => {
  const { courseId } = useParams<ParamTypes>();
  return <h1>Id del corso {courseId}</h1>;
};
