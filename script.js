
console.log("Welcome to Lauren Carrington!");

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(event) {

        const name = document.querySelector(
            'input[name="name"]'
        ).value.trim();

        const message = document.querySelector(
            'textarea[name="message"]'
        ).value.trim();

        if (name === "" || message === "") {
            event.preventDefault();
            alert("Please fill all required fields.");
        }
    });
}
