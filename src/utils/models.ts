export interface Course {
  id: number;
  name: string;
  price: number;
}

export interface Lesson {
  id: number;
  title: string;
  courseId: number;
}
