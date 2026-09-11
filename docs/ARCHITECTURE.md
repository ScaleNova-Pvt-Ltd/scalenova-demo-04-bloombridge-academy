# Bloombridge Academy — Technical Architecture

Bloombridge Academy is part of ScaleNova's **EliteOS Tier**, configured specifically for executive education institutes, high-end technical academies, and corporate leadership programs.

## System Topology

```
[Candidate / Corporate L&D Director]
         │ (HTTPS / TLS 1.3)
         ▼
[Bloombridge Academy Static Web Engine] (Cloudflare Pages Edge)
   - Visual Identity: Royal Violet (#120A2B) + Lavender (#DDD6FE) + Rose (#EC4899)
   - Interactive Competency Constellation: Real-time dynamic skills radar and node links
   - Admissions Application Funnel: Cohort, experience level, sponsorship tracking
         │
         │ POST JSON (Zero-Secret Client API)
         ▼
[ScaleNova Master Integration Gateway] (Google Apps Script Web App)
   - Request routing via `demoId = "DEMO-04"`
   - 22-Column ISO Schema Formatting
         ├──> [Master Google Sheet CRM] -> Tab: `Demo4_Education` (22 Columns)
         ├──> [Dual Transactional Email via Gmail Service]
         │       ├── Admissions Directorate notification with applicant experience metrics
         │       └── Candidate application receipt with candidate reference (`SN-BLO-XXXXXX`)
         └──> [ScaleNova Frappe CRM / ERPNext]
                 └── POST https://demo.scalenovasys.com/api/resource/Lead
                 └── Fail-safe asynchronous logging
```
