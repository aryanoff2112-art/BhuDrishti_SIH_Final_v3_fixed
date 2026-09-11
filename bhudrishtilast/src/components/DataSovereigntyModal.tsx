import React from 'react';
import { 
  X, 
  Server, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  FileCheck, 
  Building2, 
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface DataSovereigntyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataSovereigntyModal: React.FC<DataSovereigntyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>National Informatics Centre (NIC) Data Sovereignty</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                  DPDP Act 2023
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                On-Premise & MeghRaj Sovereign Cloud Architecture for Sensitive Land Records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Sovereignty Principles */}
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Sovereign Deployment Boundary</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              The submitted prototype uses a configurable VLM adapter and may use an external model endpoint when explicitly configured. Production deployment is designed for State Data Centres or an approved sovereign cloud, with the VLM hosted inside the authorized processing boundary so raw scans do not leave government-controlled infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Cryptographic Sealing</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                The prototype uses RSA-SHA256 digital signatures plus a SHA-256 integrity hash and chained audit ledger. Production can integrate CCA-approved DSC infrastructure; the prototype does not claim to be a DSC implementation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>DILRMP API Gateway</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                The prototype exposes REST APIs with role-based JWT authentication. Production integration can connect to approved state LRMS/SSO gateways; the included LRMS data is clearly marked as prototype/demo data.
              </p>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Security & Deployment Considerations</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Information security & electronic-record controls</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>DPDP-aware data minimization & purpose limitation</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>CERT-In-aligned operational controls (production target)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>State-specific revenue rules (production integration)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
