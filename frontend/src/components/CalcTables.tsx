import React from "react";
import CalcTableSum from "./CalcTableSum";
import CalcTableFaculty from "./CalcTableFaculty";
import CalcTableGeneral from "./CalcTableGeneral";

interface Course {
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

interface CalcTablesProps {
  course: Course[];
}

const CalcTables = ({ course }: CalcTablesProps) => {
  const years = [1, 2, 3, 4];
  const semesters = ["春", "秋"];
  const checkedCourse = course.filter((item: Course) => item.status);

  const totalSum = () => {
    return checkedCourse.reduce((sum, item) => sum + item.creditsNumber, 0);
  };
  const countSum = (year: number, semester: string) => {
    return checkedCourse
      .filter(
        (item) => item.year === year + 2022 - 1 && item.semester === semester
      )
      .reduce((sum, item) => sum + item.creditsNumber, 0);
  };

  const totalData = (category: string): number => {
    return checkedCourse
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.creditsNumber, 0);
  };
  const countData = (
    year: number,
    semester: string,
    subCategory: string
  ): number => {
    return checkedCourse
      .filter(
        (item) =>
          item.year === year + 2022 - 1 &&
          // 履修学年に入学年度を足して1引いた数が履修年度と一致する
          // 例えば、入学年度が2022年で履修学年が2年の場合、2022 + 2 - 1 = 2023となり、履修年度が2023年度のものを抽出できる
          // 他の数式を使うか検討中
          item.semester === semester &&
          item.subCategory === subCategory
      )
      .reduce((sum, item) => sum + item.creditsNumber, 0);
  };

  return (
    <div className="mb-20">
      <CalcTableSum
        years={years}
        semesters={semesters}
        totalSum={totalSum}
        countSum={countSum}
      />
      <CalcTableFaculty
        years={years}
        semesters={semesters}
        totalData={totalData}
        countData={countData}
      />
      <CalcTableGeneral
        years={years}
        semesters={semesters}
        totalData={totalData}
        countData={countData}
      />
    </div>
  );
};

export default CalcTables;
