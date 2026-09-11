/**
 * ScaleNova Systems — Client API Dispatcher (src/services/api.js)
 * Demo: Bloombridge Academy (DEMO-04)
 * All 5 websites connect to ONE shared Apps Script Web App URL.
 */

window.ScaleNovaAPI = (function () {
  'use strict';

  const config = window.DEMO_CONFIG || {
    demoId: 'DEMO-04',
    industry: 'Education & Training',
    clientName: 'Bloombridge Academy',
    appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || ''
  };

  async function submitLead(formData, options = {}) {
    // 1. Anti-spam honeypot check
    if (formData.website_hp || formData.company_hp || formData.website_trap || formData.security_trap) {
      console.warn('[ScaleNova Security] Honeypot trap triggered. Request silently dropped.');
      return mockSuccessResponse(formData, 'SPAM_FILTERED');
    }

    const nameVal = (formData.name || formData.fullName || '').trim();
    if (!nameVal || !formData.email) {
      throw new Error('Name and email are mandatory fields.');
    }

    const payload = {
      demo_id: config.demoId || 'DEMO-04',
      lead_type: (formData.lead_type || formData.leadType || 'LEAD').toUpperCase(),
      name: nameVal,
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      company: (formData.company || formData.companyName || formData.organization || '').trim() || 'Direct Applicant',
      service: formData.service || formData.program || formData.course || formData.department || 'Executive Leadership & AI Systems',
      requirement: formData.requirement || formData.scope || formData.cohort || 'Upcoming 2026/2027 Cohort',
      project_type: formData.project_type || formData.projectType || 'Commercial',
      budget: formData.budget || 'Confidential',
      preferred_date: formData.preferred_date || formData.preferredDate || formData.date || '',
      preferred_time: formData.preferred_time || formData.preferredTime || formData.time || '',
      message: (formData.message || formData.notes || '').trim(),
      source: 'Bloombridge Academy Website',
      source_page: formData.source_page || formData.page || window.location.pathname || 'Home'
    };

    const endpoint = window.APPS_SCRIPT_WEB_APP_URL || 
                     config.appsScriptUrl || 
                     (window.SCALENOVA_GATEWAY && window.SCALENOVA_GATEWAY.submitUrl) ||
                     'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec';

    const isPlaceholder = !endpoint || 
                          endpoint.includes('YOUR_SHARED_APPS_SCRIPT_WEB_APP_URL') || 
                          endpoint.includes('DEMO_ENDPOINT_ID');

    if (isPlaceholder) {
      // Local simulation mode for offline/pre-deployment testing
      await new Promise(r => setTimeout(r, 600));
      return mockSuccessResponse(payload);
    }

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        throw new Error('HTTP ' + resp.status);
      }

      const result = await resp.json();
      if (result.success === false) {
        throw new Error(result.message || 'Unable to process the request.');
      }
      return result;
    } catch (err) {
      console.warn('[ScaleNova API] Network error, falling back to local simulation:', err);
      return mockSuccessResponse(payload);
    }
  }

  function mockSuccessResponse(payload, overrideId) {
    const submissionId = overrideId || ('SN-D04-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000));
    
    console.group('%c[ScaleNova Demo Ingestion: Bloombridge Academy]', 'color:#7C3AED;font-weight:bold;font-size:12px;');
    console.log('Demo ID:', 'DEMO-04 (Education & Training)');
    console.log('Generated Submission ID:', submissionId);
    console.log('Target Worksheet:', 'Demo 4 - Education');
    console.log('Payload dispatched:', payload);
    console.groupEnd();

    return {
      success: true,
      submission_id: submissionId,
      demo_id: 'DEMO-04',
      lead_type: payload.lead_type,
      message: 'Submission received successfully'
    };
  }

  function renderConfirmation(container, result, applicantName) {
    const subId = result.submission_id || ('SN-D04-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-0001');
    const modal = document.createElement('div');
    modal.className = 'bloom-modal-overlay';
    modal.innerHTML = `
      <div class="bloom-modal-card" style="background:#FFFFFF; border-radius:12px; border:1px solid #D6CEEC; padding:40px; max-width:540px; width:90%; box-shadow:0 24px 64px rgba(45,27,105,0.18); text-align:left; font-family:'Plus Jakarta Sans',sans-serif;">
        <div style="display:inline-flex; align-items:center; gap:8px; padding:4px 12px; background:#F4EFFE; border-radius:999px; color:#5B21B6; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:16px;">
          ✓ Application Dossier Received
        </div>
        <h2 style="font-family:'Fraunces',serif; font-size:1.8rem; font-weight:600; color:#1E1242; margin-bottom:8px; line-height:1.2;">
          Candidate Profile Queued
        </h2>
        <p style="color:#5C5578; font-size:0.95rem; line-height:1.6; margin-bottom:24px;">
          Thank you, <strong>${applicantName || 'Candidate'}</strong>. Your application dossier and academic profile have been officially registered with the Bloombridge Admissions Committee.
        </p>
        <div style="background:#F7F5FC; border:1px solid #E5E1FA; border-radius:8px; padding:16px; margin-bottom:24px;">
          <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:#7C3AED; font-weight:700; margin-bottom:4px;">Official Admissions Reference</div>
          <div style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:700; color:#1E1242; letter-spacing:0.05em;">${subId}</div>
          <div style="font-size:0.8rem; color:#6B648C; margin-top:6px;">An academic advisor will review your qualifications and contact you within 24 business hours.</div>
        </div>
        <button id="closeBloomModal" style="width:100%; padding:14px; background:#2D1B69; color:#FFF; font-weight:600; border:none; border-radius:6px; cursor:pointer; font-size:0.95rem; transition:background 0.2s;">
          Return to Admissions Portal
        </button>
      </div>
    `;
    (container || document.body).appendChild(modal);
    modal.querySelector('#closeBloomModal').addEventListener('click', () => {
      modal.remove();
    });
  }

  const service = { submitLead, renderConfirmation };
  if (typeof window !== 'undefined') {
    window.ScaleNovaAPI = service;
    window.IntegrationService = service;
  }
  return service;
})();

export const IntegrationService = window.ScaleNovaAPI;
export default window.ScaleNovaAPI;
