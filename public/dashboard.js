async function updateDashboard() {
    try {
        const response = await fetch("/debug/stats");
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

        let rows = "";

        for (let request of stats.recentRequests) {
            rows += `
                <tr>
                    <td>${request.method}</td>
                    <td>${request.path}</td>
                    <td>${request.status}</td>
                    <td>${request.duration} ms</td>
                </tr>
            `;
        }

        document.getElementById("recentRequests").innerHTML =
            rows || '<tr><td colspan="4">No requests yet</td></tr>';

    } catch (error) {
        console.log("Failed to update dashboard:", error);
    }
}

updateDashboard();
setInterval(updateDashboard, 2000);