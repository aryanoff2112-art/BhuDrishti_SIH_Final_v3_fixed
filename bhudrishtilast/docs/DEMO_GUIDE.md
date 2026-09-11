# SIH Internal Round Demo Guide

## 7-minute path
1. Log in as `operator@bhudrishti.gov.in` / `Demo@123`.
2. Open **Digitization & Review** and run a sample extraction or upload a scan.
3. If demonstrating a custom upload, first show the document-type safety gate: land records proceed to extraction; non-land or uncertain documents are blocked before any land fields are created.
4. Point out field-level confidence and source/bounding-box provenance.
5. Correct one field. Show the audit event and learning queue entry.
6. Open LRMS cross-check and show a discrepancy before reconciliation.
7. Reconcile as Patwari.
8. Open Cadastral GIS and show parcel/area validation.
9. Open Explainable Risk and explain that the score is a deterministic policy engine, not an ML probability.
10. Switch to Tehsildar and seal an eligible record.
11. Show the RSA-SHA256 signature/integrity hash and audit ledger.
12. Verify the seal through `/api/verify-seal?docId=<document-id>`.

## Role credentials
- Operator: `operator@bhudrishti.gov.in` / `Demo@123`
- Patwari: `patwari@bhudrishti.gov.in` / `Patwari@123`
- Tehsildar: `tehsildar@bhudrishti.gov.in` / `Tehsildar@123`
- Admin: `admin@bhudrishti.gov.in` / `Admin@123`

## Judge-safe language
Use **"cryptographically chained audit ledger"**, not blockchain.
Use **"RSA-SHA256 digital signature prototype"**, not government DSC.
Use **"prototype LRMS adapter/fixture"**, not live LRMS integration.
Use **"human-in-the-loop training feedback"**, not automatic model retraining.
Use **"sovereign production deployment target"**, not "already sovereign" when an external VLM key is configured.
