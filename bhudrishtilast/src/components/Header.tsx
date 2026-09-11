import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Cpu, 
  Calculator, 
  FileText, 
  RotateCcw, 
  Server, 
  UserCheck, 
  MapPin, 
  Award,
  ChevronDown
} from 'lucide-react';
import type { UserProfile, UserRole } from '../types';
import { DEMO_PRESET_USERS } from '../services/api';

interface HeaderProps {
  currentUser: UserProfile | null;
  onSwitchUser: (email: string, pass: string) => void;
  activeTab: 'workspace' | 'cadastral' | 'risk' | 'audit' | 'learning' | 'roi';
  setActiveTab: (tab: 'workspace' | 'cadastral' | 'risk' | 'audit' | 'learning' | 'roi') => void;
  onOpenDataSovereignty: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSwitchUser,
  activeTab,
  setActiveTab,
  onOpenDataSovereignty,
  onResetDemo
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getRoleBadgeColor = (role?: UserRole) => {
    switch (role) {
      case 'Tehsildar / SDM':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Patwari / Talathi':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'DILRMP Admin':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
      {/* Top Ministerial Notification Banner */}
      <div className="bg-blue-900 px-4 py-1.5 border-b border-blue-950 text-xs flex flex-wrap items-center justify-between gap-2 text-blue-100">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-800 text-white font-semibold tracking-wide border border-blue-700">
            <Award className="w-3.5 h-3.5 text-amber-300" /> SIH 2026 • SIH26018
          </span>
          <span className="text-blue-100 font-medium hidden sm:inline">
            Ministry of Rural Development • Digital India Land Records Modernization Programme (DILRMP)
          </span>
        </div>

        <div className="flex items-center gap-4 text-blue-200 text-[11px]">
          <span className="inline-flex items-center gap-1">
            <Database className="w-3 h-3 text-blue-300" />
            <span className="text-white font-medium">Registry:</span> Active
          </span>
          <span className="inline-flex items-center gap-1">
            <Cpu className="w-3 h-3 text-blue-300" />
            <span className="text-white font-medium">AI Engine:</span> Indic VLM Adapter
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-300" />
            <span className="text-white font-medium">Audit:</span> SHA-256 Chained
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 bg-white">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 text-white font-bold text-xl">
            भू
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                BhuDrishti
              </h1>
              <span className="text-xs text-blue-700 font-semibold tracking-wide uppercase bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                v4.0
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              Intelligent Land Record Digitization & Validation System
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'workspace'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Digitization & Review</span>
          </button>

          <button
            onClick={() => setActiveTab('cadastral')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'cadastral'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Cadastral GIS Map</span>
          </button>

          <button
            onClick={() => setActiveTab('risk')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'risk'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Explainable Risk</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Audit Trail</span>
          </button>

          <button
            onClick={() => setActiveTab('learning')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'learning'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Active Learning</span>
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'roi'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>ROI Model</span>
          </button>
        </nav>

        {/* Officer Profile & Demo Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Data Sovereignty info button */}
          <button
            onClick={onOpenDataSovereignty}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs flex items-center gap-1.5 transition-colors font-medium"
            title="Sovereign deployment architecture"
          >
            <Server className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden xl:inline">Data Sovereignty</span>
          </button>

          {/* Reset Demo button */}
          <button
            onClick={onResetDemo}
            className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs transition-colors"
            title="Reset Demo Records"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Officer Selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all shadow-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  {currentUser?.name || 'Authorized Officer'}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getRoleBadgeColor(currentUser?.role)}`}>
                    {currentUser?.role || 'Operator'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {/* Dropdown Menu for quick role switching during hackathon */}
            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setRoleDropdownOpen(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Switch Demo Persona
                </div>
                {DEMO_PRESET_USERS.map((u) => {
                  const isCurrent = currentUser?.email === u.email;
                  return (
                    <button
                      key={u.email}
                      onClick={() => onSwitchUser(u.email, u.pass)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-colors ${
                        isCurrent
                          ? 'bg-blue-50 text-blue-900 border border-blue-200 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{u.label}</span>
                        {isCurrent && <span className="text-[10px] text-blue-600 font-bold">● Active</span>}
                      </div>
                      <span className="text-[11px] text-slate-500">{u.role}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
