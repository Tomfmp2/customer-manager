// Dashboard Page Logic
import { clients } from '../state.js';
import { formatCurrency, getInitials } from '../utils.js';
import { loadClients } from '../api.js';
import { populateFilters } from '../components/filters.js';
import { showToast } from '../components/toast.js';
import { navigateTo } from './navigation.js';
import { openModal } from '../components/modal.js';

export function updateDashboard() {
    document.getElementById("totalClients").textContent = clients.length;

    const categories = [...new Set(clients.map((c) => c.categoria_dispositivo).filter(Boolean))];
    document.getElementById("totalCategories").textContent = categories.length;

    const totalRevenue = clients.reduce((sum, c) => sum + (parseFloat(c.precio) || 0), 0);
    document.getElementById("totalRevenue").textContent = formatCurrency(totalRevenue);

    const avgPurchases = clients.length > 0 ? totalRevenue / clients.length : 0;
    document.getElementById("avgPurchases").textContent = formatCurrency(avgPurchases);

    renderRecentClients();
}

function renderRecentClients() {
    const recentList = document.getElementById("recentClientsList");

    const recent = [...clients]
        .sort((a, b) => {
            const dateA = new Date(a.fecha_compra + " " + (a.hora_compra || "00:00"));
            const dateB = new Date(b.fecha_compra + " " + (b.hora_compra || "00:00"));
            return dateB - dateA;
        })
        .slice(0, 5);

    if (recent.length === 0) {
        recentList.innerHTML = '<div class="empty-recent"><span>No hay registros</span></div>';
        return;
    }

    recentList.innerHTML = recent
        .map(
            (client) => `
        <div class="recent-item" onclick="openEditModalFromDashboard('${client.id_cliente}')">
            <div class="recent-avatar">${getInitials(client.nombre_cliente)}</div>
            <div class="recent-info">
                <div class="recent-name">${client.nombre_cliente || "Sin nombre"}</div>
                <div class="recent-product">${client.nombre_producto || "Sin producto"}</div>
            </div>
            <div class="recent-amount">${formatCurrency(client.precio || 0)}</div>
        </div>
    `,
        )
        .join("");
}

export async function refreshData() {
    const refreshBtn = document.querySelector('.action-btn[onclick="refreshData()"]');
    if (refreshBtn) {
        refreshBtn.classList.add("loading");
    }

    await loadClients();
    const { filterClients } = await import('../components/filters.js');
    filterClients();
    updateDashboard();
    populateFilters();
    showToast("Datos actualizados", "success");

    if (refreshBtn) {
        refreshBtn.classList.remove("loading");
    }
}

export function exportData() {
    const csvContent = [
        [
            "ID",
            "Nombre Cliente",
            "Edad",
            "Ciudad",
            "Categoria",
            "Producto",
            "Precio",
            "Metodo Pago",
            "Fecha Compra",
            "Hora Compra",
        ],
        ...clients.map((c) => [
            c.id_cliente || "",
            c.nombre_cliente || "",
            c.edad_cliente || "",
            c.ciudad_cliente || "",
            c.categoria_dispositivo || "",
            c.nombre_producto || "",
            c.precio || 0,
            c.metodo_pago || "",
            c.fecha_compra || "",
            c.hora_compra || "",
        ]),
    ]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `trendgear_clientes_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    showToast("Datos exportados exitosamente", "success");
}

function openEditModalFromDashboard(clientId) {
    navigateTo("clients");
    setTimeout(() => {
        openModal("edit", clientId);
    }, 150);
}

// Global functions for inline onclick handlers
window.openEditModalFromDashboard = openEditModalFromDashboard;
window.refreshData = refreshData;
window.exportData = exportData;
