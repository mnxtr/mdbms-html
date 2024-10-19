// Bar Chart
const barChart = document.getElementById('barChart').getContext('2d');
new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        datasets: [{
            label: 'Sales (in units)',
            data: [50, 75, 100, 125],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});

// Pie Chart
const pieChart = document.getElementById('pieChart').getContext('2d');
new Chart(pieChart, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'Colors Distribution',
            data: [30, 40, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});

// Line Chart
const lineChart = document.getElementById('lineChart').getContext('2d');
new Chart(lineChart, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Monthly Revenue (in USD)',
            data: [1000, 2000, 1500, 2500, 3000, 3500],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});
