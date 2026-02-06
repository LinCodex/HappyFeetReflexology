/**
 * HOST: script.google.com
 * 
 * Instructions:
 * 1. Open your existing script.
 * 2. Overwrite ALL code with this new version.
 * 3. Save.
 * 4. Click "Deploy" -> "Manage deployments".
 * 5. Click the "Edit" (pencil) icon next to your active deployment.
 * 6. "Version": Select "New version". (CRITICAL STEP!)
 * 7. Click "Deploy".
 */

function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);

        var serviceName = data.service_name || "Reflexology";
        var customerName = data.customer_name || "Guest";
        var customerNote = data.customer_note || "None";
        var dateStr = data.date; // YYYY-MM-DD
        var timeStr = data.time; // HH:MM
        var duration = data.duration || "60";

        // --- TITLE: [Name] - [Date] [Time] ---
        // Example: "John Doe - 2023-10-27 14:30"
        var title = customerName + " - " + dateStr + " " + timeStr;

        // --- NOTES ---
        var description = "Reservation Time: " + timeStr + "\n" +
            "Service: " + serviceName + "\n" +
            "Length: " + duration + "\n" +
            "Phone: " + (data.customer_phone || "") + "\n" +
            "Email: " + (data.customer_email || "") + "\n" +
            "Note: " + customerNote;

        // --- DATE (All Day) ---
        var parts = dateStr.split('-');
        // Month is 0-indexed in JS Date
        var bookingDate = new Date(parts[0], parts[1] - 1, parts[2]);

        var cal = CalendarApp.getDefaultCalendar();

        // Create All Day Event
        var event = cal.createAllDayEvent(title, bookingDate, {
            description: description,
            location: "Happy Feet Reflexology"
        });

        // --- COLOR: Flamingo (ID "4") ---
        // "4" corresponds to the visible name "Flamingo" in Google Calendar UI.
        event.setColor("4");

        return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        // Return error as success to avoid crashing the client, but log it effectively if possible
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
    }
}
