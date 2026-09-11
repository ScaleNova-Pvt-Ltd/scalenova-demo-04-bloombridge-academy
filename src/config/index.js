window.DEMO_CONFIG = {
  demoId: 'DEMO-04',
  industry: 'Education & Training',
  clientName: 'Bloombridge Academy',
  appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec'
};

/**
 * ScaleNova EliteOS — Demo 04: Bloombridge Academy Configuration
 */

export const APP_CONFIG = {
  demoId: 'DEMO-04',
  industry: 'Education & Professional Training',
  companyName: 'Bloombridge Academy of Advanced Technology & Leadership',
  tagline: 'Empowering Next-Generation Enterprise Leaders & Engineers',
  targetSheet: 'Demo4_Education',
  leadPrefix: 'SN-BLO-',
  
  // Public Gateway URL (Shared ScaleNova Google Apps Script Web App)
  submitUrl: window.__SCALENOVA_CONFIG__?.appsScriptUrl || 
             'https://script.google.com/macros/s/DEMO_ENDPOINT_ID_REPLACE_IN_PRODUCTION/exec',
  
  // Demo Fallback / Simulation Settings
  simulationMode: true,
  
  contactDetails: {
    campusBengaluru: 'Tech Corridor Phase 1, Electronic City, Bangalore, Karnataka 560100',
    campusNCR: 'CyberCity Hub 4, DLF Phase II, Gurugram, Haryana 122002',
    campusSingapore: 'Marina One Tower, Marina Way, Singapore 018936',
    phone: '+91 (80) 6199-5500',
    admissionsEmail: 'admissions@bloombridge.demo'
  }
};
