const userurl = '/api/user';

fetch(userurl)
    .then(response => response.json())
    .then(user => {
        let roles = '';
        user.roles.forEach(role => {
            roles += ' ' + role.role;
        });
        document.getElementById("navbar-email").innerHTML = user.email;
        document.getElementById("navbar-roles").innerHTML = roles;
    })
    .catch(error => console.error('Error fetching user data:', error));

async function getUserPage() {
    const page = await fetch(userurl);

    if (page.ok) {
        const user = await page.json();
        getInformationAboutUser(user);
    } else {
        alert(`Error, ${page.status}`);
    }
}

function getInformationAboutUser(user) {
    const tableBody = document.getElementById('usertbody');
    let dataHtml = '';
    const roles = [];

    console.log('userData', JSON.stringify(user));

    for (const role of user.roles) {
        roles.push(' ' + role.role.toString().replaceAll('ROLE_', ''));
    }

    dataHtml = `
    <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.surname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>   
    </tr>`;

    tableBody.innerHTML = dataHtml;
}

getUserPage();
