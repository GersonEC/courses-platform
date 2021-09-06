import { useParams } from "react-router";

interface ParamTypes {
  lessonId: string;
}
export const LessonPage = () => {
  const { lessonId } = useParams<ParamTypes>();

  return <div>{lessonId}</div>;
};
