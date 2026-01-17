document.addEventListener("DOMContentLoaded", () => {

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1200,
            easing: "easeOutQuart"
        },
        plugins: {
            tooltip: { enabled: true },
            legend: { position: "top" }
        }
    };
    const salesTrendChart = new Chart(
        document.getElementById("salesTrend"),
        {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Sales",
                    data: [12000, 15000, 10000, 18000, 20000, 22000],
                    borderColor: "#4b6cb7",
                    backgroundColor: "rgba(75,108,183,0.2)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: chartOptions
        }
    );

    const categoryChart = new Chart(
        document.getElementById("categoryChart"),
        {
            type: "bar",
            data: {
                labels: ["Electronics", "Clothing", "Home", "Books"],
                datasets: [
                    {
                        label: "Sales",
                        data: [30000, 20000, 15000, 10000],
                        backgroundColor: "rgba(54,162,235,0.85)"
                    },
                    {
                        label: "Profit",
                        data: [8000, 5000, 4000, 2000],
                        backgroundColor: "rgba(233,30,99,0.85)"
                    }
                ]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        }
    );

    const productChart = new Chart(
        document.getElementById("productChart"),
        {
            type: "pie",
            data: {
                labels: ["Product A", "Product B", "Product C", "Product D"],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        "#4b6cb7",
                        "#e91e63",
                        "#ff9800",
                        "#9c27b0"
                    ]
                }]
            },
            options: chartOptions
        }
    );

    document.getElementById("generateBtn").addEventListener("click", () => {

        salesTrendChart.data.datasets[0].data =
            Array.from({ length: 6 }, () => Math.floor(Math.random() * 25000));

        categoryChart.data.datasets[0].data =
            Array.from({ length: 4 }, () => Math.floor(Math.random() * 35000));

        categoryChart.data.datasets[1].data =
            Array.from({ length: 4 }, () => Math.floor(Math.random() * 10000));

        productChart.data.datasets[0].data =
            Array.from({ length: 4 }, () => Math.floor(Math.random() * 50));

        salesTrendChart.update();
        categoryChart.update();
        productChart.update();

        const popup = document.createElement("div");
        popup.innerText = "Charts updated successfully!";
        popup.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 18px;
            border-radius: 8px;
            box-shadow: 0 6px 15px rgba(0,0,0,0.25);
            z-index: 9999;
        `;
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 2500);
    });

});
