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

        // --- TITLE: [Name] [Time] ---
        var title = customerName + " - " + timeStr;

        // --- NOTES ---
        var description = "Reservation Time: " + timeStr + "\n" +
            "Service: " + serviceName + "\n" +
            "Length: " + duration + "\n" +
            "Phone: " + (data.customer_phone || "") + "\n" +
            "Email: " + (data.customer_email || "") + "\n" +
            "Note: " + customerNote;

        // --- DATE (All Day) ---
        // Creating date object in local script timezone
        // new Date("YYYY-MM-DD") creates UTC, which might show as previous day in PST.
        // robust parsing:
        var parts = dateStr.split('-');
        var bookingDate = new Date(parts[0], parts[1] - 1, parts[2]);

        var cal = CalendarApp.getDefaultCalendar();

        // Create All Day Event
        var event = cal.createAllDayEvent(title, bookingDate, {
            description: description,
            location: "Happy Feet Reflexology"
        });

        // --- COLOR: Flamingo ---
        event.setColor(CalendarApp.EventColor.FLAMINGO);

        return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
    }
}
