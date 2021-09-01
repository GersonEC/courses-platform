import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  openModal,
  loadCourses,
  selectCourses,
  selectCoursesStatus,
  selectIsModalVisible,
} from "../../features/courses/coursesSlice";
import { Course as CourseModel } from "../../utils/models";
import { Course } from "./Course";
import { NewCourse } from "./NewCourse";

export function CourseContainer() {
  const courses = useAppSelector(selectCourses);
  const isModalVisible = useAppSelector(selectIsModalVisible);
  const dispatch = useAppDispatch();

  const coursesStatus = useAppSelector(selectCoursesStatus);

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  const showModal = () => {
    dispatch(openModal());
  };

  if (coursesStatus === "pending") {
    return <h1>Loading courses...</h1>;
  }

  if (coursesStatus === "error") {
    return <h1>Something went wrong :(</h1>;
  }

  return (
    <div>
      {courses.length > 0 ? (
        <div>
          <h1>Your Courses</h1>
          <button style={{ height: "2rem" }} onClick={showModal}>
            Add new Course
          </button>
          {courses.map((course: CourseModel) => (
            <div key={course.id}>
              <div
                style={{
                  display: "inline-flex",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                <Modal title="" visible={isModalVisible} footer={[]}>
                  <NewCourse />
                </Modal>
              </div>
              <Course course={course} />
            </div>
          ))}
        </div>
      ) : (
        <NewCourse />
      )}
    </div>
  );
}
