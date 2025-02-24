// Function to fetch and display all events
async function fetchEvents() {
    try {
        const response = await fetch("http://localhost:5000/events");
        const events = await response.json();
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = ""; // Clear previous data

        if (events.length === 0) {
            eventList.innerHTML = "<p>No events available.</p>";
            return;
        }

        events.forEach(event => {
            const eventItem = document.createElement("div");
            eventItem.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Tags:</strong> ${event.tags.join(", ")}</p>
                <img src="${event.image}" alt="Event Image" width="150">
                <hr>
            `;
            eventList.appendChild(eventItem);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Load events on page load
document.addEventListener("DOMContentLoaded", fetchEvents);
