import React, { useState, useEffect, useCallback } from 'react';
import type { LandRecordDocument, UserProfile } from './types';
import { api, DEMO_PRESET_USERS } from './services/api';
import { Header } from './components/Header';
import { ScanIngestion } from './components/ScanIngestion';
import { ExtractionReview } from './components/ExtractionReview';
import { CadastralMap } from './components/CadastralMap';
import { ExplainableRiskEngine } from './components/ExplainableRiskEngine';
import { AuditTrailLedger } from './components/AuditTrailLedger';
import { ActiveLearningQueue } from './components/ActiveLearningQueue';
import { RoiCalculator } from './components/RoiCalculator';
import { DataSovereigntyModal } from './components/DataSovereigntyModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [documents, setDocuments] = useState<LandRecordDocument[]>([]);
  const [currentDocId, setCurrentDocId] = useState<string>('DOC-UP-2024-001');
  const [activeTab, setActiveTab] = useState<'workspace' | 'cadastral' | 'risk' | 'audit' | 'learning' | 'roi'>('workspace');
  const [selectedFieldKey, setSelectedFieldKey] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isSealing, setIsSealing] = useState<boolean>(false);
  const [isDataSovereigntyOpen, setIsDataSovereigntyOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Load initial demo user and documents
  useEffect(() => {
    const initApp = async () => {
      try {
        // Authenticate with default Patwari account if not logged in
        let user = await api.getMe();
        if (!user) {
          const res = await api.login(DEMO_PRESET_USERS[1].email, DEMO_PRESET_USERS[1].pass);
          user = res.user;
        }
        setCurrentUser(user);

        // Fetch documents
        const docs = await api.getDocuments();
        setDocuments(docs);
        if (docs.length > 0) {
          setCurrentDocId(docs[0].id);
        }
      } catch (err: any) {
        console.error('Initialization error', err);
        showToast('Failed to initialize session: ' + err.message, 'error');
      }
    };
    initApp();
  }, []);

  const handleSwitchUser = async (email: string, pass: string) => {
    try {
      const res = await api.login(email, pass);
      setCurrentUser(res.user);
      showToast(`Switched active persona to ${res.user.name} (${res.user.role})`, 'info');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const refreshDocuments = useCallback(async () => {
    try {
      const docs = await api.getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error('Failed to refresh documents', err);
    }
  }, []);

  const currentDoc = documents.find((d) => d.id === currentDocId) || documents[0] || null;

  // Handle Field Correction
  const handleCorrectField = async (fieldName: string, value: string | number, shareholderIndex?: number) => {
    if (!currentDoc) return;
    try {
      const res = await api.correctField(currentDoc.id, {
        fieldName,
        correctedValue: value,
        shareholderIndex
      });
      // Update doc in local state
      setDocuments((prev) => prev.map((d) => d.id === res.document.id ? res.document : d));
      showToast(`Corrected ${fieldName} to "${value}". Logged to Audit Ledger & Active Learning Queue.`, 'success');
    } catch (err: any) {
      showToast('Correction error: ' + err.message, 'error');
    }
  };

  // Handle LRMS Reconciliation
  const handleReconcileLrms = async (acceptScan: boolean, notes: string) => {
    if (!currentDoc) return;
    try {
      const updated = await api.reconcileLrms(currentDoc.id, {
        acceptScanValue: acceptScan,
        resolutionNotes: notes || 'Resolved pursuant to revenue consolidation verification CH-41.'
      });
      setDocuments((prev) => prev.map((d) => d.id === updated.id ? updated : d));
      showToast('LRMS Registry Discrepancy successfully resolved and sealed.', 'success');
    } catch (err: any) {
      showToast('Reconciliation failed: ' + err.message, 'error');
    }
  };

  // Handle Digital Sealing
  const handleSealDocument = async (overrideCritical: boolean, notes: string) => {
    if (!currentDoc) return;
    setIsSealing(true);
    try {
      const res = await api.sealDocument(currentDoc.id, {
        overrideCriticalRisk: overrideCritical,
        officerNotes: notes
      });
      setDocuments((prev) => prev.map((d) => d.id === res.document.id ? res.document : d));
      showToast(`Document sealed with RSA-SHA256 signature. Integrity hash: ${res.seal?.sealHash?.slice(0, 16)}...`, 'success');
    } catch (err: any) {
      showToast('Sealing failed: ' + err.message, 'error');
    } finally {
      setIsSealing(false);
    }
  };

  // Handle Ingest Custom Scan
  const handleUploadCustomScan = async (base64: string, filename: string) => {
    setIsExtracting(true);
    showToast(`Uploading and preprocessing scan "${filename}"...`, 'info');
    try {
      const analyzed = await api.analyzeDocument({
        imageBase64: base64,
        state: 'Uttar Pradesh',
        district: 'Lucknow',
        tehsil: 'Bakshi Ka Talab',
        village: 'Rampur Kalan'
      });
      setDocuments((prev) => [analyzed, ...prev]);
      setCurrentDocId(analyzed.id);
      showToast(`Indic VLM successfully extracted Khasra ${analyzed.khasraNumber.value} (${analyzed.shareholders.length} shareholders)!`, 'success');
    } catch (err: any) {
      showToast('Extraction failed: ' + err.message, 'error');
    } finally {
      setIsExtracting(false);
    }
  };

  // Handle Re-Run Extraction
  const handleRunExtraction = async () => {
    if (!currentDoc) return;
    setIsExtracting(true);
    showToast('Executing configured Indic VLM extraction on scan...', 'info');
    try {
      const analyzed = await api.analyzeDocument({
        sampleDocId: currentDoc.id
      });
      setDocuments((prev) => prev.map((d) => d.id === analyzed.id ? analyzed : d));
      showToast('Extraction completed. Review field-level confidence before approval.', 'success');
    } catch (err: any) {
      showToast('Extraction failed: ' + err.message, 'error');
    } finally {
      setIsExtracting(false);
    }
  };

  // Reset Demo Data
  const handleResetDemo = async () => {
    try {
      await api.resetDemo();
      await refreshDocuments();
      showToast('Demo records and audit trail reset to baseline initial state.', 'info');
    } catch (err: any) {
      showToast('Reset failed: ' + err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Ministerial & Hackathon Navigation Bar */}
      <Header
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDataSovereignty={() => setIsDataSovereigntyOpen(true)}
        onResetDemo={handleResetDemo}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1700px] w-full mx-auto flex flex-col">
        {/* Workspace View: Split Scan Viewer & Domain NER Extraction Review */}
        {activeTab === 'workspace' && currentDoc && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1">
            {/* Left: Scan Ingestion & Computer Vision Preprocessor */}
            <div className="xl:col-span-6 h-[720px] xl:h-[calc(100vh-140px)]">
              <ScanIngestion
                currentDoc={currentDoc}
                documents={documents}
                onSelectDoc={(id) => setCurrentDocId(id)}
                onUploadCustomScan={handleUploadCustomScan}
                onRunExtraction={handleRunExtraction}
                isExtracting={isExtracting}
                selectedFieldKey={selectedFieldKey}
                onSelectFieldKey={(key) => setSelectedFieldKey(key)}
              />
            </div>

            {/* Right: Domain NER Extraction, LRMS Cross-Check & Verification Panel */}
            <div className="xl:col-span-6 h-[720px] xl:h-[calc(100vh-140px)]">
              <ExtractionReview
                currentDoc={currentDoc}
                currentUser={currentUser}
                onCorrectField={handleCorrectField}
                onReconcileLrms={handleReconcileLrms}
                onSealDocument={handleSealDocument}
                selectedFieldKey={selectedFieldKey}
                onSelectFieldKey={(key) => setSelectedFieldKey(key)}
                isSealing={isSealing}
              />
            </div>
          </div>
        )}

        {/* Cadastral GIS Spatial Map */}
        {activeTab === 'cadastral' && currentDoc && (
          <div className="h-[calc(100vh-140px)]">
            <CadastralMap
              currentDoc={currentDoc}
              onSelectDocByKhasra={(khasra) => {
                const found = documents.find((d) => d.khasraNumber.value.includes(khasra) || khasra.includes(d.khasraNumber.value));
                if (found) {
                  setCurrentDocId(found.id);
                  showToast(`Selected Document for Khasra ${found.khasraNumber.value}`, 'info');
                }
              }}
            />
          </div>
        )}

        {/* Explainable Risk Engine View */}
        {activeTab === 'risk' && currentDoc && (
          <div className="h-[calc(100vh-140px)]">
            <ExplainableRiskEngine currentDoc={currentDoc} />
          </div>
        )}

        {/* Chained Cryptographic Audit Ledger */}
        {activeTab === 'audit' && (
          <div className="h-[calc(100vh-140px)]">
            <AuditTrailLedger />
          </div>
        )}

        {/* Active Learning Queue */}
        {activeTab === 'learning' && (
          <div className="h-[calc(100vh-140px)]">
            <ActiveLearningQueue />
          </div>
        )}

        {/* Ministerial ROI Impact Model */}
        {activeTab === 'roi' && (
          <div className="h-[calc(100vh-140px)]">
            <RoiCalculator />
          </div>
        )}
      </main>

      {/* Floating Action / Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-xs font-medium bg-white text-slate-800 ${
            toastMessage.type === 'error'
              ? 'border-red-300 text-red-700'
              : toastMessage.type === 'info'
              ? 'border-blue-300 text-blue-700'
              : 'border-emerald-300 text-emerald-800'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${
              toastMessage.type === 'error' ? 'bg-red-500' : toastMessage.type === 'info' ? 'bg-blue-600' : 'bg-emerald-600'
            }`} />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Data Sovereignty & Deployment Boundary Modal */}
      <DataSovereigntyModal
        isOpen={isDataSovereigntyOpen}
        onClose={() => setIsDataSovereigntyOpen(false)}
      />
    </div>
  );
}
