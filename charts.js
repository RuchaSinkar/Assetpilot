const c1 = document.getElementById('statsPieChart');
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