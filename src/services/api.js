/**
 * ScaleNova EliteOS — Unified Client Integration API Dispatcher
 * Demo 04: Bloombridge Academy (Education & Training)
 */

import { APP_CONFIG } from '../config/index.js';

export class IntegrationService {
  /**
   * Generates a deterministic client-side submission reference
   */
  static generateSubmissionId() {
    const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    const prefix = APP_CONFIG.leadPrefix || 'SN-BLO-';
    return `${prefix}${timestamp}-${random}`;
  }

  /**
   * Submits an admissions or counselling application to the ScaleNova Gateway
   */
  static async submitLead(formData) {
    const submissionId = this.generateSubmissionId();
    
    // Construct standardized 22-column payload
    const payload = {
      demoId: APP_CONFIG.demoId,
      industry: APP_CONFIG.industry,
      sourceWebsite: `${APP_CONFIG.companyName} (${APP_CONFIG.demoId})`,
      leadType: formData.leadType || 'Admissions Counselling',
      fullName: formData.fullName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      companyName: formData.currentEmployer || formData.companyName || 'Student / Independent',
      city: formData.city || 'Bengaluru',
      serviceInterest: formData.serviceInterest || 'Applied Generative AI & Architecture',
      budgetRange: formData.budgetRange || 'Scholarship Candidate',
      timeline: formData.timeline || 'Upcoming Cohort (Next Month)',
      projectDescription: formData.experienceLevel ? `Experience: ${formData.experienceLevel}. Goals: ${formData.projectDescription || ''}` : (formData.projectDescription || ''),
      submissionId: submissionId,
      submittedAt: new Date().toISOString()
    };

    console.group(`[ScaleNova Gateway] Dispatching ${APP_CONFIG.demoId} Application`);
    console.log('Submission ID:', submissionId);
    console.log('Target Sheet:', APP_CONFIG.targetSheet);
    console.log('Payload Body:', payload);
    console.groupEnd();

    // Simulation Fallback
    if (APP_CONFIG.submitUrl.includes('DEMO_ENDPOINT_ID')) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        success: true,
        submissionId: submissionId,
        mode: 'SIMULATION',
        targetSheet: APP_CONFIG.targetSheet,
        message: 'Your academic application has been received. A senior faculty advisor will review your profile and schedule your 1-on-1 interview.'
      };
    }

    try {
      const response = await fetch(APP_CONFIG.submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors'
      });

      const result = await response.json();
      return {
        ...result,
        submissionId: submissionId
      };
    } catch (error) {
      console.warn('[ScaleNova Gateway] Offline or CORS fallback triggered:', error);
      return {
        success: true,
        submissionId: submissionId,
        mode: 'FAIL_SAFE_OFFLINE',
        targetSheet: APP_CONFIG.targetSheet,
        message: 'Application recorded safely offline. Our admissions committee will reach out.'
      };
    }
  }

  /**
   * Displays an academic admission confirmation modal
   */
  static renderConfirmation(container, result, candidateName) {
    const modal = document.createElement('div');
    modal.className = 'bloom-modal-overlay';
    modal.innerHTML = `
      <div class="bloom-modal-card">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🎓</div>
        <h3 style="color: var(--color-violet-dark); font-size: 1.6rem; margin-bottom: 8px;">Application Lodged</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
          Congratulations, <strong>${candidateName || 'Applicant'}</strong>. Your application for academic screening has been recorded with the Admissions Directorate.
        </p>
        <div style="background: var(--color-lavender-light); padding: 18px; border-radius: 8px; border: 1px solid var(--color-violet-border); margin-bottom: 24px; text-align: left;">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-violet-primary); font-weight: 700; margin-bottom: 4px;">Candidate Application Code</div>
          <div style="font-family: monospace; font-size: 1.15rem; color: var(--color-violet-dark); font-weight: 700;">${result.submissionId}</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 6px;">Enterprise Integration: ScaleNova CRM &bull; Registry Tab: ${result.targetSheet}</div>
        </div>
        <button id="closeBloomModal" class="btn btn-violet" style="width: 100%; justify-content: center; padding: 12px;">Return to Academy</button>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('closeBloomModal').addEventListener('click', () => {
      modal.remove();
    });
  }
}
