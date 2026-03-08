import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Calendar, TrendingUp, AlertCircle, List } from 'lucide-react';

// 模擬 Sheet 151440 的數據 (根據你提供的 CSV 資料)
const mockData = [
  { id: 'TU6', date: '2025-08-15', income: 24000, dtiIncrease: 1.0, accmuDebt: 24000, eachLoan: 24000, distance: 0, dti: 1.0 },
  { id: 'TU5', date: '2025-09-20', income: 24000, dtiIncrease: 1.5, accmuDebt: 60000, eachLoan: 36000, distance: 36, dti: 2.5 },
  { id: 'TU4', date: '2025-11-05', income: 24000, dtiIncrease: 2.0, accmuDebt: 108000, eachLoan: 48000, distance: 46, dti: 4.5 },
  { id: 'TU3', date: '2025-12-15', income: 24000, dtiIncrease: 3.5, accmuDebt: 192000, eachLoan: 84000, distance: 40, dti: 8.0 },
  { id: 'TU2', date: '2026-01-12', income: 24000, dtiIncrease: 2.5, accmuDebt: 252000, eachLoan: 60000, distance: 28, dti: 10.5 },
  { id: 'TU1', date: '2026-02-12', income: 24000, dtiIncrease: 1.25, accmuDebt: 282000, eachLoan: 30000, distance: 31, dti: 11.75 },
];

// 每個數據點固定顯示的標籤（日期 + dti），一載入就固定顯示，不需滑過或點擊
const PointLabel = ({ x, y, payload }) => {
  if (!payload) return null;
  const w = 100;
  const h = 38;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x={-w / 2}
        y={-h - 8}
        width={w}
        height={h}
        rx={6}
        ry={6}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth={1}
      />
      <text x={0} y={-h - 8 + 14} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={500}>
        {payload.date}
      </text>
      <text x={0} y={-h - 8 + 28} textAnchor="middle" fontSize={11}>
        <tspan fill="#22d3ee">dti</tspan>
        <tspan fill="#cbd5e1"> : </tspan>
        <tspan fill="#fff">{payload.dti}</tspan>
      </text>
    </g>
  );
};

const MonitoringAndAlert = () => {
  const [selectedRecord, setSelectedRecord] = useState(mockData[mockData.length - 1]);
  const [showDebtList, setShowDebtList] = useState(false);

  const handleChartClick = (state) => {
    if (state?.activePayload?.[0]?.payload) {
      setSelectedRecord(state.activePayload[0].payload);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-cyan-400" /> Monitoring and Alert — 6 個月 DTI 負債趨勢監控
            </h1>
            <p className="text-slate-400 text-sm mt-1">系統編號: Sheet 151440 | 基於對上 6 次紀錄演化</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block uppercase">當前狀態</span>
            <span className="text-cyan-400 font-mono font-bold">MONITORING ACTIVE</span>
          </div>
        </header>

        {/* 圖表區域 (圖 3 視覺風格) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 shadow-2xl relative">
          {/* 右上角：點擊打開負債演化明細清單（疊在趨勢圖上） */}
          <button
            type="button"
            onClick={() => setShowDebtList((v) => !v)}
            className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition"
            title={showDebtList ? '收起負債演化明細清單' : '打開負債演化明細清單'}
          >
            <List size={18} />
            <span className="text-xs font-medium">負債演化明細</span>
          </button>
          <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                onClick={handleChartClick}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'DTI 倍數', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line
                  type="monotone"
                  dataKey="dti"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#22d3ee', strokeWidth: 2, stroke: '#0a0f1e' }}
                  activeDot={{ r: 8, fill: '#fff', cursor: 'pointer' }}
                >
                  <LabelList content={(props) => <PointLabel {...props} />} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
            {/* 圖 1：負債演化明細清單 — 點擊後疊在趨勢圖前方 */}
            {showDebtList && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-slate-950/90 backdrop-blur-sm p-4">
                <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 bg-slate-800/50 px-4 py-3">
                    <span className="font-semibold text-sm text-white">負債演化明細清單</span>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-[10px] rounded uppercase tracking-wider">
                      Historical Data
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDebtList(false)}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white"
                      aria-label="關閉"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="overflow-x-auto max-h-[60vh]">
                    <table className="w-full text-left text-sm">
                      <thead className="sticky top-0 bg-slate-800/95">
                        <tr className="text-slate-500 border-b border-slate-700">
                          <th className="p-3 font-medium">Open Acc</th>
                          <th className="p-3 font-medium">Opened Date</th>
                          <th className="p-3 font-medium text-right">Loan Amt</th>
                          <th className="p-3 font-medium text-right">DTI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {mockData.map((row) => (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedRecord(row)}
                            className={`cursor-pointer transition-colors ${selectedRecord.id === row.id ? 'bg-cyan-500/10' : 'hover:bg-slate-800/50'}`}
                          >
                            <td className={`p-3 font-mono ${selectedRecord.id === row.id ? 'text-cyan-400' : 'text-slate-200'}`}>{row.id}</td>
                            <td className="p-3 text-slate-400">{row.date}</td>
                            <td className="p-3 text-right font-mono text-slate-200">${row.eachLoan.toLocaleString()}</td>
                            <td className="p-3 text-right font-mono">
                              <span className={`px-2 py-0.5 rounded ${row.dti > 10 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>{row.dti.toFixed(2)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-center text-xs text-slate-500 mt-4 italic">
            * 點擊圖表上的數據點可查看詳細負債結構
          </p>
        </div>

        {/* 圖 2：固定放在 6 個月 DTI 負債趨勢圖下方，始終顯示 */}
        <div className="space-y-4 rounded-xl border border-slate-700 bg-[#111827] p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg border border-slate-700">
              <div className="bg-slate-800/80 px-3 py-2 text-sm font-semibold text-slate-200">Code Alert</div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/60">
                  <tr className="text-slate-500 border-b border-slate-700">
                    <th className="p-2 font-medium">Select</th>
                    <th className="p-2 font-medium text-right">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr><td className="p-2 text-slate-200">OPEN ACCOUNTS</td><td className="p-2 text-right font-mono text-slate-200">3600</td></tr>
                  <tr><td className="p-2 text-slate-200">ENQUIRY ALERT</td><td className="p-2 text-right font-mono text-slate-200">1100</td></tr>
                  <tr><td className="p-2 text-slate-200">OPEN ACCOUNTS</td><td className="p-2 text-right font-mono text-slate-200">1200</td></tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-700">
              <div className="bg-slate-800/80 px-3 py-2 text-center">
                <div className="text-sm font-semibold text-slate-200">ENQUIRY ALERT</div>
                <div className="text-xs text-slate-400">Within 3 mth</div>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/60">
                  <tr className="text-slate-500 border-b border-slate-700">
                    <th className="p-2 font-medium">Member</th>
                    <th className="p-2 font-medium">Date</th>
                    <th className="p-2 font-medium">Type</th>
                    <th className="p-2 font-medium">Purpose</th>
                    <th className="p-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-2 text-slate-200">BANK-CONSUMER LENDING</td>
                    <td className="p-2 text-slate-400">3-3-2026</td>
                    <td className="p-2 font-mono text-slate-200">5710</td>
                    <td className="p-2 text-slate-400">New app</td>
                    <td className="p-2 text-right text-slate-400">N/L</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-slate-200">FINANCE-RCC-CR</td>
                    <td className="p-2 text-slate-400">16-01-2026</td>
                    <td className="p-2 font-mono text-slate-200">5711</td>
                    <td className="p-2 text-slate-400">RENEWAL</td>
                    <td className="p-2 text-right text-slate-400">N/L</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-slate-200">FINANCE-CREDIT/CHARGE CARD</td>
                    <td className="p-2 text-slate-400">16-12-2025</td>
                    <td className="p-2 font-mono text-slate-200">5520</td>
                    <td className="p-2 text-slate-400">New app</td>
                    <td className="p-2 text-right text-slate-400">N/L</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-700">
            <div className="bg-slate-800/80 px-3 py-2 text-sm font-semibold text-slate-200 text-center">No.of Acc Within 3 mth</div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/60">
                <tr className="text-slate-500 border-b border-slate-700">
                  <th className="p-2 font-medium">TU</th>
                  <th className="p-2 font-medium">Member</th>
                  <th className="p-2 font-medium">Date</th>
                  <th className="p-2 font-medium">Type</th>
                  <th className="p-2 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-2 font-mono text-slate-200">1</td>
                  <td className="p-2 text-slate-200">FINANCE</td>
                  <td className="p-2 text-slate-400">08-01-2026</td>
                  <td className="p-2 font-mono text-slate-200">5520</td>
                  <td className="p-2 text-right font-mono text-slate-200">10,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-slate-200">2</td>
                  <td className="p-2 text-slate-200">FINANCE</td>
                  <td className="p-2 text-slate-400">12-01-2026</td>
                  <td className="p-2 font-mono text-slate-200">5710</td>
                  <td className="p-2 text-right font-mono text-slate-200">20,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-slate-200">3</td>
                  <td className="p-2 text-slate-200">FINANCE</td>
                  <td className="p-2 text-slate-400">24-10-2025</td>
                  <td className="p-2 font-mono text-slate-200">3100</td>
                  <td className="p-2 text-right font-mono text-slate-200">30,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-slate-200">4</td>
                  <td className="p-2 text-slate-200">BANK</td>
                  <td className="p-2 text-slate-400">14-02-2025</td>
                  <td className="p-2 font-mono text-slate-200">5520</td>
                  <td className="p-2 text-right font-mono text-slate-200">11,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 左側：選中點的關鍵指標 */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5">
              <h3 className="text-cyan-400 text-sm font-semibold mb-4 flex items-center gap-2">
                <AlertCircle size={16} /> 當前選定記錄: {selectedRecord.id}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Income</span>
                  <span className="font-mono text-white">${selectedRecord.income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-3">
                  <span className="text-slate-400 text-sm">Accmu Debt</span>
                  <span className="font-mono text-white text-lg font-bold">
                    ${selectedRecord.accmuDebt.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">DTI Increase</span>
                  <span
                    className={`font-mono font-bold ${selectedRecord.dtiIncrease > 2 ? 'text-yellow-400' : 'text-green-400'}`}
                  >
                    {selectedRecord.dtiIncrease}x
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs block uppercase">借款距離天數</span>
                <span className="text-xl font-bold text-white">{selectedRecord.distance} Days</span>
              </div>
              <Calendar className="text-slate-600" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringAndAlert;
