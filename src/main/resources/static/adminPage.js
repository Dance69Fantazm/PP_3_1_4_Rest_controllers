const adminUrl = '/api/admins';

async function loadCurrentUser() {
    try {
        const response = await fetch(adminUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const user = await response.json();
        const roles = (Array.isArray(user.roles) ? user.roles : [])
            .map(role => role.role)
            .join(' ');

        document.getElementById("navbar-email").textContent = user.email || 'No email';
        document.getElementById("navbar-roles").textContent = roles || 'No roles';
    } catch (error) {
        console.error('Failed to load current user:', error);
    }
}

async function getAdminPage() {
    try {
        const response = await fetch(adminUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const listAllUsers = await response.json();
        loadTableData(listAllUsers);
    } catch (error) {
        console.error('Failed to load admin page data:', error);
        alert(`Error loading admin page: ${error.message}`);
    }
}

function loadTableData(users) {
    const tableBody = document.getElementById('admintbody');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    const rowsHtml = (Array.isArray(users) ? users : [])
        .map(user => {
            const roles = (Array.isArray(user.roles) ? user.roles : [])
                .map(role => role.role.replace("ROLE_", ""))
                .join(', ');

            return `
<tr>
    <td>${user.id || ''}</td>
    <td>${user.name || ''}</td>
    <td>${user.surname || ''}</td>
    <td>${user.age || ''}</td>
    <td>${user.email || ''}</td>
    <td>${roles}</td>
    <td>
        <button type="button" class="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#editModal" 
                onclick="loadDataForEditModal(${user.id})">
            Edit
        </button>
    </td>
    <td>
        <button class="btn btn-danger" 
                data-bs-toggle="modal" 
                data-bs-target="#deleteModal" 
                onclick="deleteModalData(${user.id})">
            Delete
        </button>
    </td>
</tr>`;
        })
        .join('');

    tableBody.innerHTML = rowsHtml || '<tr><td colspan="8">No users found</td></tr>';
}

async function initializePage() {
    await loadCurrentUser();
    await getAdminPage();
}

initializePage();

