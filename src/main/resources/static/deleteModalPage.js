const deleteModalElements = {
    id: document.getElementById('id_del'),
    name: document.getElementById('name_del'),
    surname: document.getElementById('surname_del'),
    age: document.getElementById('age_del'),
    email: document.getElementById('email_del'),
    role: document.getElementById("delete-role")
};
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const closeDeleteButton = document.getElementById("closeDelete");

function deleteModalData(id) {
    const urlForDel = `api/admins/users/${id}`;

    fetch(urlForDel)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert(`Error: ${response.status}`);
                throw new Error(`Error: ${response.status}`);
            }
        })
        .then(user => {
            deleteModalElements.id.value = user.id;
            deleteModalElements.name.value = user.name;
            deleteModalElements.surname.value = user.surname;
            deleteModalElements.age.value = user.age;
            deleteModalElements.email.value = user.email;
            deleteModalElements.role.value = user.roles
                .map(role => role.role.replace("ROLE_", ""))
                .join(", ");
            deleteModal.show();
        })
        .catch(error => console.error('Error fetching user for deletion:', error));
}

function deleteUser() {
    const urlDel = `api/admins/users/${deleteModalElements.id.value}`;
    const options = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    };

    fetch(urlDel, options)
        .then(response => {
            if (response.ok) {
                closeDeleteButton.click();
                getAdminPage();
            } else {
                alert(`Error: ${response.status}`);
                throw new Error(`Error: ${response.status}`);
            }
        })
        .catch(error => console.error('Error deleting user:', error));
}
