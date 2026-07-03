import React, { useState } from 'react';
import MonitoringAndAlert from './pages/MonitoringAndAlert';
import CaseDistribution from './pages/CaseDistribution';

function App() {
  const [tab, setTab] = useState('monitoring');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <div className="border-b border-slate-800 bg-[#020617]/95 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-semibold tracking-tight text-slate-300">
            <span className="text-cyan-400">K Cash</span> Risk Console
          </div>
          <div className="flex gap-2 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => setTab('monitoring')}
              className={`px-3 py-1.5 rounded-full border transition ${
                tab === 'monitoring'
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-transparent bg-slate-800/60 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Monitoring and Alert
            </button>
            <button
              type="button"
              onClick={() => setTab('case')}
              className={`px-3 py-1.5 rounded-full border transition ${
                tab === 'case'
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-transparent bg-slate-800/60 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Case Distribution
            </button>
            <a
              href="/revolving-score.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full border border-transparent bg-slate-800/60 text-slate-400 hover:bg-slate-700 transition text-xs md:text-sm"
            >
              評分計算公式
            </a>
          </div>
        </div>
      </div>

      {tab === 'monitoring' ? <MonitoringAndAlert /> : <CaseDistribution />}
    </div>
  );
}

export default App;

