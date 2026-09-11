import type { LandRecordDocument, UserProfile, AuditBlock, LearningQueueItem } from '../types';
import type { FeatureCollection } from 'geojson';

const TOKEN_KEY = 'bhudrishti_auth_token';

export const DEMO_PRESET_USERS = [
  { role: 'Data Entry Operator', email: 'operator@bhudrishti.gov.in', pass: 'Demo@123', label: 'Operator: Satish' },
  { role: 'Patwari / Talathi', email: 'patwari@bhudrishti.gov.in', pass: 'Patwari@123', label: 'Patwari: Raghunath' },
  { role: 'Tehsildar / SDM', email: 'tehsildar@bhudrishti.gov.in', pass: 'Tehsildar@123', label: 'Tehsildar: Dr. Ananya' },
  { role: 'DILRMP Admin', email: 'admin@bhudrishti.gov.in', pass: 'Admin@123', label: 'Admin: Director General' },
];

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  async login(email: string, password: string): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to authenticate');
    }
    const data = await res.json();
    this.setToken(data.token);
    return data;
  },

  async getMe(): Promise<UserProfile | null> {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  async getDocuments(): Promise<LandRecordDocument[]> {
    const res = await fetch('/api/documents');
    if (!res.ok) throw new Error('Failed to load land records');
    return res.json();
  },

  async getDocument(id: string): Promise<LandRecordDocument> {
    const res = await fetch(`/api/documents/${id}`);
    if (!res.ok) throw new Error('Document not found');
    return res.json();
  },

  async analyzeDocument(payload: {
    imageBase64?: string;
    sampleDocId?: string;
    state?: string;
    district?: string;
    tehsil?: string;
    village?: string;
  }): Promise<LandRecordDocument> {
    const token = this.getToken();
    const res = await fetch('/api/documents/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Extraction failed');
    }
    return res.json();
  },

  async correctField(docId: string, payload: {
    fieldName: string;
    correctedValue: string | number;
    shareholderIndex?: number;
    mutationIndex?: number;
  }): Promise<{ document: LandRecordDocument; learningItem: LearningQueueItem }> {
    const token = this.getToken();
    const res = await fetch(`/api/documents/${docId}/correct`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Correction failed');
    }
    return res.json();
  },

  async reconcileLrms(docId: string, payload: {
    resolutionNotes: string;
    acceptScanValue: boolean;
  }): Promise<LandRecordDocument> {
    const token = this.getToken();
    const res = await fetch(`/api/documents/${docId}/reconcile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'LRMS reconciliation failed');
    }
    return res.json();
  },

  async sealDocument(docId: string, payload: {
    overrideCriticalRisk?: boolean;
    officerNotes?: string;
  }): Promise<{ success: boolean; document: LandRecordDocument; seal: any }> {
    const token = this.getToken();
    const res = await fetch(`/api/documents/${docId}/seal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Digital sealing failed');
    }
    return res.json();
  },

  async getCadastralPlots(): Promise<{ featureCollection: FeatureCollection; plotsCount: number; source: string }> {
    const res = await fetch('/api/cadastral/plots');
    if (!res.ok) throw new Error('Failed to load Cadastral GIS layer');
    return res.json();
  },

  async importCadastralGeoJson(geoJson: FeatureCollection): Promise<any> {
    const token = this.getToken();
    const res = await fetch('/api/cadastral/import-geojson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(geoJson),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'GeoJSON import failed');
    }
    return res.json();
  },

  async getAuditTrail(): Promise<{
    totalBlocks: number;
    isChainValid: boolean;
    genesisHash: string;
    latestHash: string;
    blocks: AuditBlock[];
  }> {
    const res = await fetch('/api/audit-trail');
    if (!res.ok) throw new Error('Failed to load audit ledger');
    return res.json();
  },

  async getLearningQueue(): Promise<LearningQueueItem[]> {
    const res = await fetch('/api/learning/queue');
    if (!res.ok) throw new Error('Failed to load learning queue');
    return res.json();
  },

  async getRoiImpact(params?: {
    annualVolume?: number;
    manualMins?: number;
    automatedMins?: number;
    hourlyRate?: number;
  }): Promise<any> {
    const query = new URLSearchParams({
      annualVolume: String(params?.annualVolume || 150000),
      manualMins: String(params?.manualMins || 45),
      automatedMins: String(params?.automatedMins || 8),
      hourlyRate: String(params?.hourlyRate || 350),
    });
    const res = await fetch(`/api/impact/roi?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to compute ROI metrics');
    return res.json();
  },

  async resetDemo(): Promise<any> {
    const token = this.getToken();
    const res = await fetch('/api/demo/reset', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  }
};
