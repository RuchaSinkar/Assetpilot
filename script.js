
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
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtns = document.querySelectorAll("#closeModal"); 
const borrowForm = document.querySelector(".borrow");
const lendForm = document.querySelector(".lend");

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

// when user clicks close button
closeModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    borrowForm.style.display = "none";
    lendForm.style.display = "none";
  });
});



// How to User AssetPilot Section (carousel)
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
      console.error("AssetPilot Carousel: Required elements not found");
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
    this.updateCarousel();
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
