import React from "react";

interface Props {
  years: number[];
  semesters: string[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedSemester: string;
  setSelectedSemester: (semester: string) => void;
  handleFilterCourse: (year: number, semester: string) => void;
}

const SelectTimetable = ({
  years,
  semesters,
  selectedYear,
  setSelectedYear,
  selectedSemester,
  setSelectedSemester,
  handleFilterCourse,
}: Props) => {

  const handleFilter = () => {
    handleFilterCourse(selectedYear, selectedSemester);
  };

  return (
    <>
      <div className="join">
        <select
          className="select select-bordered join-item"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          <option disabled selected>
            年度
          </option>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <select
          className="select select-bordered join-item"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option disabled selected>
            学期
          </option>
          {semesters.map((semester) => (
            <option key={semester}>{semester}</option>
          ))}
        </select>
        <button className="btn btn-primary join-item" onClick={handleFilter}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SelectTimetable;
