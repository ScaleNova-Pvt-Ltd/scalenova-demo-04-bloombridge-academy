# Transactional Email Notification Specification — Bloombridge Academy

## 1. Sender Identity
- **Configured Sender**: `demo@scalenovasys.com`
- **Authorized Transport**: Google Apps Script MailApp / GmailApp via authorized account

## 2. Dual Notification Paths
### A. Internal Hot Lead Alert (ScaleNova Team)
- **Subject**: `NEW LEAD ALERT: [Bloombridge Academy] {Service} — Ref #{SubmissionID}`
- **Latency**: Dispatched within 60 seconds
- **Features**: Full 23-column data breakdown, direct WhatsApp click-to-chat link.

### B. Branded Customer Confirmation (Bloombridge Academy)
- **Subject**: `Thank You for Contacting Bloombridge Academy — Ref #{SubmissionID}`
- **Features**: Branded header in `#2D1B69`, professional greeting, next steps, link to `https://demo4.scalenovasys.com`.
