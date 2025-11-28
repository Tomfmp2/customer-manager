// Toast Component
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");

export function showToast(message, type = "success") {
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    const iconSvg =
        type === "success"
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

    toastIcon.innerHTML = iconSvg;

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 3500);
}
