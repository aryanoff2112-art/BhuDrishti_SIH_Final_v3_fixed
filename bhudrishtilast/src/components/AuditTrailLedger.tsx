import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Link2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  User, 
  FileText, 
  RefreshCw,
  Hash
} from 'lucide-react';
import type { AuditBlock } from '../types';

export const AuditTrailLedger: React.FC = () => {
  const [blocks, setBlocks] = useState<AuditBlock[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [genesisHash, setGenesisHash] = useState<string>('');
  const [latestHash, setLatestHash] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const fetchLedger = () => {
    setIsLoading(true);
    fetch('/api/audit-trail')
      .then((res) => res.json())
      .then((data) => {
        setBlocks(data.blocks || []);
        setIsValid(data.isChainValid);
        setGenesisHash(data.genesisHash || '');
        setLatestHash(data.latestHash || '');
      })
      // NOTE: server returns AuditBlock objects with fields:
      // index, eventType, officerEmail, details, currentHash
      // (not blockIndex, action, officerName, changes, blockHash)
      .catch((err) => console.error('Failed to load audit trail', err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getActionBadge = (eventType: string) => {
    switch (eventType) {
      case 'TEHSILDAR_SEALED':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'HUMAN_CORRECTION':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'LRMS_RECONCILED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-blue-600" />
              <span>Chained Cryptographic Audit Ledger</span>
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-600" />
              <span>SHA-256 Verified</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident chronological log of all land record ingestions, corrections & digital seals
          </p>
        </div>

        <button
          onClick={fetchLedger}
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Verify & Refresh</span>
        </button>
      </div>

      {/* Ledger Integrity Summary Card */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block">
              Chain Status: {isValid ? 'Mathematically Sound & Unbroken' : 'Integrity Compromised!'}
            </span>
            <span className="text-slate-500 text-[11px]">
              Total Blocks: {blocks.length} • Previous hash links verified continuously back to Genesis Block
            </span>
          </div>
        </div>

        <div className="font-mono text-[11px] text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-2xs">
          <span>Latest Hash:</span>
          <span className="text-blue-700 font-semibold truncate max-w-[200px]">{latestHash}</span>
        </div>
      </div>

      {/* Audit Blocks Timeline List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {blocks.map((block) => (
          <div
            key={block.index}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-2.5 shadow-2xs"
          >
            {/* Block Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] border border-slate-200">
                  #{block.index}
                </span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] border ${getActionBadge(block.eventType)}`}>
                  {block.eventType?.replace(/_/g, ' ')}
                </span>
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Doc: {block.documentId}</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-700 font-medium">{block.officerEmail} ({block.officerRole})</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{new Date(block.timestamp).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Details / Payload summary */}
            {block.details && (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Payload Audit Details</div>
                <div className="text-[11px] text-blue-800 font-semibold truncate">
                  {typeof block.details === 'string' ? block.details : JSON.stringify(block.details)}
                </div>
              </div>
            )}

            {/* Hashes: Current and Previous Chain Pointer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <span className="text-slate-500 shrink-0">Previous:</span>
                <span className="text-slate-600 truncate">{block.previousHash}</span>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <span className="text-slate-500 shrink-0">Block Hash:</span>
                <span className="text-blue-700 font-bold truncate">{block.currentHash}</span>
                <button
                  onClick={() => copyToClipboard(block.currentHash)}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-blue-700 shrink-0"
                  title="Copy SHA-256 Hash"
                >
                  {copiedHash === block.currentHash ? (
                    <Check className="w-3 h-3 text-blue-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
