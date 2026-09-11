# Integration Guide — Bloombridge Academy

## Gateway Configuration
- **Demo Identifier:** `DEMO-04`
- **Lead Prefix:** `SN-BLO-`
- **Target Sheet:** `Demo4_Education`
- **Target Frappe Source:** `Bloombridge Academy Admissions Portal`

### Payload Format
```json
{
  "demoId": "DEMO-04",
  "industry": "Education & Professional Training",
  "sourceWebsite": "Bloombridge Academy of Advanced Technology (DEMO-04)",
  "leadType": "Admissions Application",
  "fullName": "Ananya Sundaram",
  "email": "ananya.s@enterprise.com",
  "phone": "+91 98860 55443",
  "companyName": "Microsoft Corporation",
  "city": "Bengaluru",
  "serviceInterest": "Applied Generative AI & Enterprise Architecture",
  "budgetRange": "Corporate L&D Sponsored",
  "timeline": "Upcoming Spring Cohort",
  "projectDescription": "Experience: 8 to 12 Years (Lead / Principal). Goals: Lead enterprise agentic AI migrations.",
  "submissionId": "SN-BLO-K7B3-9102"
}
```
Routed automatically to `Demo4_Education` and Frappe CRM.
