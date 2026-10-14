# Google Sheets Integration Guide for Make My Cottage

This integration connects the website's Contact & Inquiry form directly to a Google Sheet, so all submissions from the website are instantly logged.

---

## 📋 Information Recorded in Google Sheet

Every submission automatically logs:
1. **Timestamp** (Formatted in IST: `dd/MM/yyyy, hh:mm:ss a`)
2. **First Name**
3. **Last Name**
4. **Phone Number**
5. **Email Address**
6. **Project Type** (e.g. *Wooden Home*, *Farmhouse Retreat*, *Turnkey Wooden Cottage*, *Prefabricated Wooden Home*, *Resort Cottage Architecture*, *Custom Timber Structure*)
7. **Project Details / Message**
8. **Location**
9. **Estimated Budget**
10. **Source** (e.g. *Make My Cottage - Contact Form*)
11. **Status** (*New*)

---

## 🚀 3-Minute Setup Instructions

### Step 1: Create a Google Sheet
1. Open [sheets.new](https://sheets.new) in your browser.
2. Name the sheet: **Make My Cottage - Enquiries**.

### Step 2: Open Google Apps Script
1. In your Google Sheet, click **Extensions** in the top navigation bar.
2. Select **Apps Script**.
3. A new tab will open with a code editor (`Code.gs`).

### Step 3: Paste the Code
1. Delete everything inside the editor.
2. Open [`google-sheets-integration/GoogleAppsScript.js`](./GoogleAppsScript.js) from this repository.
3. Copy all the code and paste it into the Apps Script editor.
4. Click the **Save** icon (💾) or press `Ctrl + S`.

### Step 4: Deploy as Web App
1. Click the blue **Deploy** button at the top-right corner.
2. Select **New deployment**.
3. Click the gear icon (**⚙️**) next to "Select type" and choose **Web app**.
4. Configure the settings:
   - **Description**: `Make My Cottage Enquiry Sync`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: must be "Anyone" so visitors can send inquiries)*
5. Click **Deploy**.
6. If Google displays an authorization window:
   - Click **Authorize access**
   - Choose your Google Account
   - Click **Advanced** (bottom left of dialog)
   - Click **Go to Untitled project (unsafe)**
   - Click **Allow**
7. Copy the **Web app URL** that appears (starts with `https://script.google.com/macros/s/...`).

### Step 5: Add the URL to `.env`
Open `client/.env` and paste your copied URL:
```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

And in `server/.env`:
```env
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## ✅ Testing the Integration

1. Go to your local website at `http://localhost:9000/contact`.
2. Fill out the contact form and submit.
3. Check your Google Sheet — the header row and your new lead will appear instantly!
