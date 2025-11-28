// Main Application Entry Point
import { loadClients } from './api.js';
import { updateDashboard } from './pages/dashboard.js';
import { populateFilters } from './components/filters.js';
import { setupSidebar } from './components/sidebar.js';
import { setupModal } from './components/modal.js';
import { setupDeleteModal } from './components/deleteModal.js';
import { setupFilters } from './components/filters.js';

// Initialize application
async function init() {
    setupEventListeners();
    await loadClients();
    updateDashboard();
    populateFilters();
}

function setupEventListeners() {
    setupSidebar();
    setupModal();
    setupDeleteModal();
    setupFilters();
}

// Start the application when DOM is ready
document.addEventListener("DOMContentLoaded", init);
