export type AdminT = { username: string; password: string };

export type UserT = {
  username: string;
  password: string;
  purchasedCourses: string[];
};

export type CourseT = {
  _id: string;
  title: string;
  price: number;
  description?: string;
  imageLink?: string;
  published?: boolean;
};

export type CoursesT = CourseT[];
