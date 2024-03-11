import React, { useState } from "react";

interface ClassAddModalProps {
  addCourse: (
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
  ) => void;
}

const ClassAddModal = ({ addCourse }: ClassAddModalProps) => {
  const years = [2022, 2023, 2024, 2025];
  const semesters = ["春", "秋"];
  const days = ["月", "火", "水", "木", "金"];
  const times = [1, 2, 3, 4, 5, 6];
  const categories = ["学部教育", "全学教育"];
  const subCategories = [
    "経営学リテラシー",
    "専門基礎",
    "専門基幹",
    "法律",
    "グローバルビジネス",
    "経営学部",
    "経済学部",
    "博士課程前期",
    "横浜市内大学単位互換",
    "国際交流",
    "インターン",
    "ゼミナール",
    "英語",
    "初修外国語",
    "統計学基礎",
    "高度全学教育",
    "自由選択",
    "健康スポーツ",
  ];
  const creditsNumbers = [1, 2, 3, 4, 5, 6];

  const initData = {
    id: 0,
    year: 0,
    semester: "",
    day: "",
    time: 0,
    classTitle: "",
    category: "",
    subCategory: "",
    status: false,
    creditsNumber: 0,
  };

  const [form, setForm] = useState(initData);

  const handleInputChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: ["year", "time", "creditsNumber"].includes(name)
        ? parseInt(value, 10)
        : value,
    });
  };

  const handleSubmit = () => {
    const {
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
    } = form;
    addCourse(
      id,
      year,
      semester,
      day,
      time,
      classTitle,
      category,
      subCategory,
      status,
      creditsNumber
    );
  };

  const openModal = () => {
    const modalElement = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => openModal()}>
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
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
        授業の追加
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">授業</h3>

          <form onSubmit={handleSubmit}>
            <div className="join mt-6 grid grid-flow-col justify-stretch">
              <select
                name="year"
                className="select select-bordered join-item"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  年度
                </option>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <select
                name="semester"
                className="select select-bordered join-item"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  学期
                </option>
                {semesters.map((semester) => (
                  <option key={semester}>{semester}</option>
                ))}
              </select>
              <select
                name="day"
                className="select select-bordered join-item"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  曜日
                </option>
                {days.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
              <select
                name="time"
                className="select select-bordered join-item"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  時限
                </option>
                {times.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </div>
            <input
              name="classTitle"
              type="text"
              placeholder="授業名"
              className="input input-bordered select-primary w-full mt-2"
              onChange={handleInputChange}
            />
            <div className="join mt-2 flex justify-stretch">
              <select
                name="category"
                className="select select-bordered join-item w-full"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  カテゴリー
                </option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <select
                name="subCategory"
                className="select select-bordered join-item w-full"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  サブカテゴリー
                </option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory}>{subCategory}</option>
                ))}
              </select>
              <select
                name="creditsNumber"
                className="select select-bordered join-item w-full"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  単位数
                </option>
                {creditsNumbers.map((creditsNumber) => (
                  <option key={creditsNumber}>{creditsNumber}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 grid grid-flow-col justify-end">
              <button type="submit" className="btn btn-primary">
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                追加
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ClassAddModal;
