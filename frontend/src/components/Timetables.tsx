import React, { useState } from "react";

interface Props {
  course: Course[];
  checkCourse: (
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

const Timetables = ({ course, checkCourse }: Props) => {
  const [pickedCourse, setPickedCourse] = useState<Course[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const modalFlg = document.getElementById("my_modal_2") as HTMLDialogElement;

  const handleCellClick = (day: string, time: number) => {
    const filteredCourse = course.filter(
      (course) => course.day === day && course.time === time
    );
    setPickedCourse(filteredCourse);
    setModalTitle(`${day}曜${time}限`);
    if (modalFlg) {
      modalFlg.showModal();
    }
  };

  const days = ["月", "火", "水", "木", "金"];
  const times = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-center table-fixed timetable-style">
          <thead>
            <tr>
              <th></th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <th>{time}</th>
                {days.map((day) => (
                  <th key={day} onClick={() => handleCellClick(day, time)}>
                    {course
                      .filter(
                        (item) =>
                          item.day === day && item.time === time && item.status
                      )
                      .map((item) => (
                        <span key={item.id} className="badge">
                          {item.classTitle}
                        </span>
                      ))}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{modalTitle}</h3>

          <div className="overflow-x-auto py-4">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Sub Cat.</th>
                </tr>
              </thead>
              <tbody>
                {pickedCourse.map((item) => (
                  <tr key={item.classTitle}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={item.status}
                          onChange={() => {
                            checkCourse(
                              item.id,
                              item.year,
                              item.semester,
                              item.day,
                              item.time,
                              item.classTitle,
                              item.category,
                              item.subCategory,
                              item.status,
                              item.creditsNumber
                            );
                            modalFlg.close();
                          }}
                        />
                      </label>
                    </th>
                    <td>{item.classTitle}</td>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </>
  );
};

export default Timetables;
