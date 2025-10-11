const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

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
const closeModalBtns = document.querySelectorAll(".closeModal");
const borrowForm = document.querySelector(".borrow");
const lendForm = document.querySelector(".lend");

if (borrowBtn && lendBtn && modalOverlay && closeModalBtns) {
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
}

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
    if (loginPanel) {
      loginPanel.classList.add('active');
      loginPanel.style.display = 'block';
    }
    if (signupPanel) {
      signupPanel.classList.remove('active');
      signupPanel.style.display = 'none';
    }
  } else if (tab === 'signup') {
    if (signupPanel) {
      signupPanel.classList.add('active');
      signupPanel.style.display = 'block';
    }
    if (loginPanel) {
      loginPanel.classList.remove('active');
      loginPanel.style.display = 'none';
    }
  }
}

// Form submission handlers
function initializeForms() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      if (!email || !password) {
        alert('Please fill in all fields!');
        return;
      }
      alert(`Welcome back! You've successfully logged in as ${email}`);
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const termsAccepted = document.querySelector('.terms').checked;
      if (!name || !email || !password) {
        alert('Please fill in all fields!');
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
      alert(`Account created successfully! Welcome ${name}! A confirmation email has been sent to ${email}`);
    });
  }
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
    }
  }

  init() {
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
    this.currentIndex = (this.currentIndex - 1 + this.totalScreenshots) % this.totalScreenshots;
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

    document.querySelectorAll(".tutorial-steps h3").forEach((step, index) => {
      step.style.display = index === this.currentIndex ? "block" : "none";
    });
  }

  addTouchSupport() {
    if (!this.container) return;
    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;

    this.container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, {
      passive: true
    });

    this.container.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const swipeDistance = Math.abs(endX - startX);
      if (swipeDistance > minSwipeDistance) {
        if (endX < startX) {
          this.goToNext();
        } else {
          this.goToPrevious();
        }
      }
    }, {
      passive: true
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("screenshotsContainer")) {
    window.assetPilotCarousel = new AssetPilotCarousel();
  }
  initializeForms();
});




/*------------------------------------------------------ */
 document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("transactionContainer");
    const viewMoreBtn = document.querySelector(".view-more");

    const borrowForm = document.querySelector(".borrow"); // Borrow form
    const lendForm = document.querySelector(".lend"); // Lend form

    // Calculate days left
    function calcDaysLeft(deadline) {
        const now = new Date();
        const due = new Date(deadline);
        const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
        return diff >= 0 ? diff : 0;
    }

    // Render transactions in the dashboard
    function renderTransactions(data) {
    container.innerHTML = ""; // clear old entries
    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("transaction", item.type === "borrowed" ? "borrowed" : "lent");
        div.innerHTML = `
            <span class="dot ${item.type === "borrowed" ? "red" : "green"}"></span>
            <span class="amount">₹${item.amount} - <b>${item.assetType}</b></span>
            <span class="detail">${item.type === "borrowed" ? "Borrowed from " + item.person : "Lent to " + item.person}</span>
            <span class="due">Due ${item.deadline} <small>${calcDaysLeft(item.deadline)} days left</small></span>
            <button class="mark-returned" data-index="${index}">&#x2714;</button>
        `;
        container.appendChild(div);
    });

    // Add event listeners for all “Mark as Returned” buttons
    const buttons = container.querySelectorAll(".mark-returned");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            markAsReturned(parseInt(btn.dataset.index));
        });
    });
}

function markAsReturned(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let history = JSON.parse(localStorage.getItem("history")) || [];

    // Remove the transaction from active list
    const [completed] = transactions.splice(index, 1);

    // Add it to history
    history.push(completed);

    // Save both back to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("history", JSON.stringify(history));

    // Re-render transactions and update dashboard cards
    renderTransactions(transactions);
    updateFlashcards(); // This is your function for total lent/borrowed/pending
    updateCharts(JSON.parse(localStorage.getItem("transactions")) || []);
  }



    // --- Handle Borrow Form Submission ---
    if (borrowForm) {
        borrowForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const borrowAmount = borrowForm.querySelector(".amount-borrow").value;
            const borrowAsset = borrowForm.querySelector(".assetType").value;
            const borrowFrom = borrowForm.querySelector(".borrowedFrom").value;
            const borrowDeadline = borrowForm.querySelector(".deadline").value;

            const newTransaction = {
                type: "borrowed",
                amount: borrowAmount,
                assetType: borrowAsset,
                person: borrowFrom,
                deadline: borrowDeadline
            };

            const existing = JSON.parse(localStorage.getItem("transactions")) || [];
            existing.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(existing));
            
            alert("Borrow transaction added successfully!");
            updateFlashcards();
            updateCharts(JSON.parse(localStorage.getItem("transactions")) || []);
            borrowForm.reset();
        });
    }

    // --- Handle Lend Form Submission ---
    if (lendForm) {
        lendForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const lendAmount = lendForm.querySelector(".amount-lend").value;
            const lendAsset = lendForm.querySelector(".assetType").value;
            const lendTo = lendForm.querySelector(".LentTo").value;
            const lendDeadline = lendForm.querySelector(".deadline").value;

            const newTransaction = {
                type: "lent",
                amount: lendAmount,
                assetType: lendAsset,
                person: lendTo,
                deadline: lendDeadline
            };

            const existing = JSON.parse(localStorage.getItem("transactions")) || [];
            existing.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(existing));
            
            alert("Lend transaction added successfully!");
            updateFlashcards();
            updateCharts(JSON.parse(localStorage.getItem("transactions")) || []);
            lendForm.reset();
        });
    }

    // --- View More Button ---
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener("click", function () {
            const storedData = JSON.parse(localStorage.getItem("transactions")) || [];
            if (storedData.length > 0) {
                renderTransactions(storedData);
                viewMoreBtn.textContent = "Hide";
                viewMoreBtn.onclick = () => {
                    container.innerHTML = "";
                    viewMoreBtn.textContent = "View More";
                };
            } else {
                alert("No more transactions to show yet!");
            }
        });
        updateFlashcards();
        updateCharts(JSON.parse(localStorage.getItem("transactions")) || []);
    }

    function updateFlashcards() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalLent = 0, totalBorrowed = 0, pendingReturns = 0;
    
    transactions.forEach(item => {
        if(item.type === "lent") totalLent += Number(item.amount);
        if(item.type === "borrowed") totalBorrowed += Number(item.amount);
    });

    // You can also calculate pending returns if needed
    // or your own logic
    pendingReturns = transactions
    .filter(tx => tx.type === "borrowed" && !tx.returned)
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

    document.querySelector(".flashcard .main-card:nth-child(1) .main-data").textContent = totalLent;
    document.querySelector(".flashcard .main-card:nth-child(2) .main-data").textContent = totalBorrowed;
    document.querySelector(".flashcard .main-card:nth-child(3) .main-data").textContent = pendingReturns;
}

});



