export type UserRole = 'Data Entry Operator' | 'Patwari / Talathi' | 'Tehsildar / SDM' | 'DILRMP Admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  tehsil: string;
  district: string;
  state: string;
  badgeNumber: string;
}

export interface BoundingBox {
  ymin: number; // 0 - 1000 scale
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface ExtractedField<T = string | number> {
  value: T;
  confidence: number; // 0 - 100
  boundingBox?: BoundingBox;
  sourceTextSnippet?: string;
  isCorrected?: boolean;
  correctedBy?: string;
  correctedAt?: string;
  originalValue?: T;
}

export interface Shareholder {
  id: string;
  name: ExtractedField<string>;
  fatherOrHusbandName: ExtractedField<string>;
  shareFraction: ExtractedField<string>; // e.g. "1/2", "1/4"
  sharePercentage: number; // calculated e.g. 50%
  aadhaarVaultRef?: string; // e.g. "VAULT-XXXX-7819"
  status: 'Living' | 'Deceased' | 'Disputed';
}

export interface MutationRecord {
  mutationNumber: ExtractedField<string>;
  mutationDate: ExtractedField<string>;
  transferType: ExtractedField<'Inheritance (Varisani)' | 'Sale Deed (Bainama)' | 'Gift Deed (Hibanama)' | 'Court Order' | 'Partition'>;
  predecessorName: ExtractedField<string>;
  successorName: ExtractedField<string>;
  orderAuthority: ExtractedField<string>;
  status: 'Sanctioned' | 'Pending Verification' | 'Disputed';
}

export interface Encumbrance {
  bankOrCourt: string;
  amount: number;
  type: 'KCC Loan' | 'Bank Hypothecation' | 'Court Stay Order' | 'None';
  dateRecorded: string;
  cleared: boolean;
}

export interface CVPreprocessingDetails {
  originalResolution: string;
  deskewAngleDegrees: number;
  binarizationMethod: 'Otsu Adaptive Thresholding' | 'Sauvola Local Thresholding';
  contrastStretchGain: number; // e.g. 1.8x
  denoiseFilter: 'Non-Local Means (NLM)' | 'Median Filter';
  clarityScore: number; // 0 - 100
  processingTimeMs: number;
}

export interface LrmsCrossCheckResult {
  lrmsRecordFound: boolean;
  lrmsKhasra: string;
  lrmsKhata: string;
  lrmsTotalAreaHectares: number;
  lrmsOwners: string[];
  lrmsMutationsCount: number;
  discrepancies: {
    field: string;
    extractedValue: string | number;
    lrmsValue: string | number;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    message: string;
  }[];
  isLrmsSynced: boolean;
  lastLrmsUpdate: string;
}

export interface CadastralPlotGeometry {
  khasraNumber: string;
  villageCode: string;
  areaDeclaredHa: number;
  areaCalculatedHa: number;
  areaDeltaPercentage: number;
  polygonValid: boolean;
  hasSelfIntersection: boolean;
  encroachmentDetected: boolean;
  encroachmentType?: 'Gram Sabha Pasture' | 'Water Body (Pokhar/Nala)' | 'Forest Buffer' | 'None';
  overlapWithAdjacentParcel: boolean;
  overlappingKhasra?: string;
  coordinates: [number, number][]; // [lat, lng] polygon vertices
}

export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RiskFactor {
  category: 'Ownership & Share' | 'Mutation & Title Chain' | 'Cadastral & Area' | 'Scan & OCR Quality';
  scoreImpact: number; // 0 - 100 contribution
  severity: RiskSeverity;
  ruleCode: string;
  description: string;
  remedyRecommendation: string;
}

export interface RiskEvaluation {
  overallScore: number; // 0 (safest) - 100 (highest risk)
  severity: RiskSeverity;
  routingRecommendation: 'AUTO_APPROVE_ELIGIBLE' | 'PATWARI_VERIFICATION_REQUIRED' | 'TEHSILDAR_HEARING_REQUIRED' | 'BLOCKED_FRAUD_SUSPECT';
  factors: RiskFactor[];
  canBeSealed: boolean;
  blockReason?: string;
}

export interface AuditBlock {
  index: number;
  timestamp: string;
  documentId: string;
  khasraNumber: string;
  eventType: 'INGESTION' | 'OCR_EXTRACTED' | 'HUMAN_CORRECTION' | 'LRMS_RECONCILED' | 'GIS_VERIFIED' | 'TEHSILDAR_SEALED';
  officerEmail: string;
  officerRole: UserRole;
  details: string;
  previousHash: string;
  currentHash: string;
}

export interface LandRecordDocument {
  id: string;
  documentTitle: string;
  state: string;
  district: string;
  tehsil: string;
  village: string;
  villageLgdCode: string;
  documentType: 'UP Khasra-Khatauni (Form CH-41)' | 'Maharashtra 7/12 (Satbara)' | 'MP B-1 Khasra Register' | 'Punjab Jamabandi (RoR)';
  script: 'Devanagari (Hindi)' | 'Modi / Marathi' | 'Gurmukhi (Punjabi)' | 'Bilingual English-Indic';
  scanImageUrl: string;
  preprocessedImageUrl: string;
  cvDetails: CVPreprocessingDetails;
  extractionMode?: 'VLM' | 'DEMO_FALLBACK';
  extractionModel?: string;
  
  // Core Identifiers
  khataNumber: ExtractedField<string>;
  khasraNumber: ExtractedField<string>;
  subDivision: ExtractedField<string>;
  
  // Area & Classification
  totalAreaHectare: ExtractedField<number>;
  traditionalAreaUnit: ExtractedField<string>; // e.g. "3 Bigha 4 Biswa", "2 Guntha"
  landClassification: ExtractedField<'Agricultural (Chahi)' | 'Agricultural (Barani)' | 'Non-Agricultural (Abadi)' | 'Commercial'>;
  irrigationSource: ExtractedField<string>;
  
  // Stakeholders
  shareholders: Shareholder[];
  totalSharePercentage: number;
  isShareBalanced: boolean;
  
  // Mutation & Legal Chain
  mutations: MutationRecord[];
  encumbrances: Encumbrance[];
  
  // Cross-verification & GIS
  lrmsCheck: LrmsCrossCheckResult;
  cadastralGeometry: CadastralPlotGeometry;
  
  // Risk & Lifecycle
  risk: RiskEvaluation;
  status: 'PENDING_EXTRACTION' | 'NEEDS_CORRECTION' | 'READY_FOR_SEAL' | 'SEALED_APPROVED' | 'DISPUTED_REJECTED';
  digitalSeal?: {
    sealedByOfficer: string;
    sealedByRole: UserRole;
    sealedTimestamp: string;
    sealHash: string;
    signatureAlgorithm: string;
    digitalSignature: string;
    publicKeyFingerprint: string;
    signedPayload: string;
    qrVerificationUrl: string;
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface LearningQueueItem {
  id: string;
  documentId: string;
  fieldName: string;
  khasraNumber: string;
  aiPredictedValue: string | number;
  aiConfidence: number;
  humanCorrectedValue: string | number;
  correctedByOfficer: string;
  timestamp: string;
  verified: boolean;
}
