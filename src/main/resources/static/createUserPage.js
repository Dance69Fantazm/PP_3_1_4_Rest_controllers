const formNew = document.getElementById('formForNewUser');
const rolesNew = document.querySelector('#roles').selectedOptions;

formNew.addEventListener('submit', function (event) {
    event.preventDefault();
    addNewUser();
});

function addNewUser() {
    const urlNew = 'api/admins/new';
    const listOfRoles = Array.from(rolesNew).map(option => ({id: option.value}));

    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: formNew.name.value,
            surname: formNew.surname.value,
            age: formNew.age.value,
            email: formNew.email.value,
            password: formNew.password.value,
            roles: listOfRoles
        })
    };

    fetch(urlNew, requestOptions)
        .then(response => {
            if (response.ok) {
                formNew.reset();
                getAdminPage();
                const triggerEl = document.querySelector('#user_table-tab');
                if (triggerEl) {
                    const tabInstance = bootstrap.Tab.getOrCreateInstance(triggerEl);
                    tabInstance.show();
                } else {
                    console.error('Element for switching tabs not found. Check your HTML structure.');
                }
            } else {
                console.error('Ошибка при добавлении пользователя:', response.statusText);
                throw new Error(`Error: ${response.status}`);
            }
        }, 500)
        .catch(error => console.error('Error adding user:', error));
}






