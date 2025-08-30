
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
const lendBtn = document.getElementById("lendBtn");
const signInBtn = document.getElementById("signInBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtns = document.querySelectorAll("#closeModal"); 
const borrowForm = document.querySelector(".borrow");
const lendForm = document.querySelector(".lend");
const accountForm = document.querySelector(".account");

// when user clicks borrow button
borrowBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  borrowForm.style.display = "grid";
  lendForm.style.display = "none";
});

// when user clicks lend button
lendBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  lendForm.style.display = "grid";
  borrowForm.style.display = "none";
});

signInBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";  
  accountForm.style.display = "grid";
});

// when user clicks close button
closeModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    borrowForm.style.display = "none";
    lendForm.style.display = "none";
    accountForm.style.display = "none";
  });
});

//--------------------------------------------for sign in page----------------------------------------------------------
function switchToSignup() {
    switchTab('signup');
}
function switchToLogin() {
    switchTab('login');
}
function switchTab(tab) {
    const loginPanel = document.getElementById('login-panel');
    const signupPanel = document.getElementById('signup-panel');
    if (tab === 'login') {
        loginPanel.classList.add('active');
        loginPanel.style.display = 'block';

        signupPanel.classList.remove('active');
        signupPanel.style.display = 'none';
    } else if (tab === 'signup') {
        signupPanel.classList.add('active');
        signupPanel.style.display = 'block';

        loginPanel.classList.remove('active');
        loginPanel.style.display = 'none';
    }
}
// Form submission handlers
function initializeForms() {
    // Login form handler
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields!');
            return;
        }
        // Simulate login process
        showSuccess(`Welcome back! You've successfully logged in as ${email}`);
    });

    // Signup form handler
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields!');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        if (!termsAccepted) {
            alert('Please accept the Terms of Service and Privacy Policy!');
            return;
        }
        // Simulate account creation
        showSuccess(`Account created successfully! Welcome ${name}! A confirmation email has been sent to ${email}`);
    });
}


// ---------------------------- How to User AssetPilot Section (carousel) --------------------------------------
class AssetPilotCarousel {
  constructor() {
    this.currentIndex = 0;
    this.totalScreenshots = 6;

    this.container = document.getElementById("screenshotsContainer");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dotsIndicator = document.getElementById("dotsIndicator");

    if (this.container && this.prevBtn && this.nextBtn && this.dotsIndicator) {
      this.init();
    } else {
      console.error("Errror! Required elements not found");
    }
  }

  init() {
    console.log("AssetPilot Carousel initialized");

    this.prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPrevious();
    });

    this.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToNext();
    });

    this.dotsIndicator.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        e.preventDefault();
        const index = parseInt(e.target.dataset.index);
        this.goToSlide(index);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.goToPrevious();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        this.goToNext();
      }
    });

    this.addTouchSupport();
    this.updateCarousel(); // ensures correct step is shown on load
  }

  goToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.totalScreenshots;
    this.updateCarousel();
  }

  goToPrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalScreenshots) % this.totalScreenshots;
    this.updateCarousel();
  }

  goToSlide(index) {
    if (index >= 0 && index < this.totalScreenshots) {
      this.currentIndex = index;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const translateX = -this.currentIndex * 100;
    if (this.container) {
      this.container.style.transform = `translateX(${translateX}%)`;
    }

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });

    // Show only the current step heading
    document.querySelectorAll(".tutorial-steps h3").forEach((step, index) => {
      step.style.display = index === this.currentIndex ? "block" : "none";
    });
  }

  addTouchSupport() {
    if (!this.container) return;

    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchend",
      (e) => {
        endX = e.changedTouches[0].clientX;
        const swipeDistance = Math.abs(endX - startX);

        if (swipeDistance > minSwipeDistance) {
          if (endX < startX) {
            this.goToNext();
          } else {
            this.goToPrevious();
          }
        }
      },
      { passive: true }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("screenshotsContainer")) {
      window.assetPilotCarousel = new AssetPilotCarousel();
    }
  }, 100);
});
