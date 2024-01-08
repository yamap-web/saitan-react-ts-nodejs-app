import React from "react";

interface Props {
  years: number[];
  semesters: string[];
  totalData: (category: string) => number;
  countData: (year: number, semester: string, subCategory: string) => number;
}

const CalcTableGeneral: React.FC<Props> = ({ years, semesters, totalData, countData }) => {
  const gradRequire = 34;
  const completedCredits = totalData("全学教育");
  const completedRatio =
    Math.round((completedCredits / gradRequire) * 100 * 10) / 10;
  const subCategoriesGeneral = [
    "英語",
    "初修外国語",
    "統計学基礎",
    "高度全学教育",
    "自由選択",
    "健康スポーツ",
  ];

  return (
    <div className="m-2">
      <div className="stats shadow my-4">
        <div className="stat">
          <div
            className="stat-figure radial-progress text-accent"
            style={{ '--value': `${completedRatio}` } as React.CSSProperties}
          >
            {completedRatio}%
          </div>
          <div className="stat-title">全学教育科目</div>
          <div className="stat-value text-accent">
            {completedCredits}
            <span className="text-xl"> 単位</span>
          </div>
          <div className="stat-desc">/ 卒業要件{gradRequire}単位</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              {years.flatMap((year) =>
                semesters.map((semester) => (
                  <th key={`${year}${semester}`}>
                    {year}
                    {semester}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {subCategoriesGeneral.map((subCategory) => (
              <tr key={subCategory}>
                <th>{subCategory}</th>
                {years.map((year) =>
                  semesters.map((semester) => (
                    <td key={`${year}${semester}${subCategory}`}>
                      {countData(year, semester, subCategory)}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalcTableGeneral;
