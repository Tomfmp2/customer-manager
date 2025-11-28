// Modal Component
import { clients, editingClientId, setEditingClientId } from '../state.js';
import { createClient, updateClient } from '../api.js';
import { renderClientsTable } from '../pages/clients.js';
import { updateDashboard } from '../pages/dashboard.js';
import { populateFilters } from './filters.js';

const modalOverlay = document.getElementById("modalOverlay");
const clientModal = document.getElementById("clientModal");
const modalTitle = document.getElementById("modalTitle");
const clientForm = document.getElementById("clientForm");

export function setupModal() {
    // Form submission
    clientForm.addEventListener("submit", handleFormSubmit);

    // Close modals on overlay click
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}

export function openModal(mode, clientId = null) {
    setEditingClientId(clientId);
    modalTitle.textContent = mode === "add" ? "Nuevo Registro" : "Editar Registro";
    document.getElementById("submitBtn").innerHTML =
        mode === "add"
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Guardar Registro'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Actualizar';

    // Reset form first
    clientForm.reset();

    if (mode === "edit" && clientId) {
        // Find client using id_cliente field from API
        const client = clients.find((c) => String(c.id_cliente) === String(clientId));
        console.log("[Modal] Opening edit modal for client:", client);

        if (client) {
            // Populate form with existing data
            document.getElementById("clientId").value = client.id_cliente;
            document.getElementById("nombre_cliente").value = client.nombre_cliente || "";
            document.getElementById("edad_cliente").value = client.edad_cliente || "";
            document.getElementById("ciudad_cliente").value = client.ciudad_cliente || "";
            document.getElementById("categoria_dispositivo").value = client.categoria_dispositivo || "";
            document.getElementById("nombre_producto").value = client.nombre_producto || "";
            document.getElementById("precio").value = client.precio || "";
            document.getElementById("metodo_pago").value = client.metodo_pago || "";
            document.getElementById("fecha_compra").value = client.fecha_compra || "";
            document.getElementById("hora_compra").value = client.hora_compra || "";
        }
    } else {
        // Set default date/time for new records
        document.getElementById("clientId").value = "";
        setDefaultDateTime();
    }

    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("show");

    // Focus first input after animation
    setTimeout(() => {
        document.getElementById("nombre_cliente").focus();
    }, 100);
}

export function closeModal() {
    modalOverlay.classList.remove("show");
    modalOverlay.classList.add("hidden");
    clientForm.reset();
    setEditingClientId(null);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    // Show loading state on button
    const submitBtn = document.getElementById("submitBtn");
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="btn-spinner"></div> Guardando...';
    submitBtn.disabled = true;

    const clientData = {
        nombre_cliente: document.getElementById("nombre_cliente").value.trim(),
        edad_cliente: parseInt(document.getElementById("edad_cliente").value) || 0,
        ciudad_cliente: document.getElementById("ciudad_cliente").value.trim(),
        categoria_dispositivo: document.getElementById("categoria_dispositivo").value,
        nombre_producto: document.getElementById("nombre_producto").value.trim(),
        precio: parseFloat(document.getElementById("precio").value) || 0,
        metodo_pago: document.getElementById("metodo_pago").value,
        fecha_compra: document.getElementById("fecha_compra").value,
        hora_compra: document.getElementById("hora_compra").value,
    };

    try {
        if (editingClientId) {
            await updateClient(editingClientId, clientData);
        } else {
            await createClient(clientData);
        }

        closeModal();
        renderClientsTable();
        updateDashboard();
        populateFilters();
    } catch (error) {
        // Error already handled in API functions
    } finally {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }
}

function setDefaultDateTime() {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().slice(0, 5);
    document.getElementById("fecha_compra").value = dateStr;
    document.getElementById("hora_compra").value = timeStr;
}

// Global functions for inline onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.openEditModal = (clientId) => openModal("edit", clientId);
