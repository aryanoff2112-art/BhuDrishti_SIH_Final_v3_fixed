import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  Check, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Stamp, 
  ArrowRight, 
  RefreshCw, 
  Users, 
  FileSpreadsheet, 
  HelpCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import type { LandRecordDocument, UserProfile } from '../types';

interface ExtractionReviewProps {
  currentDoc: LandRecordDocument;
  currentUser: UserProfile | null;
  onCorrectField: (fieldName: string, value: string | number, shareholderIndex?: number) => void;
  onReconcileLrms: (acceptScan: boolean, notes: string) => void;
  onSealDocument: (overrideCritical: boolean, notes: string) => void;
  selectedFieldKey: string | null;
  onSelectFieldKey: (key: string | null) => void;
  isSealing: boolean;
}

export const ExtractionReview: React.FC<ExtractionReviewProps> = ({
  currentDoc,
  currentUser,
  onCorrectField,
  onReconcileLrms,
  onSealDocument,
  selectedFieldKey,
  onSelectFieldKey,
  isSealing
}) => {
  // Local edit states
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [reconcileModalOpen, setReconcileModalOpen] = useState(false);
  const [reconcileNotes, setReconcileNotes] = useState('');
  const [sealModalOpen, setSealModalOpen] = useState(false);
  const [sealNotes, setSealNotes] = useState('');

  const startEdit = (field: string, currentVal: string | number) => {
    setEditingField(field);
    setEditValue(String(currentVal));
  };

  const saveEdit = (field: string, shareholderIdx?: number) => {
    let finalVal: string | number = editValue;
    if (field === 'totalAreaHectare' || field === 'percentage') {
      const num = parseFloat(editValue);
      if (!isNaN(num)) finalVal = num;
    }
    onCorrectField(field, finalVal, shareholderIdx);
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) {
      return (
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
          {(confidence * 100).toFixed(0)}% Conf
        </span>
      );
    }
    if (confidence >= 0.75) {
      return (
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
          {(confidence * 100).toFixed(0)}% Review
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 font-medium">
        <AlertTriangle className="w-2.5 h-2.5" /> {(confidence * 100).toFixed(0)}% Low Conf
      </span>
    );
  };

  // Ownership shares calculation
  const getSharePercentage = (s: any) => s.sharePercentage ?? s.percentage ?? 0;
  const totalSharePercentage = (currentDoc.shareholders || []).reduce((sum, s) => sum + getSharePercentage(s), 0);
  const isShareBalanced = currentDoc.isShareBalanced ?? (Math.abs(totalSharePercentage - 100) < 0.1);

  // LRMS Cross-check
  const lrmsCheck = currentDoc.lrmsCheck || (currentDoc as any).lrmsValidation || {};
  const lrmsAreaHectares = lrmsCheck.lrmsTotalAreaHectares ?? (lrmsCheck as any).lrmsAreaHectare ?? (currentDoc.totalAreaHectare?.value || 0);
  const lrmsKhasra = lrmsCheck.lrmsKhasra || (lrmsCheck as any).lrmsKhasraNumber || currentDoc.khasraNumber?.value || '';
  const portalName = (lrmsCheck as any).portalName || `${currentDoc.state || 'State'} Bhulekh / LRMS`;
  const queriedAt = lrmsCheck.lastLrmsUpdate || (lrmsCheck as any).queriedAt || new Date().toISOString();
  const isLrmsSynced = lrmsCheck.isLrmsSynced ?? (lrmsCheck as any).discrepancyResolved ?? false;

  const currentArea = currentDoc.totalAreaHectare?.value || 0;
  const areaDelta = Math.abs(currentArea - lrmsAreaHectares);
  const isAreaMatched = areaDelta <= 0.05;

  // Unified Risk & Status
  const risk = currentDoc.risk || (currentDoc as any).riskEvaluation || {
    overallScore: 25,
    severity: 'LOW',
    routingRecommendation: 'AUTO_APPROVE_ELIGIBLE',
    factors: []
  };

  const isSealed = currentDoc.status === 'SEALED_APPROVED' || (currentDoc.status as string) === 'DIGITALLY_SEALED';
  const isFlagged = currentDoc.status === 'DISPUTED_REJECTED' || (currentDoc.status as string) === 'FLAGGED_FOR_HEARING';
  const sealedDate = currentDoc.digitalSeal?.sealedTimestamp || (currentDoc as any).digitalSealCertificate?.sealedAt || new Date().toISOString();

  const mutationsAndEncumbrances = (currentDoc as any).mutationsAndEncumbrances || [
    ...(currentDoc.encumbrances || []).map((e) => ({
      type: e.type,
      status: e.cleared ? 'Cleared' : 'Active Charge',
      details: `${e.bankOrCourt} - ₹${(e.amount || 0).toLocaleString()} recorded on ${e.dateRecorded}`,
      orderDate: e.dateRecorded,
      orderNumber: e.type
    })),
    ...(currentDoc.mutations || []).map((m) => ({
      type: typeof m.transferType === 'object' ? m.transferType.value : (m.transferType || 'Mutation Order'),
      status: m.status,
      details: `${typeof m.successorName === 'object' ? m.successorName.value : m.successorName} from ${typeof m.predecessorName === 'object' ? m.predecessorName.value : m.predecessorName} (${typeof m.orderAuthority === 'object' ? m.orderAuthority.value : m.orderAuthority})`,
      orderDate: typeof m.mutationDate === 'object' ? m.mutationDate.value : m.mutationDate,
      orderNumber: typeof m.mutationNumber === 'object' ? m.mutationNumber.value : m.mutationNumber
    }))
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Domain NER & Verification Engine
            </h2>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
              isSealed 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : isFlagged
                ? 'bg-red-50 text-red-800 border-red-200'
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
              {currentDoc.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentDoc.village}, {currentDoc.tehsil}, {currentDoc.district} ({currentDoc.state}) • LGD Code: {currentDoc.villageLgdCode}
          </p>
        </div>

        {/* Digital Seal Call to Action */}
        <div className="flex items-center gap-2">
          {isSealed ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
              <Stamp className="w-4 h-4 text-emerald-600" />
              <span>Sealed on {new Date(sealedDate).toLocaleDateString()}</span>
            </div>
          ) : (
            <button
              onClick={() => setSealModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Stamp className="w-3.5 h-3.5" />
              <span>Digital RoR Sealing</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Review Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Core Plot Identifiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Khata Number Card */}
          <div 
            onClick={() => onSelectFieldKey('khataNumber')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedFieldKey === 'khataNumber'
                ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Khata / Account No.</span>
              {getConfidenceBadge(currentDoc.khataNumber?.confidence)}
            </div>
            {editingField === 'khataNumber' ? (
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-white border border-blue-500 text-slate-900 rounded px-2 py-1 text-sm font-semibold w-full outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button onClick={() => saveEdit('khataNumber')} className="p-1 bg-blue-600 rounded text-white"><Check className="w-3 h-3" /></button>
                <button onClick={cancelEdit} className="p-1 bg-slate-200 rounded text-slate-700"><X className="w-3 h-3" /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentDoc.khataNumber?.value}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); startEdit('khataNumber', currentDoc.khataNumber?.value || ''); }}
                  className="p-1 text-slate-400 hover:text-blue-600"
                  title="Correct Field"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <span className="text-[10px] text-slate-500 mt-1 block">OCR: {currentDoc.khataNumber?.sourceTextSnippet || (currentDoc.khataNumber as any)?.rawOcrText || currentDoc.khataNumber?.value}</span>
          </div>

          {/* Khasra / Survey Number Card */}
          <div 
            onClick={() => onSelectFieldKey('khasraNumber')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedFieldKey === 'khasraNumber'
                ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Khasra / Plot / Gat No.</span>
              {getConfidenceBadge(currentDoc.khasraNumber?.confidence)}
            </div>
            {editingField === 'khasraNumber' ? (
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-white border border-blue-500 text-slate-900 rounded px-2 py-1 text-sm font-semibold w-full outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button onClick={() => saveEdit('khasraNumber')} className="p-1 bg-blue-600 rounded text-white"><Check className="w-3 h-3" /></button>
                <button onClick={cancelEdit} className="p-1 bg-slate-200 rounded text-slate-700"><X className="w-3 h-3" /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 font-mono">
                  {currentDoc.khasraNumber?.value}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); startEdit('khasraNumber', currentDoc.khasraNumber?.value || ''); }}
                  className="p-1 text-slate-400 hover:text-blue-600"
                  title="Correct Field"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <span className="text-[10px] text-slate-500 mt-1 block">OCR: {currentDoc.khasraNumber?.sourceTextSnippet || (currentDoc.khasraNumber as any)?.rawOcrText || currentDoc.khasraNumber?.value}</span>
          </div>

          {/* Total Area Card with Converter */}
          <div 
            onClick={() => onSelectFieldKey('totalAreaHectare')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedFieldKey === 'totalAreaHectare'
                ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Extracted Area</span>
              {getConfidenceBadge(currentDoc.totalAreaHectare?.confidence)}
            </div>
            {editingField === 'totalAreaHectare' ? (
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  step="0.0001"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-white border border-blue-500 text-slate-900 rounded px-2 py-1 text-sm font-semibold w-full outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button onClick={() => saveEdit('totalAreaHectare')} className="p-1 bg-blue-600 rounded text-white"><Check className="w-3 h-3" /></button>
                <button onClick={cancelEdit} className="p-1 bg-slate-200 rounded text-slate-700"><X className="w-3 h-3" /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {currentDoc.totalAreaHectare?.value?.toFixed(4)} Ha
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-normal">
                    ({((currentDoc.totalAreaHectare?.value || 0) * 2.471).toFixed(2)} Acres)
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); startEdit('totalAreaHectare', currentDoc.totalAreaHectare?.value || 0); }}
                  className="p-1 text-slate-400 hover:text-blue-600"
                  title="Correct Field"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <span className="text-[10px] text-slate-500 mt-1 block">Local Unit: {currentDoc.traditionalAreaUnit?.value || (currentDoc as any).areaLocalUnitString || 'Standard Units'}</span>
          </div>
        </div>

        {/* LRMS Registry Cross-Verification & Delta Diffing */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>State LRMS Registry Validation ({portalName})</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Queried at: {new Date(queriedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block">Khasra in LRMS</span>
              <span className="font-semibold text-slate-800 font-mono mt-0.5 block">{lrmsKhasra}</span>
              <span className="text-[11px] text-emerald-600 mt-1 inline-flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Exact Match
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block">Registered Area (LRMS)</span>
              <span className="font-semibold text-slate-800 font-mono mt-0.5 block">{lrmsAreaHectares.toFixed(4)} Ha</span>
              {isAreaMatched ? (
                <span className="text-[11px] text-emerald-600 mt-1 inline-flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Area Verified (Δ {areaDelta.toFixed(4)} Ha)
                </span>
              ) : (
                <span className="text-[11px] text-amber-700 mt-1 inline-flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3 h-3" /> Discrepancy: Δ {areaDelta.toFixed(4)} Ha ({lrmsAreaHectares > 0 ? ((areaDelta / lrmsAreaHectares) * 100).toFixed(1) : '0.0'}%)
                </span>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-slate-500 block">Reconciliation Status</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {isLrmsSynced ? 'Resolved' : isAreaMatched ? 'Automatic Pass' : 'Manual Review Req.'}
                </span>
              </div>
              {!isAreaMatched && !isLrmsSynced && (
                <button
                  onClick={() => setReconcileModalOpen(true)}
                  className="mt-2 text-[11px] px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold text-center transition-colors"
                >
                  Resolve Discrepancy
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shareholders & Ownership Split Section */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-semibold text-slate-800">
                Shareholders & Ownership Entitlements ({(currentDoc.shareholders || []).length} Registered)
              </h3>
            </div>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${
              isShareBalanced 
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
            }`}>
              Sum: {totalSharePercentage.toFixed(1)}% {isShareBalanced ? '✓ Valid 100%' : '⚠️ Imbalanced!'}
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {(currentDoc.shareholders || []).map((sh: any, idx: number) => {
              const shName = typeof sh.name === 'object' && sh.name !== null ? sh.name.value : (sh.name || 'Co-Owner');
              const shFather = typeof sh.fatherOrHusbandName === 'object' && sh.fatherOrHusbandName !== null 
                ? sh.fatherOrHusbandName.value 
                : (sh.fatherOrSpouseName || sh.fatherOrHusbandName || 'N/A');
              const shFraction = typeof sh.shareFraction === 'object' && sh.shareFraction !== null
                ? sh.shareFraction.value
                : (sh.fraction || sh.shareFraction || '1/1');
              const shPercent = getSharePercentage(sh);
              const shResidence = sh.residence || `${currentDoc.village}, ${currentDoc.tehsil}`;

              return (
                <div key={sh.id || idx} className="py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{shName}</div>
                      <div className="text-[11px] text-slate-500">
                        Father/Spouse: {shFather} • Residence: {shResidence}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-800 block">{shFraction}</span>
                      <span className="text-[11px] text-slate-500">{shPercent}% share</span>
                    </div>

                    {editingField === `shareholder_${idx}` ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-16 bg-white border border-blue-500 text-slate-800 rounded px-1.5 py-0.5 text-xs font-mono outline-none"
                        />
                        <button onClick={() => saveEdit('percentage', idx)} className="p-1 bg-blue-600 rounded text-white"><Check className="w-3 h-3" /></button>
                        <button onClick={cancelEdit} className="p-1 bg-slate-200 rounded text-slate-700"><X className="w-3 h-3" /></button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(`shareholder_${idx}`, shPercent)}
                        className="p-1 text-slate-400 hover:text-blue-600"
                        title="Adjust Share"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Encumbrances, Mortgages & Mutation History */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h3 className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Encumbrances, Bank Liens & Mutations ({mutationsAndEncumbrances.length})</span>
          </h3>

          {mutationsAndEncumbrances.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No legal encumbrances or recorded mutations on this parcel.</p>
          ) : (
            <div className="space-y-2">
              {mutationsAndEncumbrances.map((m: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{m.type}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        m.type === 'Civil Court Stay' || m.type === 'Court Stay Order' || m.type === 'Encroachment Dispute' || m.status === 'Disputed'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{m.details}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <div>{m.orderDate}</div>
                    <div className="text-slate-400 font-mono">Ref: {m.orderNumber}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reconcile Modal */}
      {reconcileModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <span>Resolve Registry Discrepancy</span>
            </h3>
            <p className="text-xs text-slate-600">
              The extracted area from the historical scan ({currentDoc.totalAreaHectare?.value} Ha) differs from the digital state LRMS registry ({lrmsAreaHectares} Ha). Please record the official resolution basis:
            </p>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Resolution Notes / Officer Memo:
              </label>
              <textarea
                value={reconcileNotes}
                onChange={(e) => setReconcileNotes(e.target.value)}
                placeholder="e.g. Discrepancy reconciled pursuant to consolidation proceeding CH-41 field survey report dated 14-Aug-2024."
                className="w-full h-24 bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setReconcileModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs hover:bg-slate-100 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReconcileLrms(true, reconcileNotes);
                  setReconcileModalOpen(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
              >
                Accept Scan Value
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Sealing Confirmation Modal */}
      {sealModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Stamp className="w-5 h-5 text-blue-600" />
              <span>Cryptographic RoR Sealing & Audit Ledger</span>
            </h3>
            <p className="text-xs text-slate-600">
              Signing this record creates an RSA-SHA256 digital signature, a SHA-256 integrity hash, and a tamper-evident chained audit event. The prototype does not directly notify a live state revenue database.
            </p>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Signing Officer:</span>
                <span className="font-semibold text-slate-900">{currentUser?.name} ({currentUser?.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Assessment:</span>
                <span className={`font-semibold ${
                  risk.routingRecommendation === 'BLOCKED_FRAUD_SUSPECT'
                    ? 'text-red-600'
                    : risk.routingRecommendation === 'AUTO_APPROVE_ELIGIBLE'
                    ? 'text-emerald-600'
                    : 'text-amber-600'
                }`}>
                  {(risk.routingRecommendation || 'AUTO_APPROVE_ELIGIBLE').replace(/_/g, ' ')} ({risk.overallScore ?? 25}/100)
                </span>
              </div>
            </div>

            {risk.routingRecommendation === 'BLOCKED_FRAUD_SUSPECT' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 space-y-1">
                <div className="font-bold flex items-center gap-1 text-red-700">
                  <AlertTriangle className="w-4 h-4" /> High Risk Alert: Critical Irregularities Detected
                </div>
                <p>
                  Only Tehsildar / SDM rank officers may override this restriction with mandatory justification notes.
                </p>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Executive Sealing Notes:
              </label>
              <textarea
                value={sealNotes}
                onChange={(e) => setSealNotes(e.target.value)}
                placeholder="e.g. Record thoroughly audited against original revenue register and approved for DILRMP digital issuance."
                className="w-full h-20 bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setSealModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs hover:bg-slate-100 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSealDocument(true, sealNotes);
                  setSealModalOpen(false);
                }}
                disabled={isSealing}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                {isSealing ? 'Cryptographically Sealing...' : 'Authorize & Seal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
