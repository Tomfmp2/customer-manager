// Clients Page Logic
import { filteredClients } from '../state.js';
import { formatCurrency, formatDate, getInitials, getPaymentClass } from '../utils.js';

const clientsTableBody = document.getElementById("clientsTableBody");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");

export function renderClientsTable() {
    const tbody = clientsTableBody;

    if (filteredClients.length === 0) {
        tbody.innerHTML = "";
        emptyState.classList.remove("hidden");
        resultsCount.textContent = "0 registros";
        return;
    }

    emptyState.classList.add("hidden");
    resultsCount.textContent = `${filteredClients.length} registro${filteredClients.length !== 1 ? "s" : ""}`;

    tbody.innerHTML = filteredClients
        .map(
            (client) => `
        <tr data-id="${client.id_cliente}">
            <td>
                <div class="client-cell">
                    <div class="client-avatar">${getInitials(client.nombre_cliente)}</div>
                    <div class="client-info-cell">
                        <span class="client-name">${client.nombre_cliente || "-"}</span>
                        <span class="client-city">${client.ciudad_cliente || "-"}</span>
                    </div>
                </div>
            </td>
            <td><span class="age-badge">${client.edad_cliente || "-"} años</span></td>
            <td>
                <div class="product-cell">
                    <span class="product-name">${client.nombre_producto || "-"}</span>
                    <span class="category-badge">${client.categoria_dispositivo || "-"}</span>
                </div>
            </td>
            <td><span class="price-value">${formatCurrency(client.precio || 0)}</span></td>
            <td><span class="payment-badge ${getPaymentClass(client.metodo_pago)}">${client.metodo_pago || "-"}</span></td>
            <td>
                <div class="date-cell">
                    <span class="date-value">${formatDate(client.fecha_compra)}</span>
                    <span class="time-value">${client.hora_compra || "-"}</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit" onclick="openEditModal('${client.id_cliente}')" title="Editar registro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="openDeleteModal('${client.id_cliente}')" title="Eliminar registro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `,
        )
        .join("");
}
