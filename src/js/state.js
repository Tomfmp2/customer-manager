// Global State Management
export let clients = [];
export let filteredClients = [];
export let currentPage = "dashboard";
export let editingClientId = null;
export let deletingClientId = null;

// State setters
export function setClients(newClients) {
    clients = newClients;
}

export function setFilteredClients(newFilteredClients) {
    filteredClients = newFilteredClients;
}

export function setCurrentPage(page) {
    currentPage = page;
}

export function setEditingClientId(id) {
    editingClientId = id;
}

export function setDeletingClientId(id) {
    deletingClientId = id;
}
