import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  FileCode2, 
  Sparkles, 
  RefreshCw,
  Clock,
  UserCheck
} from 'lucide-react';
import type { LearningQueueItem } from '../types';

export const ActiveLearningQueue: React.FC = () => {
  const [items, setItems] = useState<LearningQueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQueue = () => {
    setIsLoading(true);
    fetch('/api/learning/queue')
      .then((res) => res.json())
      .then((data) => setItems(data || []))
      .catch((err) => console.error('Failed to load learning queue', err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleExportJsonl = () => {
    // Field names match the real LearningQueueItem type (see types.ts) and
    // mirror the server's own /api/learning/export endpoint.
    const jsonlString = items.map((it) => JSON.stringify({
      input: {
        documentId: it.documentId,
        field: it.fieldName,
        extracted_ocr: it.aiPredictedValue,
        confidence: it.aiConfidence
      },
      ground_truth_target: it.humanCorrectedValue,
      verified_by: it.correctedByOfficer
    })).join('\n');

    const blob = new Blob([jsonlString], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bhudrishti_indic_finetuning_${Date.now()}.jsonl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Human-In-The-Loop Active Learning Pipeline</span>
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              Model Training Feedback
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Every officer correction becomes verified ground truth for the next model-training cycle
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchQueue}
            className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs shadow-2xs transition-colors"
            title="Refresh Queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportJsonl}
            disabled={items.length === 0}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Fine-Tuning JSONL ({items.length})</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block">Queue Items Collected</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">{items.length}</span>
          <span className="text-[11px] text-blue-700 font-medium mt-1 block">Ready for supervised training export</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block">Indic Dialect Scripts</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">4 Scripts</span>
          <span className="text-[11px] text-blue-700 font-medium mt-1 block">Devanagari, Modi, Gurmukhi, Urdu</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-500 block">Model Evaluation</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">Prototype only</span>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">No accuracy claim is made without held-out evaluation</span>
        </div>
      </div>

      {/* Queue Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
            No corrections logged yet. Correct any extracted field in the Review panel to capture ground-truth feedback!
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-2 shadow-2xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Field: {item.fieldName}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200">
                    AI confidence: {item.aiConfidence}%
                  </span>
                  <span className="text-slate-500 text-[11px]">Doc: {item.documentId}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Verified by {item.correctedByOfficer}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Before vs After correction visual diff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                  <span className="text-[10px] text-red-700 font-bold uppercase block mb-1">
                    Original OCR Extraction:
                  </span>
                  <span className="font-mono text-slate-600 block line-through opacity-80">
                    {String(item.aiPredictedValue)}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-700 font-bold uppercase block mb-1">
                    Officer Corrected Ground Truth:
                  </span>
                  <span className="font-mono text-blue-900 font-bold block">
                    {String(item.humanCorrectedValue)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
