/**
 * HOST: script.google.com
 * 
 * Instructions:
 * 1. Create a new Google Apps Script.
 * 2. Paste this code entirely.
 * 3. Save the project.
 * 4. Click "Deploy" -> "New deployment".
 * 5. Select type: "Web app".
 * 6. Description: "Booking Webhook".
 * 7. Execute as: "Me" (your account).
 * 8. Who has access: "Anyone" (IMPORTANT for the website to work).
 * 9. Click "Deploy" and copy the "Web App URL".
 */

function doPost(e) {
    try {
        // 1. Parse the incoming JSON booking data
        var data = JSON.parse(e.postData.contents);

        var serviceName = data.service_name || "Reflexology Session";
        var customerName = data.customer_name || "Guest";
        var customerPhone = data.customer_phone || "";
        var customerEmail = data.customer_email || "";
        var customerNote = data.customer_note || "";
        var dateStr = data.date; // Format expected: YYYY-MM-DD
        var timeStr = data.time; // Format expected: HH:MM (24h)
        var durationMins = parseInt(data.duration) || 60;

        // 2. Validate essential data
        if (!dateStr || !timeStr) {
            return ContentService.createTextOutput(JSON.stringify({
                status: "error",
                message: "Missing date or time"
            })).setMimeType(ContentService.MimeType.JSON);
        }

        // 3. Create Date objects for Start and End time
        // Note: 'dateStr' should be YYYY-MM-DD, e.g., "2023-10-27"
        // 'timeStr' should be HH:MM, e.g., "14:30"
        var startDateTime = new Date(dateStr + 'T' + timeStr + ':00');
        var endDateTime = new Date(startDateTime.getTime() + (durationMins * 60 * 1000));

        // 4. Create the Calendar Event
        // Using the "primary" calendar of the account running the script
        var cal = CalendarApp.getDefaultCalendar();

        var title = "Booking: " + serviceName + " - " + customerName;
        var description = "Customer: " + customerName + "\n" +
            "Phone: " + customerPhone + "\n" +
            "Email: " + customerEmail + "\n" +
            "Note: " + customerNote + "\n\n" +
            "Booked via Website";

        cal.createEvent(title, startDateTime, endDateTime, {
            description: description,
            location: "Happy Feet Reflexology, 2521 B South Rd, Poughkeepsie, NY 12601"
        });

        // 5. Return Success Response
        return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "Booking added to calendar"
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        // Handle Errors
        return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: err.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Handle CORS preflight requests (optional but good practice)
function doGet(e) {
    return ContentService.createTextOutput("Webhook is active. Please use POST method.");
}
