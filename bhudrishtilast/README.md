# BhuDrishti — Intelligent Land Record Digitization & Validation

SIH 2026 prototype for digitizing historical Indian land records and routing them through human verification, LRMS reconciliation, cadastral GIS validation, explainable risk checks, cryptographic sealing, and an auditable feedback loop.

> **Prototype boundary:** This repository demonstrates the workflow. It does not claim live government LRMS integration, DSC issuance, production statutory compliance, or validated fraud-detection accuracy. Demo records and GIS data are local fixtures.

## Problem
Historical land records are scanned, multilingual, inconsistently formatted, and difficult to reconcile with digital registries. A useful modernization workflow must preserve provenance while reducing manual entry and making discrepancies visible to revenue officers.

## Solution Workflow
1. Scan ingestion and CV preprocessing
2. Document-type safety gate (land-record vs non-land/uncertain)
3. Configurable Indic VLM/OCR extraction
3. Field-level confidence and bounding-box provenance
4. Human-in-the-loop correction
5. Prototype LRMS cross-check and discrepancy reconciliation
6. Cadastral GeoJSON/GIS validation
7. Explainable, policy-configurable risk scoring
8. Role-controlled cryptographic sealing
9. SHA-256 chained audit ledger
10. Verified corrections exported as supervised-learning JSONL

## Key Features
- Indic land-record extraction for Khasra/Khatauni-style documents
- Pre-extraction document classification gate that blocks non-land and uncertain uploads
- No synthetic fallback is used for user-uploaded documents when live VLM classification is unavailable
- Field-level confidence (0–100) and optional source snippets/bounding boxes
- Human correction with immutable audit event and ground-truth queue entry
- LRMS discrepancy comparison (prototype fixture; adapter-ready API boundary)
- Cadastral polygon validation, area delta and encroachment indicators
- Explainable rule-based risk engine; weights are policy-configurable, not statistical probabilities
- RBAC for Data Entry Operator, Patwari/Talathi, Tehsildar/SDM and DILRMP Admin
- JWT authentication with 8-hour expiry and login throttling
- RSA-SHA256 digital signatures for prototype sealing plus SHA-256 integrity hashes
- Hash-chained audit ledger
- Runtime-generated RSA signing keys stored outside version control
- Human feedback export for future model training/evaluation

## Architecture
```text
Historical Scan
      │
      ▼
CV Preprocessing ──► Document-Type Safety Gate
                              │
                       ┌──────┴──────┐
                       ▼             ▼
                 Non-land/       Land Record
                  Uncertain          │
                       │              ▼
                    BLOCK       Indic VLM/OCR Adapter
                                      │
                                      ▼
                              Field Extraction + Provenance
                     │
                     ▼
             Human Verification
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   LRMS Cross-check       Cadastral GIS
          │                     │
          └──────────┬──────────┘
                     ▼
             Explainable Risk Engine
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
       Escalate             Seal Eligible
                                │
                                ▼
                 RSA-SHA256 Signature +
                 SHA-256 Integrity Hash
                                │
                                ▼
                   Chained Audit Ledger
                                │
                                ▼
                    Training Feedback Queue
```

## Data Sovereignty
The application isolates model inference behind a configurable VLM adapter. The submitted prototype can call an external provider only when a provider key is explicitly configured. For production, the intended deployment is inside an approved State Data Centre/sovereign cloud with an approved on-premise/private Indic VLM, so raw scans remain inside the authorized processing boundary.

**Do not claim the prototype itself is fully sovereign while using an external model endpoint.**

## Security Improvements in This Version
- Removed the exposed API key from the submission.
- `.env` is ignored; only `.env.example` is shipped.
- Backend demo passwords are stored as scrypt hashes, not plaintext.
- JWT secret is mandatory and must be at least 32 characters.
- JWTs expire after 8 hours and use timing-safe signature comparison.
- Login attempts are throttled per source IP in the prototype.
- RSA 3072-bit signing keys are generated at first startup and stored in `data/keys/`, which is ignored by Git.
- Seal verification is available at `/api/verify-seal?docId=<id>`.

## Cryptographic Sealing
The prototype is **not blockchain** and does not issue government DSCs. It uses:
- RSA-3072 / RSA-SHA256 digital signatures
- SHA-256 integrity hash of the signed payload
- A chained audit ledger where each block commits to the previous block hash

Production can replace the prototype signer with an approved government/CCA-compatible DSC/HSM integration.

## Active Learning Boundary
Officer corrections are collected as verified ground truth and exported as JSONL. The prototype **does not automatically retrain the model**. A production ML lifecycle should add dataset review, train/validation/test splits, held-out evaluation, model versioning, bias checks and controlled deployment.

## LRMS Boundary
The included LRMS values are demo fixtures. The API is structured so a production adapter can be added for an authenticated state LRMS endpoint. No live government database is contacted by this repository.

## Risk Engine
Risk is a deterministic, explainable policy engine. Example rules include share imbalance, cadastral encroachment, LRMS area discrepancy, court stay/mutation dispute and scan quality. The numeric weights are prototype policy values and must be calibrated and approved against historical cases before production use.

## Demo Accounts
These are **prototype-only** accounts and should never be reused in production.

| Role | Email | Password |
|---|---|---|
| Operator | operator@bhudrishti.gov.in | Demo@123 |
| Patwari | patwari@bhudrishti.gov.in | Patwari@123 |
| Tehsildar | tehsildar@bhudrishti.gov.in | Tehsildar@123 |
| Admin | admin@bhudrishti.gov.in | Admin@123 |

The backend stores password hashes; these credentials are documented only so judges can run the demo.

## Run Locally

### Prerequisites
- Node.js 20+ recommended
- npm

### Setup
```bash
npm install
copy .env.example .env
```

Set `JWT_SECRET` to a random secret of at least 32 characters. Set `GEMINI_API_KEY` when using custom uploads. Custom uploads are accepted only after the VLM classifies them as land records with at least 70% document-type confidence; non-land and uncertain files are blocked. The pre-loaded demo records continue to work without a live VLM call.

### Start
```bash
npm run dev
```

Open `http://localhost:3000`.

### Production build
```bash
npm run build
npm start
```

## Project Structure
```text
BhuDrishti/
├── src/
│   ├── components/
│   ├── data/
│   ├── services/
│   ├── App.tsx
│   ├── types.ts
│   └── index.css
├── data/
│   └── imported-cadastral.geojson
├── server.ts
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

## Important Prototype Limitations
- Local JSON persistence is used instead of PostgreSQL/PostGIS.
- LRMS integration is simulated with local fixtures.
- The external VLM path is not sovereign; production must use an approved in-boundary model deployment.
- RSA signing keys are prototype runtime keys, not government DSC/HSM keys.
- Risk weights are not statistically calibrated.
- Training feedback is collected but not automatically used to retrain a model.
- Demo credentials are intentionally simple for judging and are not production identities.

## Recommended Production Evolution
1. PostgreSQL + PostGIS with transactional writes and row-level authorization.
2. State LRMS adapters with mTLS/API gateway controls.
3. Sovereign/on-premise Indic VLM deployment.
4. HSM/CCA-compatible DSC integration.
5. Centralized identity/SSO and secrets management.
6. Object storage with encryption, retention and access policies.
7. Model evaluation and version registry.
8. Centralized audit/SIEM integration.
9. Disaster recovery, backup and operational monitoring.

## SIH Demo Narrative
The strongest demo path is: **scan → extract → correct one field → show learning feedback → show LRMS discrepancy → reconcile → inspect GIS → inspect explainable risk → seal with Tehsildar role → verify RSA signature and audit chain.**
