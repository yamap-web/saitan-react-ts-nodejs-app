import React, { useState, useEffect } from "react";
import type { Course, CourseDB } from "../types/interface";
import CalcTables from "./CalcTables";
import SelectTimetable from "./SelectTimetable";
import ClassAddModal from "./ClassAddModal";
import Timetables from "./Timetables";

const API_URL = process.env.REACT_PUBLIC_API_URL!;

const Body = () => {
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = () => {
    fetch(API_URL)
      .then((responseData) => {
        return responseData.json();
      })
      .then((result) => {
        const mappedResult = result.map((item: CourseDB) => ({
          id: item.id,
          year: item.year,
          semester: item.semester,
          day: item.day,
          time: item.time,
          classTitle: item.class_title,
          category: item.category,
          subCategory: item.sub_category,
          status: item.status,
          creditsNumber: item.credits_number,
        }));
        setCourse(mappedResult);
      });
  };

  const [selectedCourse, setSelectedCourse] = useState<Course[]>([]);

  const handleFilterCourse = (year: number, semester: string) => {
    const newFilteredCourse = course.filter(
      (item) => item.year == year && item.semester == semester
    );
    setSelectedCourse(newFilteredCourse);
  };

  const years = [2022, 2023, 2024, 2025];
  const semesters = ["春", "秋"];

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);

  useEffect(() => {
    handleFilterCourse(selectedYear, selectedSemester);
  }, [course]);

  const addCourse = (
    id: number,
    year: number,
    semester: string,
    day: string,
    time: number,
    classTitle: string,
    category: string,
    subCategory: string,
    status: boolean,
    creditsNumber: number
  ) => {
    const addData = {
      id,
      year,
      semester,
      day,
      time,
      classTitle,
      category,
      subCategory,
      status,
      creditsNumber,
    };
    fetch(API_URL, {
      body: JSON.stringify(addData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchCourse);
  };

  const checkCourse = (
    id: number,
    year: number,
    semester: string,
    day: string,
    time: number,
    classTitle: string,
    category: string,
    subCategory: string,
    status: boolean,
    creditsNumber: number
  ) => {
    const targetUrl = API_URL + id;
    const editData = {
      id: id,
      year: year,
      semester: semester,
      day: day,
      time: time,
      classTitle: classTitle,
      category: category,
      subCategory: subCategory,
      status: !status,
      creditsNumber: creditsNumber,
    };

    fetch(targetUrl, {
      body: JSON.stringify(editData),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchCourse);
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="btm-nav z-10">
        <button
          className={`text-primary ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <h3 className="font-bold">時間割</h3>
          </div>
        </button>
        <button
          className={`text-primary ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="font-bold">単位計算</h3>
          </div>
        </button>
      </div>

      <div className="tab-content sm:container mx-auto">
        {activeTab === 0 && (
          <div className="m-2">
            <div className="flex justify-between my-4">
              <SelectTimetable
                years={years}
                semesters={semesters}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedSemester={selectedSemester}
                setSelectedSemester={setSelectedSemester}
                handleFilterCourse={handleFilterCourse}
              />
              <ClassAddModal addCourse={addCourse} />
            </div>
            <Timetables course={selectedCourse} checkCourse={checkCourse} />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <CalcTables course={course} />
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
