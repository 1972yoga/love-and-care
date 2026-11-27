
// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
}

// CLOSE MENU AFTER CLICKING A LINK

if (navMenu) {
    navMenu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            navMenu.classList.remove("show");
        });
    });
}

// GALLERY FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(function(item) {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});

// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            event.preventDefault();
            alert("Please fill in all required fields.");
        }

    });

}

// CONTACT FORM STATUS MESSAGE

const formMessage = document.getElementById("formMessage");

if (formMessage) {

    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status === "success") {
        formMessage.textContent =
            "Your message has been sent successfully!";

        formMessage.classList.add("success");
    }

    if (status === "error") {
        formMessage.textContent =
            "Unable to send your message. Please check your details and try again.";

        formMessage.classList.add("error");
    }

}
