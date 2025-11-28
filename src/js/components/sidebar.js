// Sidebar Component
import { navigateTo } from '../pages/navigation.js';

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const navItems = document.querySelectorAll(".nav-item");

export function setupSidebar() {
    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // Navigation items
    navItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            navigateTo(page);
        });
    });
}
