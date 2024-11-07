document.addEventListener("DOMContentLoaded", () => {
  // Ticker (Date & Time)
  function updateTicker() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const dateTimeString = now.toLocaleString("en-US", options);
    const tickerElement = document.getElementById("ticker");

    // Location
    const locationPart = tickerElement.dataset.location || "";
    tickerElement.innerHTML = `<i class="fa-regular fa-clock"></i> ${dateTimeString}${
      locationPart
        ? " | <i class='fa-solid fa-location-dot'></i> " + locationPart
        : ""
    }`;
  }

  // Function to get and display location
  function updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "984be4b0628744348386e9cdba278040"; 
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                const components = data.results[0].components;
                const city =
                  components.city ||
                  components.town ||
                  components.village ||
                  "Unknown city";
                const country = components.country || "Unknown country";
                const location = `${city}, ${country}`;
                const tickerElement = document.getElementById("ticker");
                tickerElement.dataset.location = location;
                updateTicker();
              } else {
                document.getElementById("ticker").innerText +=
                  " | Location: Unavailable";
              }
            })
            .catch((error) => {
              console.error("Error getting location:", error);
              document.getElementById("ticker").innerText +=
                " | Location: Unavailable";
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          document.getElementById("ticker").innerText +=
            " | Location: Unavailable";
        }
      );
    } else {
      document.getElementById("ticker").innerText += " | Location: Unavailable";
    }
  }
  setInterval(updateTicker, 1000);
  updateTicker();
  updateLocation();

  // visitor Counter
  const counterElement = document.getElementById("visitor-counter");
  let count = localStorage.getItem("page_view");

  if (count === null) {
    count = 0;
  } else {
    count = parseInt(count, 10);
  }
  count += 1;
  localStorage.setItem("page_view", count);
  counterElement.innerText = `Visitors: ${count}`;

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

// Load the default to home page on load or refresh
document.addEventListener("DOMContentLoaded", () => {
  const lastPage = sessionStorage.getItem("lastPage") || "home.html";
  loadContent(lastPage);
});
// On refresh page load from zero scroll
function loadContent(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-content").innerHTML = data;
      window.scrollTo(0, 0);
      // Save current page to sessionStorage
      sessionStorage.setItem("lastPage", page);
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Float Tab Advertisement Sign
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
// Close the menu when clicking outside of it
document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const floatingImage = document.querySelector(".floating-image");
  if (!menu.contains(event.target) && !floatingImage.contains(event.target)) {
    menu.style.display = "none";
  }
});
// Prevent the menu from closing when clicking inside it
document.getElementById("menu").addEventListener("click", function (event) {
  event.stopPropagation();
});
// Tilt the image right and left
setInterval(() => {
  const image = document.querySelector(".floating-image");
  image.style.transform = "rotate(10deg)";
  setTimeout(() => {
    image.style.transform = "rotate(-10deg)";
    setTimeout(() => {
      image.style.transform = "rotate(0deg)";
    }, 100);
  }, 100);
}, 2000);

// Get (links) pages data to main page
function loadContent(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-content").innerHTML = data;
      window.scrollTo(0, 0);
      // Save current page to sessionStorage
      sessionStorage.setItem("lastPage", page);
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Feedback Form
document
  .querySelector("#feedback form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Capture form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const subscribe = document.getElementById("exampleCheck1").checked;
    // Form data object to display in console
    const formData = {
      name: name,
      email: email,
      message: message,
      subscribe: subscribe,
    };
    // Display captured form data in the console (for testing)
    console.log("Form Submitted:", formData);
    // Reset form after submission
    document.querySelector("#feedback form").reset();
    // Optional: Show a thank-you message or confirmation popup
    alert("Thank you for your feedback!");
    // Future implementation: Send form data to a server or an email service here
  });
  
  


  
  