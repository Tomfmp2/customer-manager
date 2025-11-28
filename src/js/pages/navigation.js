// Navigation Logic
import { currentPage, setCurrentPage } from '../state.js';
import { renderClientsTable } from './clients.js';

const navItems = document.querySelectorAll(".nav-item");
const currentPageEl = document.getElementById("currentPage");
const dashboardPage = document.getElementById("dashboardPage");
const clientsPage = document.getElementById("clientsPage");
const sidebar = document.getElementById("sidebar");

export function navigateTo(page) {
    setCurrentPage(page);

    navItems.forEach((item) => {
        item.classList.toggle("active", item.dataset.page === page);
    });

    currentPageEl.textContent = page === "dashboard" ? "Dashboard" : "Clientes";

    dashboardPage.classList.toggle("hidden", page !== "dashboard");
    clientsPage.classList.toggle("hidden", page !== "clients");

    sidebar.classList.remove("open");

    if (page === "clients") {
        renderClientsTable();
    }
}

// Global function for inline onclick handlers
window.navigateTo = navigateTo;
