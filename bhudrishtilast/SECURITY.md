# Security Notes

## Before submission
- Never include `.env` or provider API keys.
- Never commit `data/keys/`.
- Never use the demo credentials in a production environment.

## Prototype controls
- scrypt password verification
- HS256 JWT with mandatory environment secret and 8-hour expiry
- timing-safe JWT signature comparison
- login throttling
- RSA-SHA256 record signing
- SHA-256 integrity hashing
- hash-chained audit events

## Production requirements
Use centralized identity, secrets management, HSM-backed signing/CCA-approved DSC infrastructure, database transactions, mTLS/API gateways, structured authorization, audit/SIEM integration, encryption at rest/in transit, backup/DR and security testing.
