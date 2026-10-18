async function updateDashboard() {
    try {
        const response = await fetch("/debug/stats");

        if (!response.ok) {
            throw new Error("Failed to fetch stats");
        }

        const stats = await response.json();

        document.getElementById("totalRequests").textContent =
            stats.totalRequests;

        document.getElementById("averageResponseTime").textContent =
            stats.averageResponseTime.toFixed(2) + " ms";

        document.getElementById("status2xx").textContent =
            stats.status2xx;

        document.getElementById("status4xx").textContent =
            stats.status4xx;

        document.getElementById("status5xx").textContent =
            stats.status5xx;

    } catch (error) {
        console.error("Failed to update dashboard:", error);
    }
}

updateDashboard();
setInterval(updateDashboard, 2000);