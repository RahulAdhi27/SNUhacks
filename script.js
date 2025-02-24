document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    let currentIndex = 0;
    slides[currentIndex].classList.add('active'); // Show first slide

    function updateSlide(newIndex) {
        slides[currentIndex].classList.remove('active'); // Hide current slide
        currentIndex = newIndex;
        slides[currentIndex].classList.add('active'); // Show new slide
        console.log('Current index:', currentIndex);
    }

    nextButton.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % slides.length;
        updateSlide(newIndex);
    });

    prevButton.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(newIndex);
    });
});

let lastScrollPosition = 0;
const footer = document.querySelector('.Footer');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    
    // Show footer when scrolling down
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        footer.style.bottom = '0';
    } 
    // Hide footer when at top
    else if (currentScrollPosition < 100) {
        footer.style.bottom = '-100px';
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Remove the hardcoded events array and replace with fetched data
let events = []; // Will be populated from the database

// Function to fetch events from the database
async function fetchEvents() {
    try {
        const response = await fetch("http://localhost:5000/events");
        events = await response.json();
        
        // After fetching events, initialize the page
        createFilterTags();
        displayEvents(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        const eventsGrid = document.querySelector('.events-grid');
        eventsGrid.innerHTML = "<p>Error loading events. Please try again later.</p>";
    }
}

// Function to get unique tags from all events
function getUniqueTags() {
    const allTags = events.reduce((tags, event) => [...tags, ...event.tags], []);
    return [...new Set(allTags)].sort();
}

// Function to create filter tags
function createFilterTags() {
    const filterContainer = document.querySelector('.filter-tags');
    const uniqueTags = getUniqueTags();
    
    filterContainer.innerHTML = uniqueTags.map(tag => `
        <div class="tag filter-tag" data-tag="${tag}">
            ${tag}
            <span class="tag-count">(${events.filter(event => event.tags.includes(tag)).length})</span>
        </div>
    `).join('');

    // Add click handlers to filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            filterEvents();
        });
    });
}

// Function to filter events based on selected tags
function filterEvents() {
    const selectedTags = Array.from(document.querySelectorAll('.filter-tag.active'))
        .map(tag => tag.dataset.tag);
    
    const filteredEvents = selectedTags.length === 0 ? events : events.filter(event => 
        selectedTags.some(tag => event.tags.includes(tag))
    );
    
    displayEvents(filteredEvents);
}

// Function to create event cards
function createEventCard(event) {
    return `
        <div class="event-card" onclick="window.location.href='/event-details.html?id=${event.id}'">
            <img src="${event.image}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p class="event-date">Date: ${event.date}</p>
                <p class="event-location">Location: ${event.location}</p>
                <div class="event-tags">
                    ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Function to display events
function displayEvents(events) {
    const eventsGrid = document.querySelector('.events-grid');
    eventsGrid.innerHTML = events.map(event => createEventCard(event)).join('');
}

// Update the initialization code
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents(); // Replace the direct calls to createFilterTags and displayEvents
});
