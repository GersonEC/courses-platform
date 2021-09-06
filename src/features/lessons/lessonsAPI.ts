import { Lesson } from "../../utils/models";

export const createLesson = (title: string, courseId: number) => {
  return fetchWithData(
    "/lessons",
    {
      title,
      courseId,
    },
    "POST"
  );
};

export const updateLesson = (lesson: Lesson) => {
  return fetchWithData(`/lessons/${lesson.id}`, lesson, "PUT");
};

export const deleteLesson = (lesson: Lesson) => {
  return fetchWithData(`/lessons/${lesson.id}`, lesson, "DELETE");
};

function fetchWithData(url = ``, data = {}, method = "POST") {
  // Default options are marked with *
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((response) => response.json());
}
