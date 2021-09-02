import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addLesson } from "../../features/lessons/lessonsSlice";

interface NewLessonProps {
  courseId: number;
}

export const NewLesson = ({ courseId }: NewLessonProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  //const inputRef = useRef(null);

  const reset = () => {
    setTitle("");
    setEditing(false);
  };

  const onNewLessonSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addLesson({ title, courseId }));
  };

  /*useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);*/

  return editing ? (
    <form onSubmit={onNewLessonSubmit}>
      <input
        //ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={reset}
        placeholder="Name the lesson"
      />
    </form>
  ) : (
    <button onClick={() => setEditing(true)}>New Lesson</button>
  );
};
