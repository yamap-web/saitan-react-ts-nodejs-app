import React from 'react';

interface Props {
  years: number[];
  semesters: string[];
  totalData: (category: string) => number;
  countData: (year: number, semester: string, subCategory: string) => number;
}

const CalcTableFaculty: React.FC<Props> = ({ years, semesters, totalData, countData }) => {
  const gradRequire = 90;
  const completedCredits = totalData('学部教育');
  const completedRatio =
    Math.round((completedCredits / gradRequire) * 100 * 10) / 10;
  const subCategoriesFaculty = [
    '経営学リテラシー',
    '専門基礎',
    '専門基幹',
    '法律',
    'グローバルビジネス',
    '経営学部',
    '経済学部',
    '博士課程前期',
    '横浜市内大学単位互換',
    '国際交流',
    'インターン',
    'ゼミナール',
  ];

  return (
    <div className='m-2'>
      <div className='stats shadow my-4'>
        <div className='stat'>
          <div
            className='stat-figure radial-progress text-secondary'
            style={{ '--value': `${completedRatio}` } as React.CSSProperties}
          >
            {completedRatio}%
          </div>
          <div className='stat-title'>学部教育科目</div>
          <div className='stat-value text-secondary'>
            {completedCredits}
            <span className='text-xl'> 単位</span>
          </div>
          <div className='stat-desc'>/ 卒業要件{gradRequire}単位</div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th></th>
              {years.flatMap((year: number) =>
                semesters.map((semester: string) => (
                  <th key={`${year}${semester}`}>
                    {year}
                    {semester}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {subCategoriesFaculty.map((subCategory) => (
              <tr key={subCategory}>
                <th>{subCategory}</th>
                {years.map((year: number) =>
                  semesters.map((semester: string) => (
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

export default CalcTableFaculty;

