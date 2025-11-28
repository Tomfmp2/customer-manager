// Delete Modal Component
import { clients, deletingClientId, setDeletingClientId } from '../state.js';
import { deleteClient } from '../api.js';
import { renderClientsTable } from '../pages/clients.js';
import { updateDashboard } from '../pages/dashboard.js';
import { populateFilters } from './filters.js';

const deleteModalOverlay = document.getElementById("deleteModalOverlay");
const deleteClientName = document.getElementById("deleteClientName");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

export function setupDeleteModal() {
    // Delete confirmation
    confirmDeleteBtn.addEventListener("click", confirmDelete);

    // Close modal on overlay click
    deleteModalOverlay.addEventListener("click", (e) => {
        if (e.target === deleteModalOverlay) closeDeleteModal();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeDeleteModal();
        }
    });
}

export function openDeleteModal(clientId) {
    setDeletingClientId(clientId);
    const client = clients.find((c) => String(c.id_cliente) === String(clientId));
    console.log("[DeleteModal] Opening delete modal for client:", client);

    if (client) {
        deleteClientName.textContent = client.nombre_cliente || "este registro";
        document.getElementById("deleteProductInfo").textContent = client.nombre_producto || "";
    }
    deleteModalOverlay.classList.remove("hidden");
    deleteModalOverlay.classList.add("show");
}

export function closeDeleteModal() {
    deleteModalOverlay.classList.remove("show");
    deleteModalOverlay.classList.add("hidden");
    setDeletingClientId(null);
}

async function confirmDelete() {
    if (!deletingClientId) return;

    // Show loading state
    const deleteBtn = document.getElementById("confirmDeleteBtn");
    const originalContent = deleteBtn.innerHTML;
    deleteBtn.innerHTML = '<div class="btn-spinner"></div> Eliminando...';
    deleteBtn.disabled = true;

    try {
        await deleteClient(deletingClientId);
        closeDeleteModal();
        renderClientsTable();
        updateDashboard();
        populateFilters();
    } catch (error) {
        // Error already handled in API function
    } finally {
        deleteBtn.innerHTML = originalContent;
        deleteBtn.disabled = false;
    }
}

// Global functions for inline onclick handlers
window.openDeleteModal = openDeleteModal;
window.closeDeleteModal = closeDeleteModal;
