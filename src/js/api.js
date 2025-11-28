// API Service Functions
import { API_URL } from './config.js';
import { clients, setClients, setFilteredClients } from './state.js';
import { showToast } from './components/toast.js';

export async function loadClients() {
    try {
        showLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al cargar clientes");
        const data = await response.json();

        console.log("[API] Loaded clients:", data.length);

        setClients(data);
        setFilteredClients([...data]);
        showLoading(false);
        return data;
    } catch (error) {
        console.error("Error loading clients:", error);
        showToast("Error al cargar los registros", "error");
        showLoading(false);
        return [];
    }
}

export async function createClient(clientData) {
    try {
        console.log("[API] Creating client:", clientData);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[API] Create failed:", errorText);
            throw new Error("Error al crear registro");
        }

        const newClient = await response.json();
        console.log("[API] Client created:", newClient);

        // Reload all clients to ensure sync
        await loadClients();
        showToast("Registro creado exitosamente", "success");
        return newClient;
    } catch (error) {
        console.error("Error creating client:", error);
        showToast("Error al crear el registro", "error");
        throw error;
    }
}

export async function updateClient(id, clientData) {
    try {
        console.log("[API] Updating client with id_cliente:", id, "Data:", clientData);

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[API] Update failed:", errorText);
            throw new Error("Error al actualizar registro");
        }

        const updatedClient = await response.json();
        console.log("[API] Client updated:", updatedClient);

        // Reload all clients to ensure sync
        await loadClients();
        showToast("Registro actualizado exitosamente", "success");
        return updatedClient;
    } catch (error) {
        console.error("Error updating client:", error);
        showToast("Error al actualizar el registro", "error");
        throw error;
    }
}

export async function deleteClient(id) {
    try {
        console.log("[API] Deleting client with id_cliente:", id);

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[API] Delete failed:", errorText);
            throw new Error("Error al eliminar registro");
        }

        console.log("[API] Client deleted successfully");

        // Reload all clients to ensure sync
        await loadClients();
        showToast("Registro eliminado exitosamente", "success");
    } catch (error) {
        console.error("Error deleting client:", error);
        showToast("Error al eliminar el registro", "error");
        throw error;
    }
}

function showLoading(show) {
    const loadingState = document.getElementById("loadingState");
    const clientsTableBody = document.getElementById("clientsTableBody");
    const emptyState = document.getElementById("emptyState");

    if (loadingState) {
        loadingState.classList.toggle("hidden", !show);
    }

    if (show && clientsTableBody) {
        clientsTableBody.innerHTML = "";
    }

    if (show && emptyState) {
        emptyState.classList.add("hidden");
    }
}
