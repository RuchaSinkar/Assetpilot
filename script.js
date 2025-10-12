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
const historyBtn = document.getElementById("historyBtn"); // Make sure your button has id="historyBtn" in HTML
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtns = document.querySelectorAll(".closeModal");
const statsBtn = document.getElementById("statsBtn");


// Modal sections
const borrowForm = document.querySelector(".borrow");
const lendForm = document.querySelector(".lend");
const historySection = document.querySelector(".history-section");
const viewStatsSection = document.querySelector(".view-stats");


// --- Modal Logic ---

// This function hides all modal sections. It's the key to preventing overlaps.
function hideAllModals() {
  if (borrowForm) borrowForm.style.display = "none";
  if (lendForm) lendForm.style.display = "none";
  if (historySection) historySection.style.display = "none";
  if (viewStatsSection) viewStatsSection.style.display = "none";
}

// This function shows the overlay and a specific modal.
function showModal(modalElement) {
  hideAllModals();
  if ([borrowForm, lendForm].includes(modalElement)) {
    modalElement.style.display = "grid";
  } else if ([historySection, viewStatsSection].includes(modalElement)) {
    modalElement.style.display = "flex";
  }
  if (modalOverlay) modalOverlay.style.display = "flex";
}

// This function closes the entire modal overlay.
function closeModal() {
    if (modalOverlay) modalOverlay.style.display = "none";
    // It's good practice to also hide all modals upon closing.
    hideAllModals();
}

// Check if all essential elements were found before adding listeners.
if (borrowBtn && lendBtn && historyBtn && statsBtn && modalOverlay && closeModalBtns && borrowForm && lendForm && historySection && viewStatsSection) {
  
    // When user clicks the "Borrow" button:
    borrowBtn.addEventListener("click", () => {
        showModal(borrowForm);
    });

    // When user clicks the "Lend" button:
    lendBtn.addEventListener("click", () => {
        showModal(lendForm);
    });

    // When user clicks the "History" button:
    historyBtn.addEventListener("click", () => {
    renderHistory(); // Render fresh history data just before showing
    showModal(historySection);
});

statsBtn.addEventListener("click", () => {
    updateStatsView();
    showModal(viewStatsSection);
  });

    // Add a listener to every close button.
    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", closeModal);
    });

    // Optional: Allow closing the modal by clicking on the overlay background.
    modalOverlay.addEventListener("click", (event) => {
        // We check if the click was on the overlay itself, not on its children (the modal content).
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

} else {
    // If an element is missing, log an error to help with debugging.
    console.error("Modal script could not run. One or more required elements are missing from the HTML or have incorrect IDs/classes.");
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



/* --------------------------Smooth Scrolling for about section -------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Enable smooth scrolling for hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // If page loaded with hash (like home.html#about-section)
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }
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
            <button class="mark-returned" data-id="${item.id}" title="Mark as Returned">&#x2714;</button>
        `;
        container.appendChild(div);
    });

    // Add event listeners for all “Mark as Returned” buttons
    container.querySelectorAll(".mark-returned").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".transaction");

    // Add the animation class
    card.classList.add("slide-out");

    // Wait for the animation to finish, then remove + update data
    card.addEventListener("animationend", () => {
      markAsReturned(e.target.dataset.id);
    }, { once: true });
  });
});

}

function markAsReturned(id) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let history = JSON.parse(localStorage.getItem("history")) || [];
    
    const transactionIndex = transactions.findIndex(tx => tx.id == id);
    if (transactionIndex > -1) {
        const [completedTransaction] = transactions.splice(transactionIndex, 1);

        const today = new Date();
        const deadlineDate = new Date(completedTransaction.deadline);
        today.setHours(0,0,0,0);
        deadlineDate.setHours(0,0,0,0);

        const diffDays = Math.round((deadlineDate - today) / (1000 * 60 * 60 * 24));
        completedTransaction.repaidOn = today.toISOString().split('T')[0];

        if (diffDays > 0) {
            completedTransaction.status = { state: 'early', days: diffDays };
        } else if (diffDays < 0) {
            completedTransaction.status = { state: 'late', days: Math.abs(diffDays) };
        } else {
            completedTransaction.status = { state: 'on-time', days: 0 };
        }

        // 🟡 Find and update matching history entry
        const histIndex = history.findIndex(h => h.id == completedTransaction.id);
        if (histIndex > -1) {
            history[histIndex] = completedTransaction;
        } else {
            history.unshift(completedTransaction);
        }

        localStorage.setItem("transactions", JSON.stringify(transactions));
        localStorage.setItem("history", JSON.stringify(history));

        renderInitialTransactions?.();
        updateFlashcards?.();
        renderCalendar?.();
    }

    
}



    // --- Handle Borrow Form Submission ---
    if (borrowForm) {
        borrowForm.addEventListener("submit", function (e) {
            e.preventDefault();

            function addToHistoryActive(entry) {
            const history = JSON.parse(localStorage.getItem("history")) || [];
            entry.repaidOn = "Not yet";
            entry.status = { state: "active" };
            history.unshift(entry);
            localStorage.setItem("history", JSON.stringify(history));
}

            const borrowAmount = borrowForm.querySelector(".amount-borrow").value;
            const borrowAsset = borrowForm.querySelector(".assetType").value;
            const borrowFrom = borrowForm.querySelector(".borrowedFrom").value;
            const borrowDeadline = borrowForm.querySelector(".deadline").value;

            const newTransaction = {
                id: Date.now(),
                type: "borrowed",
                amount: borrowAmount,
                assetType: borrowAsset,
                person: borrowFrom,
                deadline: borrowDeadline
            };

            const existing = JSON.parse(localStorage.getItem("transactions")) || [];
            existing.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(existing));

            addToHistoryActive(newTransaction);
            
            alert("Borrow transaction added successfully!");
            updateFlashcards();
            updateCharts(JSON.parse(localStorage.getItem("transactions")) || []);
            updateDashboardStats();
            if (typeof refreshCharts === "function") refreshCharts();


            borrowForm.reset();
        });
    }

    // --- Handle Lend Form Submission ---
    if (lendForm) {
        lendForm.addEventListener("submit", function (e) {
            e.preventDefault();

            function addToHistoryActive(entry) {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    entry.repaidOn = "Not yet";
    entry.status = { state: "active" };
    history.unshift(entry);
    localStorage.setItem("history", JSON.stringify(history));
}


            const lendAmount = lendForm.querySelector(".amount-lend").value;
            const lendAsset = lendForm.querySelector(".assetType").value;
            const lendTo = lendForm.querySelector(".LentTo").value;
            const lendDeadline = lendForm.querySelector(".deadline").value;

            const newTransaction = {
                id: Date.now(),
                type: "lent",
                amount: lendAmount,
                assetType: lendAsset,
                person: lendTo,
                deadline: lendDeadline
            };

            const existing = JSON.parse(localStorage.getItem("transactions")) || [];
            existing.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(existing));

            addToHistoryActive(newTransaction);
            
            alert("Lend transaction added successfully!");
            updateFlashcards();
            updateCharts(JSON.parse(localStorage.getItem("transactions")) || []);
            updateDashboardStats();
            if (typeof refreshCharts === "function") refreshCharts();


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
        updateDashboardStats();
        if (typeof refreshCharts === "function") refreshCharts();


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
function renderHistory() {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const container = document.getElementById("history-cards-container");
    if (!container) return;

    container.innerHTML = ""; // Clear static/old content

    // FIX #1: Changed 'zero' to the number 0
    if (history.length === 0) {
        container.innerHTML = "<p style='color: #aaa; text-align: center;'>Your transaction history is empty.</p>";
        return;
    }

    history.forEach(item => {
        const card = document.createElement("div");
        card.className = "history-card";
        
        let statusLabel = '';
        let statusClass = '';
        
        // FIX #2: Added a check to see if item.status exists
        if (item.status) { 
    if (item.status.state === 'early') {
        statusLabel = `${item.status.days} day${item.status.days > 1 ? 's' : ''} early`;
        statusClass = 'green-bg';
    } else if (item.status.state === 'late') {
        statusLabel = `${item.status.days} day${item.status.days > 1 ? 's' : ''} late`;
        statusClass = 'red-bg';
    } else if (item.status.state === 'active') {
        statusLabel = 'Active';
        statusClass = 'gold';
    } else {
        statusLabel = 'On time';
        statusClass = 'green-bg';
    }
}

        const verb = item.type === 'borrowed' ? 'Borrowed from' : 'Lent to';
        const action = item.type === 'borrowed' ? 'Repaid on' : 'Received on';

        card.innerHTML = `
            <span class="status-dot ${item.type === 'borrowed' ? 'red' : 'green'}"></span>
            <div class="history-details">
                <h3>${verb} ${item.person}</h3>
                <p>Amount: ₹${item.amount} | Category: ${item.assetType}</p>
                <p>Deadline on: ${item.deadline} | ${action}: ${item.repaidOn}</p>
            </div>
            <span class="status-label ${statusClass}">${statusLabel}</span>
        `;
        container.appendChild(card);
    });
}

function updateStatsView() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let totalLent = 0, totalBorrowed = 0;
  let onTime = 0, late = 0, early = 0, active = 0;

  history.forEach(item => {
    if (item.type === "lent") totalLent += Number(item.amount);
    if (item.type === "borrowed") totalBorrowed += Number(item.amount);

    if (item.status?.state === "on-time") onTime++;
    else if (item.status?.state === "late") late++;
    else if (item.status?.state === "early") early++;
    else if (item.status?.state === "active") active++;
  });

  // update DOM
  document.getElementById("stat-total-lent").textContent = `₹${totalLent}`;
  document.getElementById("stat-total-borrowed").textContent = `₹${totalBorrowed}`;
  document.getElementById("stat-active").textContent = active;
  document.getElementById("stat-on-time").textContent = onTime;
  document.getElementById("stat-late").textContent = late;
  document.getElementById("stat-early").textContent = early;
}

document.addEventListener("DOMContentLoaded", () => {
  updateDashboardStats();
});

function updateDashboardStats() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let totalLent = 0;
  let totalBorrowed = 0;
  let totalTransactions = history.length;

  history.forEach(item => {
    if (item.type === "lent") totalLent += Number(item.amount);
    if (item.type === "borrowed") totalBorrowed += Number(item.amount);
  });

  const lentEl = document.getElementById("stats-total-lent");
  const borrowedEl = document.getElementById("stats-total-borrowed");
  const transEl = document.getElementById("stats-total-trans");

  if (lentEl) lentEl.textContent = `Rs ${totalLent}`;
  if (borrowedEl) borrowedEl.textContent = `Rs ${totalBorrowed}`;
  if (transEl) transEl.textContent = totalTransactions;
}


document.addEventListener("DOMContentLoaded", () => {
  updateReportStats();
});

function updateReportStats() {
  // Pull both completed and active transactions
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Combine all entries for lifetime reporting
  const allRecords = [...history, ...transactions];

  let onTime = 0, early = 0, late = 0;

  // Count repayment statuses across all stored records
  allRecords.forEach(item => {
    if (!item.status) return;
    const state = item.status.state?.toLowerCase();

    if (state === "on-time") onTime++;
    else if (state === "early") early++;
    else if (state === "late") late++;
  });

  // Calculate Trust Score = ((onTime + early) / total) * 100
  const totalCompleted = onTime + early + late;
  let trustScore = 0;
  if (totalCompleted > 0) {
    trustScore = ((onTime + early) / totalCompleted * 100).toFixed(1);
  }

  // Update DOM if elements exist (safe for all pages)
  const onTimeEl = document.getElementById("on-time-count");
  const earlyEl = document.getElementById("early-count");
  const lateEl = document.getElementById("late-count");
  const trustEl = document.getElementById("trust-score");

  if (onTimeEl) onTimeEl.textContent = onTime;
  if (earlyEl) earlyEl.textContent = early;
  if (lateEl) lateEl.textContent = late;
  if (trustEl) trustEl.textContent = `${trustScore}`;
}


// =================== CLEAR HISTORY BUTTON ===================
document.addEventListener("DOMContentLoaded", () => {
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const historyContainer = document.getElementById("history-cards-container");

  if (clearHistoryBtn && historyContainer) {
    clearHistoryBtn.addEventListener("click", () => {
      const confirmClear = confirm("Are you sure you want to clear all history? This cannot be undone.");
      if (!confirmClear) return;

      // Clear from localStorage
      localStorage.removeItem("history");
      localStorage.removeItem("transactions");

      // Empty UI instantly
      historyContainer.innerHTML = "<p style='color:#aaa;text-align:center;'>History cleared. Start fresh!</p>";

      // Optionally refresh charts & dashboard stats
      updateDashboardStats?.();
      updateStatsView?.();
      if (typeof refreshCharts === "function") refreshCharts();

      alert("All history has been cleared successfully!");
    });
  }
});
