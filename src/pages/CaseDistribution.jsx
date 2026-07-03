import React from 'react';

// 最初版本：只有一個 Case Distribution 表格，沒有 Personal / DSR / DTI
const mockCases = [
  {
    date: '23/1/2026',
    weekday: 'Mon',
    n: 30,
    t: 15,
    property: 16,
    beforeDsr: 30,
    beforeDti: 38,
    inProgress: 8,
    rejected: 24,
    decline: 12,
    transfer: 7,
    completed: 12,
    application: 61,
  },
  {
    date: '29/1/2026',
    weekday: 'Sun',
    n: 25,
    t: 25,
    property: 15,
    beforeDsr: 30,
    beforeDti: 33,
    inProgress: 8,
    rejected: 21,
    decline: 4,
    transfer: 4,
    completed: 28,
    application: 65,
  },
  {
    date: '2/1/2026',
    weekday: 'Sat',
    n: 18,
    t: 12,
    property: 22,
    beforeDsr: 25,
    beforeDti: 25,
    inProgress: 9,
    rejected: 18,
    decline: 5,
    transfer: 3,
    completed: 17,
    application: 52,
  },
  {
    date: '20/1/2026',
    weekday: 'Fri',
    n: 25,
    t: 10,
    property: 24,
    beforeDsr: 39,
    beforeDti: 29,
    inProgress: 11,
    rejected: 19,
    decline: 8,
    transfer: 2,
    completed: 19,
    application: 59,
  },
];

const CaseDistribution = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-white mb-1">Case Distribution</h1>
          <p className="text-slate-400 text-sm">
            近期貸款 Case 每日分佈情況（示意數據）。
          </p>
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-2xl">
          <div className="bg-slate-800/70 px-4 py-3 text-sm font-semibold text-slate-200 flex justify-between">
            <span>Daily Case Distribution</span>
            <span className="text-[11px] text-slate-400">Base table (no drilldown)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left">
              <thead className="bg-slate-800/90">
                <tr className="text-slate-300 border-b border-slate-700">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Weekday</th>
                  <th className="px-3 py-2 font-medium text-right">N</th>
                  <th className="px-3 py-2 font-medium text-right">T</th>
                  <th className="px-3 py-2 font-medium text-right">Property</th>
                  <th className="px-3 py-2 font-medium text-right">Before DSR &lt; 80</th>
                  <th className="px-3 py-2 font-medium text-right">Before DTI &lt; 20</th>
                  <th className="px-3 py-2 font-medium text-right">In Progress</th>
                  <th className="px-3 py-2 font-medium text-right">Rejected</th>
                  <th className="px-3 py-2 font-medium text-right">Decline</th>
                  <th className="px-3 py-2 font-medium text-right">Transfer</th>
                  <th className="px-3 py-2 font-medium text-right">Completed</th>
                  <th className="px-3 py-2 font-medium text-right">Application</th>
                  <th className="px-3 py-2 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {mockCases.map((row) => (
                  <tr
                    key={`${row.date}-${row.weekday}`}
                    className="border-t border-slate-800 hover:bg-slate-800/60"
                  >
                    <td className="px-3 py-2 text-slate-200 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-3 py-2 text-slate-300 whitespace-nowrap">
                      {row.weekday}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200">{row.n}</td>
                    <td className="px-3 py-2 text-right text-slate-200">{row.t}</td>
                    <td className="px-3 py-2 text-right text-slate-200">
                      {row.property}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200 bg-pink-900/30">
                      {row.beforeDsr}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200 bg-pink-900/20">
                      {row.beforeDti}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200">
                      {row.inProgress}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200">
                      {row.rejected}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200">
                      {row.decline}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-200">
                      {row.transfer}
                    </td>
                    <td className="px-3 py-2 text-right text-emerald-300 font-semibold">
                      {row.completed}
                    </td>
                    <td className="px-3 py-2 text-right text-cyan-300 font-semibold">
                      {row.application}
                    </td>
                    <td className="px-3 py-2 text-slate-400">Bottom</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDistribution;

