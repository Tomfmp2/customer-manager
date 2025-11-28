// Filters Component
import { clients, setFilteredClients } from '../state.js';
import { renderClientsTable } from '../pages/clients.js';

const clientSearch = document.getElementById("clientSearch");
const categoryFilter = document.getElementById("categoryFilter");
const paymentFilter = document.getElementById("paymentFilter");

export function setupFilters() {
    // Search and filters
    clientSearch.addEventListener("input", filterClients);
    categoryFilter.addEventListener("change", filterClients);
    paymentFilter.addEventListener("change", filterClients);
}

export function populateFilters() {
    const categories = [...new Set(clients.map((c) => c.categoria_dispositivo).filter(Boolean))];
    categoryFilter.innerHTML =
        '<option value="all">Todas las categorias</option>' +
        categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

    const payments = [...new Set(clients.map((c) => c.metodo_pago).filter(Boolean))];
    paymentFilter.innerHTML =
        '<option value="all">Todos los metodos</option>' +
        payments.map((pay) => `<option value="${pay}">${pay}</option>`).join("");
}

export function filterClients() {
    const searchTerm = clientSearch.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const paymentValue = paymentFilter.value;

    const filtered = clients.filter((client) => {
        const matchesSearch =
            (client.nombre_cliente || "").toLowerCase().includes(searchTerm) ||
            (client.ciudad_cliente || "").toLowerCase().includes(searchTerm) ||
            (client.nombre_producto || "").toLowerCase().includes(searchTerm) ||
            (client.categoria_dispositivo || "").toLowerCase().includes(searchTerm);

        const matchesCategory = categoryValue === "all" || client.categoria_dispositivo === categoryValue;
        const matchesPayment = paymentValue === "all" || client.metodo_pago === paymentValue;

        return matchesSearch && matchesCategory && matchesPayment;
    });

    setFilteredClients(filtered);
    renderClientsTable();
}
