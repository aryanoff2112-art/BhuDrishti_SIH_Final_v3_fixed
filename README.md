# BhuDrishti — Intelligent Land Record Digitization & Validation System

> **SIH26018 | Smart India Hackathon 2026**
>
> An AI-assisted platform for digitizing, validating, reviewing, and securely sealing Indian land records while keeping a human officer in the decision loop.

---

## 🚀 Overview

BhuDrishti converts scanned land-record documents into structured digital records and provides validation, explainable risk checks, human review, auditability, and cryptographic sealing in one workflow.

The system is designed around a practical government digitization pipeline:

**Upload → Document Validation → AI Extraction → Field-Level Review → Validation → Risk Analysis → Human Approval → Cryptographic Seal → Audit Trail**

The project supports common Indian revenue-record concepts such as:

- Khasra
- Khata / Khatauni
- 7/12 / Satbara
- Jamabandi
- Record of Rights (RoR)
- Mutation information
- Land-owner / shareholder information

---

## ⭐ Key Features

### 1. AI-Assisted Land Record Extraction

The application can analyze scanned land records using a configurable Gemini VLM and extract structured fields such as:

- Khasra number
- Khata number
- Owner/shareholder names
- Area
- Land classification
- Irrigation details
- Mutation information
- Source text snippets
- Field-level confidence
- Bounding-box coordinates

Each extracted field is designed to carry its own confidence rather than presenting one unexplained document-level score.

---

### 2. 🛡️ Land Record Validation Gate

BhuDrishti does **not blindly treat every uploaded document as a land record**.

Before extraction, the uploaded document passes through a document-classification stage.

Possible outcomes:

| Classification | Action |
|---|---|
| Land Record | ✅ Continue to extraction |
| Possible / uncertain land record | ⚠️ Require review |
| Non-land document | ❌ Block extraction |
| Unreadable document | ⚠️ Request better scan |
| Unsupported file | ❌ Reject |

Examples of documents that should be rejected include unrelated identity documents, invoices, receipts, college documents, newspapers, and random photographs.

**Important:** if the external VLM is unavailable, an uploaded user document is not converted into a synthetic/demo land record. Demo fallback data is reserved for the application's preloaded demonstration records.

---

### 3. Human-in-the-Loop Review

AI extraction is not treated as final government truth.

Officers can:

- Review extracted values
- Inspect confidence
- Correct fields
- Review source snippets
- Inspect document regions
- Approve or reject records

Corrections can become verified training feedback for future model-training cycles.

---

### 4. Explainable Risk Engine

The system provides rule-based validation and risk indicators for issues such as:

- Area inconsistencies
- Ownership/share discrepancies
- Mutation-related inconsistencies
- Missing or suspicious fields
- Low-confidence extraction

The goal is to help officials prioritize records that require closer inspection rather than automatically making a legal determination.

---

### 5. Cryptographic Record Sealing

Approved records can be cryptographically sealed using:

- **RSA-SHA256 digital signatures**
- **SHA-256 integrity hashes**
- Public-key fingerprinting
- Cryptographically chained audit events

A verification endpoint is included to verify the integrity/signature of a sealed record.

> This is a prototype cryptographic sealing mechanism. It is **not a government-issued DSC/e-signature** and should not be represented as one.

---

### 6. Audit Trail

Important actions are recorded in an audit ledger, including events such as:

- Upload
- Extraction
- Review
- Correction
- Approval
- Rejection
- Sealing

The prototype uses a cryptographically chained ledger rather than claiming to implement a decentralized blockchain network.

---

### 7. Active Learning Feedback

The Active Learning Queue captures officer corrections as structured feedback.

The intended production workflow is:

**AI prediction → Officer correction → Verified ground truth → Training dataset → Model evaluation/retraining**

The current project does **not** falsely claim automatic production-model retraining.

---

### 8. Data Sovereignty Ready Architecture

The prototype supports a configurable VLM integration for rapid demonstration.

For production deployment involving sensitive land records, the recommended architecture is:

```text
Citizen / Officer
       ↓
Government Application
       ↓
Government-controlled Storage
       ↓
On-premise / Government Data Centre VLM
       ↓
Extraction + Validation
       ↓
Government-controlled Audit & Records
```

A sovereign deployment can use an open-weight or fine-tuned document/VLM model hosted inside NIC MeghRaj, a state data centre, or another approved government-controlled environment.

External cloud inference should be treated as an explicit prototype/deployment option rather than assumed to be suitable for sensitive production records.

---

## 🏗️ Architecture

```text
┌───────────────────────────────────────────────┐
│                  Frontend                     │
│             React + TypeScript                │
│                                               │
│  Upload → Review → Risk → Approval → Seal    │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│                Node.js Server                 │
│                 Express API                   │
├───────────────────────────────────────────────┤
│ Authentication │ Document Validation          │
│ AI Extraction  │ Field Mapping                │
│ Risk Engine    │ Audit Ledger                 │
│ Digital Seal   │ Seal Verification            │
└───────────────┬───────────────────────────────┘
                │
       ┌────────┴─────────┐
       ▼                  ▼
┌───────────────┐   ┌────────────────┐
│ Gemini VLM    │   │ Local / Demo    │
│ configurable  │   │ fallback paths  │
└───────────────┘   └────────────────┘
```

---

## 🧰 Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons

### Backend

- Node.js
- Express
- TypeScript
- `tsx`

### AI

- Google Gemini API / `@google/genai`
- Configurable model through `GEMINI_MODEL`

### Security

- JWT authentication
- Scrypt password hashing
- RSA-SHA256 signatures
- SHA-256 integrity hashing
- Cryptographically chained audit events
- Login throttling

### Data

The current project uses lightweight prototype persistence and fixtures for demonstration.

For production, replace prototype persistence with approved government databases/object storage and integrate with authoritative land-record systems.

---

## 📁 Project Structure

```text
bhudrishtilast/
│
├── src/
│   ├── components/
│   │   ├── ActiveLearningQueue.tsx
│   │   ├── AuditTrailLedger.tsx
│   │   ├── CadastralMap.tsx
│   │   ├── DataSovereigntyModal.tsx
│   │   ├── ExplainableRiskEngine.tsx
│   │   ├── ExtractionReview.tsx
│   │   ├── Header.tsx
│   │   ├── RoiCalculator.tsx
│   │   └── ScanIngestion.tsx
│   │
│   ├── App.tsx
│   ├── types.ts
│   └── ...
│
├── server.ts
├── package.json
├── .env.example
├── .gitignore
├── SECURITY.md
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

Install:

- Node.js 20+ recommended
- npm
- A Gemini API key for live VLM extraction

Check your installation:

```powershell
node -v
npm -v
```

### 1. Clone the repository

```bash
git clone <https://github.com/aryanoff2112-art/BhuDrishti_SIH_Final_v3_fixed/>
cd bhudrishtilast
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_actual_gemini_api_key
JWT_SECRET=your_long_random_secret_at_least_32_characters
APP_URL=http://localhost:3000
GEMINI_MODEL=gemini-2.5-flash
```

**Never commit `.env` to GitHub.**

Use `.env.example` as the template.

### 4. Start the development server

```bash
npm run dev
```

The application should be available at:

```text
http://localhost:3000
```

---

## 🔐 Demo Accounts

The prototype includes demonstration roles for local testing.

| Role | Email | Password |
|---|---|---|
| Operator | operator@bhudrishti.gov.in | Demo@123 |
| Patwari | patwari@bhudrishti.gov.in | Patwari@123 |
| Tehsildar | tehsildar@bhudrishti.gov.in | Tehsildar@123 |
| Administrator | admin@bhudrishti.gov.in | Admin@123 |

These credentials are **prototype/demo credentials only**.

They must be replaced with proper government identity and access management before production deployment.

---

## 🧪 Testing the Document Validation Gate

A useful demonstration is to intentionally upload unrelated documents.

### Test 1 — Valid land record

Upload a genuine or permitted sample Khasra/Khatauni/7/12/Jamabandi/RoR scan.

Expected:

```text
Land Record Detected
        ↓
Extraction allowed
        ↓
Field-level confidence
        ↓
Human review
```

### Test 2 — Unrelated document

Upload an invoice, identity document, newspaper, or unrelated image.

Expected:

```text
Non-land document
        ↓
Extraction blocked
        ↓
No land record created
```

### Test 3 — Poor-quality scan

Upload a severely blurred or unreadable scan.

Expected:

```text
Uncertain / unreadable
        ↓
Human review or better scan requested
```

This test is important because an AI digitization system should fail safely rather than invent land-record values.

---

## 🔄 End-to-End Workflow

### Step 1 — Scan Ingestion

Officer uploads a land-record scan.

### Step 2 — Document Classification

The system checks whether the document resembles a supported land/revenue record.

### Step 3 — AI Extraction

The configured VLM extracts structured fields and associated confidence/source information.

### Step 4 — Human Review

An authorized officer checks the AI output against the source document.

### Step 5 — Validation

The system checks structural and logical inconsistencies.

### Step 6 — Risk Analysis

Potential issues are surfaced for investigation.

### Step 7 — Approval

An authorized officer approves or rejects the record.

### Step 8 — Cryptographic Sealing

An approved record can be signed and integrity-hashed.

### Step 9 — Audit

The operation is recorded in the cryptographically chained audit ledger.

---

## 🔒 Security Design

The prototype includes several security controls:

- Secrets are loaded from environment variables.
- `.env` is excluded from Git.
- Passwords are stored as scrypt-derived hashes rather than plaintext.
- JWT signing uses an environment-provided secret.
- Login attempts are throttled.
- RSA keys are generated/stored separately from source code.
- Sealed records receive integrity hashes.
- Digital signatures can be independently verified.
- Audit entries are cryptographically chained.

See [`SECURITY.md`](SECURITY.md) for additional security/deployment notes.

---

## 🌐 Production Roadmap

BhuDrishti is a prototype and should not be deployed directly as a production government system.

### Phase 1 — Prototype

- Gemini-based VLM extraction
- Document classification
- Human review
- Risk engine
- Cryptographic sealing
- Demo fixtures

### Phase 2 — Government Pilot

- Government-hosted VLM/OCR
- Real anonymized/public sample records
- State-specific document classifiers
- Authoritative database integration
- Role-based access control
- Centralized secure object storage
- Comprehensive evaluation dataset

### Phase 3 — Production

- NIC/state data-centre deployment
- Government identity integration
- HSM-backed key management
- DSC/e-sign integration where legally required
- Immutable production audit infrastructure
- High-availability architecture
- Monitoring and incident response
- Model drift monitoring
- Human approval workflows
- Formal security and accuracy audits

---

## 📊 Model Evaluation

No production accuracy claim should be made without a held-out evaluation dataset.

Recommended evaluation metrics:

- Document classification accuracy
- Precision / recall for non-land-document rejection
- Character Error Rate (CER)
- Word Error Rate (WER)
- Field-level exact-match accuracy
- Numeric extraction accuracy
- Owner-name extraction accuracy
- Area extraction accuracy
- Confidence calibration
- False acceptance rate for unrelated documents
- False rejection rate for valid land records

A government pilot should evaluate the model separately across:

- Different states
- Different record formats
- Different languages/scripts
- Different scan qualities
- Handwritten vs printed records
- Old vs new record templates

---

## ⚠️ Important Limitations

This repository is an **SIH prototype**, not a production land-record authority.

Specifically:

1. AI output must be reviewed by an authorized human.
2. The prototype's demo credentials are not production credentials.
3. Prototype persistence should be replaced with production databases.
4. Prototype cryptographic sealing is not equivalent to a government DSC/e-signature.
5. The audit ledger is not a decentralized blockchain.
6. External VLM APIs may not be appropriate for sensitive production data.
7. Real government integrations require authorized APIs and institutional approval.
8. Legal ownership/title decisions must remain within the appropriate government/legal workflow.
9. Model accuracy must be established through a representative held-out dataset.

---

## 🏆 Why BhuDrishti?

Traditional digitization can involve:

- Manual transcription
- Repetitive verification
- Poor scan quality
- Inconsistent record formats
- Human transcription errors
- Difficult auditability

BhuDrishti combines AI extraction with safeguards:

```text
              AI
              ↓
        Document Gate
              ↓
         Extraction
              ↓
       Field Confidence
              ↓
       Human Verification
              ↓
       Explainable Checks
              ↓
          Approval
              ↓
       Cryptographic Seal
              ↓
        Audit Evidence
```

The core design principle is:

> **AI assists the officer; it does not replace the officer.**

---



