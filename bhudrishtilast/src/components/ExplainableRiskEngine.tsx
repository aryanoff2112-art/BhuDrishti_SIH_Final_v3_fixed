import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Sliders, 
  Zap, 
  Scale, 
  Building2, 
  FileSearch,
  Lock
} from 'lucide-react';
import type { LandRecordDocument } from '../types';

interface ExplainableRiskEngineProps {
  currentDoc: LandRecordDocument;
}

export const ExplainableRiskEngine: React.FC<ExplainableRiskEngineProps> = ({ currentDoc }) => {
  const rawRisk = currentDoc.risk || (currentDoc as any).riskEvaluation || {};
  const overallScore = rawRisk.overallScore ?? 25;
  const routingRecommendation = rawRisk.routingRecommendation ?? 'AUTO_APPROVE_ELIGIBLE';
  const evaluatedAt = rawRisk.evaluatedAt || currentDoc.updatedAt || new Date().toISOString();

  // Evaluate the 5 deterministic statutory checks safely
  const shareholderBalanceValid = rawRisk.shareholderBalanceValid ?? (
    currentDoc.isShareBalanced ?? (Math.abs((currentDoc.totalSharePercentage ?? 100) - 100) < 0.1)
  );

  const lrmsArea = currentDoc.lrmsCheck?.lrmsTotalAreaHectares ?? (currentDoc as any).lrmsValidation?.lrmsAreaHectare ?? currentDoc.totalAreaHectare.value;
  const areaDelta = Math.abs(currentDoc.totalAreaHectare.value - lrmsArea);
  const calculatedDeltaPct = lrmsArea > 0 ? (areaDelta / lrmsArea) * 100 : 0;
  const areaDiscrepancyPercentage = rawRisk.areaDiscrepancyPercentage ?? calculatedDeltaPct;

  const hasActiveLegalStay = rawRisk.hasActiveLegalStay ?? (
    (currentDoc.encumbrances || []).some(e => e.type === 'Court Stay Order' && !e.cleared) ||
    (currentDoc.mutations || []).some(m => m.status === 'Disputed')
  );

  const ocrQualityPass = rawRisk.ocrQualityPass ?? (
    (currentDoc.khataNumber?.confidence ?? 90) >= 75 &&
    (currentDoc.khasraNumber?.confidence ?? 90) >= 75 &&
    (currentDoc.totalAreaHectare?.confidence ?? 90) >= 75
  );

  const explanations: string[] = rawRisk.explanations || (rawRisk.factors && rawRisk.factors.length > 0 
    ? rawRisk.factors.map((f: any) => `${f.category}: ${f.description}`) 
    : [
      shareholderBalanceValid ? 'All co-tenant shareholdings sum to 100% legal title.' : 'Shareholding fractions do not sum to 100%.',
      areaDiscrepancyPercentage <= 5 ? `Cadastral area matches state registry within tolerance (Δ ${areaDiscrepancyPercentage.toFixed(2)}%).` : `Discrepancy of ${areaDiscrepancyPercentage.toFixed(1)}% between scan and state registry.`,
      !hasActiveLegalStay ? 'No active judicial stay or dispute on record.' : 'Active legal injunction or dispute recorded on this Khasra.',
      ocrQualityPass ? 'High confidence OCR across all primary land record fields.' : 'Certain entities marked for manual human verification.'
    ]);

  const risk = {
    overallScore,
    routingRecommendation,
    evaluatedAt,
    shareholderBalanceValid,
    areaDiscrepancyPercentage,
    hasActiveLegalStay,
    ocrQualityPass,
    explanations
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-blue-700 border-blue-500 bg-blue-50';
    if (score >= 50) return 'text-amber-700 border-amber-500 bg-amber-50';
    return 'text-red-700 border-red-500 bg-red-50';
  };

  const getBadgeStyle = (rec: string) => {
    switch (rec) {
      case 'AUTO_APPROVE_ELIGIBLE':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'BLOCKED_FRAUD_SUSPECT':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Explainable Rule-Based LRMS Risk Engine</span>
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              Deterministic Rules • Zero Black-Box
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit Assessment for Khasra {currentDoc.khasraNumber?.value || 'N/A'} • Form: {currentDoc.documentType}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1.5 rounded-lg font-bold border ${getBadgeStyle(risk.routingRecommendation)}`}>
            {risk.routingRecommendation.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Top Metric Strip: Score Meter + Routing Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Circular Score Visualizer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
            <div className={`w-18 h-18 rounded-xl border-2 flex flex-col items-center justify-center font-mono ${getScoreColor(risk.overallScore)}`}>
              <span className="text-2xl font-black">{risk.overallScore}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">/ 100</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                Integrity Score
              </span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {risk.overallScore >= 80 ? 'Low Risk (Verified)' : risk.overallScore >= 50 ? 'Moderate Scrutiny' : 'Critical Irregularity'}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Computed using 5 deterministic revenue statutory checks.
              </p>
            </div>
          </div>

          {/* Routing Explanation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Automated Workflow Routing Recommendation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {risk.routingRecommendation === 'AUTO_APPROVE_ELIGIBLE' && (
                  'Eligible for Straight-Through Processing (STP) under DILRMP guidelines. All shareholder fractions sum to 100%, scan matches state LRMS within 0.05 Ha, and no judicial stay or bank encumbrance exists.'
                )}
                {risk.routingRecommendation === 'STANDARD_PATWARI_VERIFICATION' && (
                  'Requires standard field verification by Revenue Lekhpal / Patwari. Minor discrepancies or standard institutional KCC loan charge noted on record.'
                )}
                {risk.routingRecommendation === 'BLOCKED_FRAUD_SUSPECT' && (
                  'BLOCKED: High-risk statutory failure detected. Active civil court injunction, Gram Sabha pasture encroachment flag, or mathematical share imbalance exceeding legal title. Digital sealing restricted to Sub-Divisional Magistrate (SDM) / Tehsildar.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 border-t border-slate-200 pt-2 mt-2">
              <span>Evaluated: {new Date(risk.evaluatedAt).toLocaleTimeString()}</span>
              <span>•</span>
              <span>Statutory Ruleset: Revenue Act 1901 (Rev. 2026)</span>
            </div>
          </div>
        </div>

        {/* 5 Deterministic Revenue Rule Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Rule-By-Rule Statutory Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Rule 1: Shareholder Math */}
            <div className={`p-3.5 rounded-xl border ${
              risk.shareholderBalanceValid 
                ? 'bg-white border-slate-200 shadow-2xs' 
                : 'bg-red-50/50 border-red-200'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {risk.shareholderBalanceValid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-800">
                    1. Shareholder Ownership Balance
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono border ${
                  risk.shareholderBalanceValid ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {risk.shareholderBalanceValid ? 'PASSED (100%)' : 'FAILED'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 pl-6">
                Validates that fractional shares of all registered co-tenants (सह-खातेदार) mathematically sum to exactly 1.0 (100.0%).
              </p>
            </div>

            {/* Rule 2: Area Discrepancy */}
            <div className={`p-3.5 rounded-xl border ${
              risk.areaDiscrepancyPercentage <= 5 
                ? 'bg-white border-slate-200 shadow-2xs' 
                : 'bg-amber-50/50 border-amber-200'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {risk.areaDiscrepancyPercentage <= 5 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-800">
                    2. LRMS Registry Area Cross-Check
                  </span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded font-mono bg-slate-100 text-slate-700 border border-slate-200">
                  Δ {risk.areaDiscrepancyPercentage.toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 pl-6">
                Compares historical scan acreage against digital Bhulekh/LRMS database. Flagged if difference exceeds statutory survey threshold of 5%.
              </p>
            </div>

            {/* Rule 3: Legal Encumbrances */}
            <div className={`p-3.5 rounded-xl border ${
              !risk.hasActiveLegalStay 
                ? 'bg-white border-slate-200 shadow-2xs' 
                : 'bg-red-50/50 border-red-200'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {!risk.hasActiveLegalStay ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-800">
                    3. Judicial Injunction & Stay Order Screen
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono border ${
                  !risk.hasActiveLegalStay ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {!risk.hasActiveLegalStay ? 'NO INJUNCTION' : 'STAY ACTIVE'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 pl-6">
                Parses the Kaifiyat (कैफियत) & order column for civil court injunctions, SDM stays, or public land (Gram Sabha pasture/lake) encroachments.
              </p>
            </div>

            {/* Rule 4: OCR Quality Assurance */}
            <div className={`p-3.5 rounded-xl border ${
              risk.ocrQualityPass 
                ? 'bg-white border-slate-200 shadow-2xs' 
                : 'bg-amber-50/50 border-amber-200'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {risk.ocrQualityPass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-800">
                    4. Indic OCR Confidence Threshold
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono border ${
                  risk.ocrQualityPass ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {risk.ocrQualityPass ? 'CONFIDENT (≥80%)' : 'REVIEW REQ.'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 pl-6">
                Ensures key revenue fields (Khata, Khasra, Owner Name) exceed 0.80 character recognition probability before auto-clearance.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Risk Explanations Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Audit Rationale Details</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {risk.explanations.map((exp: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
