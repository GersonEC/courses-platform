import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addCourse } from "../../features/courses/coursesSlice";

export const NewCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const dispatch = useAppDispatch();

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

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Add new course</h1>
        <label>Pick a name</label>
        <input value={courseName} onChange={onCourseChange} />
        <label>Pick a price</label>
        <input value={coursePrice} onChange={onCoursePriceChange} />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};
