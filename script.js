
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.src = icon.dataset.gif;
    });
    icon.addEventListener('mouseleave', () => {
        icon.src = icon.dataset.static;
    });
});

const borrowBtn = document.getElementById("borrowBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

borrowBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});
