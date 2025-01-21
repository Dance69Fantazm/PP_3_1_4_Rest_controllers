const form_ed = document.getElementById('formForEditing');
const id_ed = document.getElementById('edit-id');
const name_ed = document.getElementById('edit-first_name');
const surname_ed = document.getElementById('edit-last_name');
const age_ed = document.getElementById('edit-age');
const email_ed = document.getElementById('edit-email');
const editModal = document.getElementById("editModal");
const closeEditButton = document.getElementById("editClose");
const bsEditModal = new bootstrap.Modal(editModal);

function loadDataForEditModal(id) {
    const urlDataEd = 'api/admins/users/' + id;
    fetch(urlDataEd)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert(`Error, ${response.status}`);
                throw new Error(`Error, ${response.status}`);
            }
        })
        .then(user => {
            console.log('userData', JSON.stringify(user));
            id_ed.value = user.id;
            name_ed.value = user.name;
            surname_ed.value = user.surname;
            age_ed.value = user.age;
            email_ed.value = user.email;
            console.log("id_ed: " + id_ed.value + " !!");
            bsEditModal.show();
        })
        .catch(error => console.error('Error loading user data:', error));
}

function editUser() {
    const urlEdit = 'api/admins/users/' + id_ed.value;
    const listOfRole = [];

    const selectedRoles = Array.from(form_ed.roles.options).filter(option => option.selected);
    if (selectedRoles.length === 0) {
        alert("Выберете роль для пользователя!");
        form_ed.roles.focus();
        return;
    }

    selectedRoles.forEach(option => {
        listOfRole.push({id: option.value});
    });

    const method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: form_ed.name.value,
            surname: form_ed.surname.value,
            age: form_ed.age.value,
            email: form_ed.email.value,
            password: form_ed.password.value,
            roles: listOfRole
        })
    };

    console.log(urlEdit, method);
    fetch(urlEdit, method)
        .then(() => {
            closeEditButton.click();
            getAdminPage();
        })
        .catch(error => console.error('Error updating user:', error));
}
