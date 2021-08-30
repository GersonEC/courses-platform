import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  increment,
  incrementAsync,
  selectCourses,
} from "../../features/courses/coursesSlice";
import styles from "./Counter.module.css";

export function CourseContainer() {
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <h1>Ciao</h1>
    </div>
  );
}
