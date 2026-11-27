
document.addEventListener("DOMContentLoaded", function() {
    console.log("Welcome to PetKart!");

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function() {
            console.log("PetKart button clicked");
        });
    });
});
