/**
 * Utility to forward enquiries from Express backend to Google Sheets Apps Script Web App
 */
const sendToGoogleSheets = async (enquiryData) => {
  const url =
    process.env.GOOGLE_SHEETS_URL ||
    'https://script.google.com/macros/s/AKfycbwSaegiA-z0F-WhiZET5jv8syYrMEpYVcnyrX8oBShmZ3wog3OuosATOdGX-0PH1rNifw/exec';
  if (!url) {
    return { success: false, reason: 'GOOGLE_SHEETS_URL is not configured in server .env' };
  }

  try {
    const firstName = enquiryData.firstName || (enquiryData.name ? enquiryData.name.split(' ')[0] : '');
    const lastName = enquiryData.lastName || (enquiryData.name ? enquiryData.name.split(' ').slice(1).join(' ') : '');
    const fullName = enquiryData.name || `${firstName} ${lastName}`.trim();

    const payload = {
      firstName,
      lastName,
      name: fullName,
      email: enquiryData.email || '',
      phone: enquiryData.phone || '',
      projectType: enquiryData.projectType || 'Wooden Home',
      message: enquiryData.message || '',
      location: enquiryData.location || '',
      estimatedBudget: enquiryData.estimatedBudget || '',
      submittedAt: new Date().toISOString(),
      source: enquiryData.source || 'Make My Cottage - Server API'
    };

    const params = new URLSearchParams();
    Object.keys(payload).forEach((k) => params.append(k, payload[k]));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      console.warn(`[GoogleSheets Backend] HTTP error: ${response.status} ${response.statusText}`);
      return { success: false, status: response.status };
    }

    const result = await response.json().catch(() => ({}));
    console.log('[GoogleSheets Backend] Successfully forwarded enquiry to Google Sheets:', result);
    return { success: true, result };
  } catch (error) {
    console.error('[GoogleSheets Backend] Forward error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendToGoogleSheets
};
