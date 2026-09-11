import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Eye, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Crosshair,
  FileCheck2,
  Info
} from 'lucide-react';
import type { LandRecordDocument } from '../types';

interface ScanIngestionProps {
  currentDoc: LandRecordDocument | null;
  documents: LandRecordDocument[];
  onSelectDoc: (id: string) => void;
  onUploadCustomScan: (base64: string, name: string) => void;
  onRunExtraction: () => void;
  isExtracting: boolean;
  selectedFieldKey: string | null;
  onSelectFieldKey: (key: string | null) => void;
}

export const ScanIngestion: React.FC<ScanIngestionProps> = ({
  currentDoc,
  documents,
  onSelectDoc,
  onUploadCustomScan,
  onRunExtraction,
  isExtracting,
  selectedFieldKey,
  onSelectFieldKey
}) => {
  const [viewMode, setViewMode] = useState<'raw' | 'preprocessed' | 'boxes'>('boxes');
  const [zoomLevel, setZoomLevel] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUploadCustomScan(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  if (!currentDoc) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        No document selected.
      </div>
    );
  }

  // Calculate coordinates for bounding box overlays (normalized to percentage)
  const boxes = [
    { key: 'khataNumber', label: 'Khata', box: currentDoc.khataNumber?.boundingBox, color: 'border-blue-600 bg-blue-600/15 text-blue-800' },
    { key: 'khasraNumber', label: 'Khasra', box: currentDoc.khasraNumber?.boundingBox, color: 'border-indigo-600 bg-indigo-600/15 text-indigo-800' },
    { key: 'totalAreaHectare', label: 'Area', box: currentDoc.totalAreaHectare?.boundingBox, color: 'border-sky-600 bg-sky-600/15 text-sky-800' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden shadow-sm">
      {/* Top Controls Bar */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        {/* Document Preset Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Record:
          </label>
          <select
            value={currentDoc.id}
            onChange={(e) => onSelectDoc(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none shadow-xs"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                [{d.state}] {d.documentType.split('(')[0]} — Khasra {d.khasraNumber.value}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Custom Scan Button */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload Scan</span>
          </button>

          {/* Run Extraction Trigger */}
          <button
            onClick={onRunExtraction}
            disabled={isExtracting}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            {isExtracting ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running VLM...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Re-Extract (VLM)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preprocessing Toolbar & Toggle */}
      <div className="px-4 py-2 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Layer View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('raw')}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'raw' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Raw Scan</span>
          </button>
          <button
            onClick={() => setViewMode('preprocessed')}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'preprocessed' ? 'bg-white text-blue-700 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>CV Binarized</span>
          </button>
          <button
            onClick={() => setViewMode('boxes')}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'boxes' ? 'bg-white text-blue-700 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Crosshair className="w-3 h-3" />
            <span>Bounding Boxes</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
            className="p-1 hover:bg-slate-100 rounded text-slate-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 font-semibold text-slate-700">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.15))}
            className="p-1 hover:bg-slate-100 rounded text-slate-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 hover:bg-slate-100 rounded text-slate-700 ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Image Stage Container */}
      <div className="relative flex-1 bg-slate-100/80 overflow-auto flex items-center justify-center p-4 min-h-[420px]">
        <div
          className="relative transition-transform duration-150 ease-out shadow-md rounded-lg overflow-hidden border border-slate-300 max-w-full bg-white"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* Scan Image (Raw vs Preprocessed) */}
          <img
            src={viewMode === 'preprocessed' ? currentDoc.preprocessedImageUrl : currentDoc.scanImageUrl}
            alt={currentDoc.documentTitle}
            className="w-full max-h-[620px] object-contain block select-none pointer-events-none"
          />

          {/* Bounding Box Overlays */}
          {viewMode === 'boxes' && (
            <div className="absolute inset-0 pointer-events-none">
              {boxes.map((item) => {
                if (!item.box) return null;
                const isSelected = selectedFieldKey === item.key;
                // boundingBox is in 0-1000 scale
                const top = `${item.box.ymin / 10}%`;
                const left = `${item.box.xmin / 10}%`;
                const width = `${(item.box.xmax - item.box.xmin) / 10}%`;
                const height = `${(item.box.ymax - item.box.ymin) / 10}%`;

                return (
                  <div
                    key={item.key}
                    onClick={() => onSelectFieldKey(item.key)}
                    className={`absolute border-2 pointer-events-auto cursor-pointer rounded transition-all flex items-start p-1 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600/30 ring-2 ring-blue-500 z-10'
                        : `${item.color} hover:border-blue-600 hover:bg-blue-600/20`
                    }`}
                    style={{ top, left, width, height }}
                    title={`Click to inspect ${item.label}`}
                  >
                    <span className="text-[9px] font-bold px-1 py-0.2 bg-blue-900 rounded text-white leading-none">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Computer Vision Preprocessing Diagnostic Strip */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>CV Preprocessing Pipeline</span>
          </span>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Clarity Score: {currentDoc.cvDetails?.clarityScore ?? 92}/100
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
            <span className="block text-slate-500">Deskew Angle</span>
            <span className="font-mono font-semibold text-slate-800">+{currentDoc.cvDetails?.deskewAngleDegrees ?? 1.2}°</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
            <span className="block text-slate-500">Binarization</span>
            <span className="font-mono font-semibold text-slate-800 truncate block">{(currentDoc.cvDetails?.binarizationMethod || 'Adaptive Otsu Thresholding').split(' ')[0]}</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
            <span className="block text-slate-500">Contrast Gain</span>
            <span className="font-mono font-semibold text-slate-800">{currentDoc.cvDetails?.contrastStretchGain ?? 2.4}x CLAHE</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
            <span className="block text-slate-500">Latency</span>
            <span className="font-mono font-semibold text-slate-800">{currentDoc.cvDetails?.processingTimeMs ?? 142} ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
