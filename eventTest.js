async function addEvent() {
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const location = document.getElementById("eventLocation").value;
    const image = document.getElementById("eventImage").value;
    const tags = document.getElementById("eventTags").value.split(",");

    if (!title || !date || !location || !image) {
        alert("Please fill all fields!");
        return;
    }

    const newEvent = { title, date, location, image, tags };

    try {
        const response = await fetch("http://localhost:5000/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });

        if (response.ok) {
            alert("Event added successfully!");
        } else {
            alert("Error adding event.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
