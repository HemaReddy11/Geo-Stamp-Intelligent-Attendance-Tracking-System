# Geo-Stamp-Intelligent-Attendance-Tracking-System

This project is a simple attendance tracking system built using Google Sheets and Google Apps Script. It allows users to log their login and logout times through an HTML form. The form sends data to a Google Sheets backend, which records timestamps based on user actions.

## 📌 Features
- HTML form to submit user login/logout.
- Google Apps Script backend to handle and store data in Google Sheets.
- Automatic timestamping for login and logout events.
- Identifies users based on email and stores their details accordingly.

## 🧩 Tech Stack

- Frontend: HTML/CSS (simple form UI)
- Backend: Google Apps Script (serverless, runs inside Google Sheets)
- Database: Google Sheets


## ⚙️ How it Works

1. HTML Form:
   - Users enter their details and click either "Login" or "Logout".
  - The form submits the data as a POST request to the Apps Script web app URL.

2. Google Apps Script:
   - The backend script listens for the POST request.
   - It checks if the event is "login" or "logout".
   - For "login":
     - A new row is added in the sheet with the user's email, login time, and current date.
   - For "logout":
     - It searches for the user's last login entry by email and fills in the logout time.

3. Google Sheet:
   - Stores all the user data with columns like: Name, Email, Date, Login, Logout.

## 🚀 Deployment Instructions

1. Create a new Google Sheet and open Apps Script Editor (`Extensions > Apps Script`).
2. Copy the contents of `Code.gs` into the script editor.
3. Set up the sheet with the appropriate headers: `Name | Email | Date | Login | Logout`.
4. Deploy as a Web App (`Deploy > Manage Deployments > New Deployment`):
   - Set `Execute as`: Me
   - Set `Who has access`: Anyone
   - Copy the Web App URL.
5. In your HTML file (`index.html`), set the form's action to the above URL.
6. Open `index.html` in a browser and test the form.

## ✅ Example Sheet Layout

| Name     | Email           | Date       | Login   | Logout  |
|----------|-----------------|------------|---------|---------|
| Ram      | ram@email.com   | 25/04/2025 | 09:00:01| 17:02:15|

## 🧠 Notes

- The script uses Google Apps Script's LockService to prevent concurrent edits.
- Date and time are formatted to `DD/MM/YYYY` and `HH:MM:SS` respectively.
- Email is used as a unique identifier to update logout time correctly.




