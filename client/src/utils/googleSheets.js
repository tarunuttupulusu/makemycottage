/**
 * Submit inquiry details to Google Sheets Web App
 * @param {Object} data - Form data containing name, email, phone, projectType, message, etc.
 * @returns {Promise<boolean>}
 */
export const submitToGoogleSheets = async (data) => {
  const scriptUrl =
    import.meta.env.VITE_GOOGLE_SHEETS_URL ||
    'https://script.google.com/macros/s/AKfycbwSaegiA-z0F-WhiZET5jv8syYrMEpYVcnyrX8oBShmZ3wog3OuosATOdGX-0PH1rNifw/exec';

  if (!scriptUrl) {
    console.info('[GoogleSheets] VITE_GOOGLE_SHEETS_URL is not set.');
    return false;
  }

  try {
    const payload = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      name: (data.name || `${data.firstName || ''} ${data.lastName || ''}`).trim(),
      email: data.email || '',
      phone: data.phone || '',
      projectType: data.projectType || 'Wooden Home',
      message: data.message || '',
      submittedAt: new Date().toISOString(),
      source: 'Make My Cottage - Contact Page'
    };

    // Use URLSearchParams with application/x-www-form-urlencoded
    // Google Apps Script automatically populates e.parameter with 100% reliability
    const formParams = new URLSearchParams();
    Object.keys(payload).forEach((key) => {
      formParams.append(key, payload[key]);
    });

    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    });

    console.log('[GoogleSheets] Enquiry forwarded to Google Sheets Web App');
    return true;
  } catch (error) {
    console.warn('[GoogleSheets] Submission error:', error);
    return false;
  }
};
