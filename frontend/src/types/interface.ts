export interface Course {
  id: number;
  year: number;
  semester: string;
  day: string;
  time: number;
  classTitle: string;
  category: string;
  subCategory: string;
  status: boolean;
  creditsNumber: number;
}

export interface CourseDB {
  id: number;
  year: number;
  semester: string;
  day: string;
  time: number;
  class_title: string;
  category: string;
  sub_category: string;
  status: boolean;
  credits_number: number;
}
