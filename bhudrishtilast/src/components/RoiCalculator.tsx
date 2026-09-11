import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Coins, 
  Zap, 
  TreePine, 
  FileCheck,
  Building
} from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [annualVolume, setAnnualVolume] = useState<number>(150000);
  const [manualMins, setManualMins] = useState<number>(45);
  const [automatedMins, setAutomatedMins] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(350);

  // Computations
  const totalManualHours = (annualVolume * manualMins) / 60;
  const totalAutomatedHours = (annualVolume * automatedMins) / 60;
  const hoursSaved = totalManualHours - totalAutomatedHours;
  const manualCostInr = totalManualHours * hourlyRate;
  const automatedCostInr = totalAutomatedHours * hourlyRate;
  const financialSavingsInr = manualCostInr - automatedCostInr;
  const speedupFactor = (manualMins / automatedMins).toFixed(1);

  // Formatting currency in Indian format
  const formatInrCrores = (val: number) => {
    const crores = val / 10000000;
    if (crores >= 1) {
      return `₹ ${crores.toFixed(2)} Cr`;
    }
    const lakhs = val / 100000;
    return `₹ ${lakhs.toFixed(2)} Lakhs`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>DILRMP Nationwide Rollout ROI & Efficiency Model</span>
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              Government Cost-Benefit Analysis
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulate administrative workload reduction and taxpayer savings for District / State revenue deployments
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Sliders Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1.5 font-medium">
              <span>Annual Record Volume</span>
              <span className="text-blue-700 font-bold font-mono">{annualVolume.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={annualVolume}
              onChange={(e) => setAnnualVolume(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">District / Division Scale</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1.5 font-medium">
              <span>Manual Time / Record</span>
              <span className="text-amber-800 font-bold font-mono">{manualMins} mins</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              step="5"
              value={manualMins}
              onChange={(e) => setManualMins(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Legacy manual transcription</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1.5 font-medium">
              <span>BhuDrishti AI Time</span>
              <span className="text-blue-700 font-bold font-mono">{automatedMins} mins</span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              step="1"
              value={automatedMins}
              onChange={(e) => setAutomatedMins(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">AI Extraction + Verification</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1.5 font-medium">
              <span>Staff Hourly Rate (₹)</span>
              <span className="text-blue-700 font-bold font-mono">₹ {hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="150"
              max="800"
              step="25"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Pay band 5200-20200 + GP</span>
          </div>
        </div>

        {/* Dynamic ROI Metric Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 shadow-2xs">
            <div className="flex items-center justify-between text-blue-800 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Financial Savings</span>
              <Coins className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-900 font-mono">
              {formatInrCrores(financialSavingsInr)}
            </div>
            <p className="text-[11px] text-blue-700 mt-1.5 font-medium">
              Direct administrative savings per year
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Staff Hours Saved</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {Math.round(hoursSaved).toLocaleString()} hrs
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Equivalent to {Math.round(hoursSaved / (8 * 250))} full-time officers reassigned
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Velocity Multiple</span>
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {speedupFactor}x Faster
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              From {manualMins} min manual to {automatedMins} min automated review
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Citizen Footfall Cut</span>
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              -82% Visits
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Instant digital copies without Tehsil visits
            </p>
          </div>
        </div>

        {/* Strategic Impact Rationale */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>National Scale-Up Roadmap (Phase I - IV)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-900 block mb-1">Statewide LRMS Interoperability:</span>
              <span>
                Standardizes disparate regional document formats across UP (CH-41), Maharashtra (7/12 Satbara), MP (B-1), and Punjab (Jamabandi) into a unified central DILRMP schema.
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-900 block mb-1">Zero Cloud Data Exfiltration:</span>
              <span>
                Engineered for strict on-premise execution within National Informatics Centre (NIC) data centers or state SDC enclaves using quantized offline Indic models.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
