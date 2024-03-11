import React from "react";

interface Props {
  years: number[];
  semesters: string[];
  totalSum: () => number;
  countSum: (year: number, semester: string) => number;
}

const CalcTableSum = ({ years, semesters, totalSum, countSum }: Props) => {
  const gradRequire = 124;
  const completedCredits = totalSum();
  const completedRatio =
    Math.round((completedCredits / gradRequire) * 100 * 10) / 10;

  return (
    <div className="m-2">
      <div className="stats shadow my-4">
        <div className="stat">
          <div
            className="stat-figure radial-progress text-primary"
            style={{ "--value": `${completedRatio}` } as React.CSSProperties}
          >
            {completedRatio}%
          </div>
          <div className="stat-title">達成進捗</div>
          <div className="stat-value text-primary">
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
            <tr>
              <th>合計</th>
              {years.map((year) =>
                semesters.map((semester) => <td>{countSum(year, semester)}</td>)
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalcTableSum;
