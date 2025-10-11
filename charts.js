/*const c1 = document.getElementById('statsPieChart');
    new Chart(c1, {
      type: 'pie',
      data: {
        labels: ['Property', 'Gold','Silver','Utilities','Cash'],
        datasets: [{
          data: [5.6, 5.6,11.1,22.2,55.6],
          backgroundColor: ['rgb(122, 122, 218)','rgb(191, 191, 240)','rgb(138, 138, 202)', 'rgb(91, 91, 146)','rgb(78, 78, 152)'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#ccc' }
          }
        }
      },
      tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.raw + '%';
              }
            }
          }
    });

    const c2=document.getElementById('amtSemiDonutChart').getContext('2d');

    new Chart(c2, {
      type: 'doughnut',
      data: {
        labels: ['Settled amounts', 'Outstanding amounts'],
        datasets: [{
          data: [65, 35], // <-- your actual data here
          backgroundColor: ['#f6a94d', '#fbe36c'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#ccc'
            }
          }
        },
        rotation: -90,    // start angle
        circumference: 180, // semi-circle
        cutout: '60%'    // thickness of the doughnut
      }
    });


    const c3 = document.getElementById('borrowDonutChart').getContext('2d');

    new Chart(c3, {
      type: 'doughnut',
      data: {
        labels: ['Cash', 'Utilities', 'Silver'],
        datasets: [{
          data: [62.5, 25, 12.5],
          backgroundColor: ['#7ED957', '#00C49F', '#004d26'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position:'bottom',
            labels: {
              color: '#ccc'
            }
          },
          
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        cutout: '50%'
      }
    });

    */

// Get canvas elements
const c1 = document.getElementById('statsPieChart').getContext('2d');
const c2 = document.getElementById('amtSemiDonutChart').getContext('2d');
const c3 = document.getElementById('borrowDonutChart').getContext('2d');

// Fetch transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Helper to sum amounts by type
function getTypeDistribution(typeFilter) {
    const dist = {};
    transactions.filter(tx => tx.type === typeFilter).forEach(tx => {
        const amt = parseFloat(tx.amount);
        dist[tx.assetType] = (dist[tx.assetType] || 0) + amt;
    });
    return dist;
}

// Helper for total lent/borrowed
function getTotalAmount(typeFilter) {
    return transactions.filter(tx => tx.type === typeFilter)
                       .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
}

// Pie chart - Lent Asset Distribution
const lentDist = getTypeDistribution('lent');
const statsPieChart = new Chart(c1, {
    type: 'pie',
    data: {
        labels: Object.keys(lentDist),
        datasets: [{
            data: Object.values(lentDist),
            backgroundColor: Object.keys(lentDist).map(() => `hsl(${Math.random()*360},60%,60%)`),
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#ccc' } },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.raw;
                    }
                }
            }
        }
    }
});

// Semi-donut - Settled vs Outstanding (example: total lent vs total borrowed)
const totalLent = getTotalAmount('lent');
const totalBorrowed = getTotalAmount('borrowed');
const amtSemiDonutChart = new Chart(c2, {
    type: 'doughnut',
    data: {
        labels: ['Total Lent', 'Total Borrowed'],
        datasets: [{
            data: [totalLent, totalBorrowed],
            backgroundColor: ['#f6a94d', '#fbe36c'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        rotation: -90,
        circumference: 180,
        cutout: '60%',
        plugins: {
            legend: { position: 'bottom', labels: { color: '#ccc' } }
        }
    }
});

// Donut chart - Borrowed Asset Distribution
const borrowedDist = getTypeDistribution('borrowed');
const borrowDonutChart = new Chart(c3, {
    type: 'doughnut',
    data: {
        labels: Object.keys(borrowedDist),
        datasets: [{
            data: Object.values(borrowedDist),
            backgroundColor: Object.keys(borrowedDist).map(() => `hsl(${Math.random()*360},60%,60%)`),
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: '50%',
        plugins: {
            legend: { position:'bottom', labels: { color: '#ccc' } },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.raw;
                    }
                }
            }
        }
    }
});

// Optional: function to refresh charts after adding transactions
function refreshCharts() {
    // Update statsPieChart
    const updatedLentDist = getTypeDistribution('lent');
    statsPieChart.data.labels = Object.keys(updatedLentDist);
    statsPieChart.data.datasets[0].data = Object.values(updatedLentDist);
    statsPieChart.data.datasets[0].backgroundColor = Object.keys(updatedLentDist).map(() => `hsl(${Math.random()*360},60%,60%)`);
    statsPieChart.update();

    // Update amtSemiDonutChart
    const updatedTotalLent = getTotalAmount('lent');
    const updatedTotalBorrowed = getTotalAmount('borrowed');
    amtSemiDonutChart.data.datasets[0].data = [updatedTotalLent, updatedTotalBorrowed];
    amtSemiDonutChart.update();

    // Update borrowDonutChart
    const updatedBorrowDist = getTypeDistribution('borrowed');
    borrowDonutChart.data.labels = Object.keys(updatedBorrowDist);
    borrowDonutChart.data.datasets[0].data = Object.values(updatedBorrowDist);
    borrowDonutChart.data.datasets[0].backgroundColor = Object.keys(updatedBorrowDist).map(() => `hsl(${Math.random()*360},60%,60%)`);
    borrowDonutChart.update();
}
function updateCharts(transactions) {
    // Recalculate your data from transactions
    const lentData = transactions.filter(t => t.type === "lent").map(t => Number(t.amount));
    const borrowedData = transactions.filter(t => t.type === "borrowed").map(t => Number(t.amount));

    // Update your pie/doughnut charts here
    statsPieChart.data.datasets[0].data = calculateAssetPercentages(lentData); // example
    statsPieChart.update();

    amtSemiDonutChart.data.datasets[0].data = [sumSettled(), sumOutstanding()]; // example
    amtSemiDonutChart.update();

    borrowDonutChart.data.datasets[0].data = calculateBorrowPercentages(borrowedData); // example
    borrowDonutChart.update();
}