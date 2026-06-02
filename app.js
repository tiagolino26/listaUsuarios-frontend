const URL = "https://listausuarios-backend.onrender.com";

// Método GET
async function getAllUsers() {
  let url = `${URL}/users/getAllUsers`;
  let resp = await fetch(url);
  if (!resp.ok) {
    console.error("Erro ao buscar usuários:", resp.statusText);
    return;
  }
  let data = await resp.json();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    let usuario = data[i];
    let linha = `
      <tr>
        <td>${usuario.name}</td>
        <td>${usuario.idade}</td>
        <td>${usuario.email}</td>
        <td class="actions">
          <button class="btn btn-edit" data-id="${usuario.id}" data-name="${usuario.name}" data-idade="${usuario.idade}" data-email="${usuario.email}" data-senha="${usuario.password}">Editar</button>
          
          <button class="btn btn-delete" onclick="deleteUser('${usuario.id}')">Excluir</button>
        </td>
      </tr>
    `;

    let container = document.querySelector("#user-table-body");
    container.innerHTML += linha;
  }
}
getAllUsers();

// Método POST
async function createUser() {
  let url = `${URL}/users/createUsers`;

  let nome = document.querySelector("#nome").value;
  let idade = document.querySelector("#idade").value;
  let email = document.querySelector("#email").value;
  let senha = document.querySelector("#senha").value;

  let body = {
    name: nome,
    idade: idade,
    email: email,
    password: senha,
  };

  // console.log(body);

  let resp = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  window.location.reload();
}

document.querySelector(".btn-save").addEventListener("click", createUser);

// Método PUT
document.querySelector(".table-section").addEventListener("click", (e) => {
  const button = e.target.closest(".btn-edit");
  if (button) {
    // console.log(document.querySelector(".btn-save"));
    document.querySelector(".btn-save").innerText = "Editar";
    document.querySelector("#nome").value = button.dataset.name;
    document.querySelector("#idade").value = button.dataset.idade;
    document.querySelector("#email").value = button.dataset.email;
    const id = button.dataset.id;
    // document.querySelector("#senha").value = button.dataset.senha;
    updateUsers();
  }
});

async function updateUsers(id) {
  document.querySelector(".btn-save").removeEventListener("click", createUser);

  document.querySelector(".btn-save").addEventListener("click", async () => {
    let url = `${URL}/users/updateUsers/${id}`;

    let nome = document.querySelector("#nome").value;
    let idade = document.querySelector("#idade").value;
    let email = document.querySelector("#email").value;
    // let senha = document.querySelector("#senha").value;
  });
}

// Método DELETE
async function deleteUser(id) {
  let url = `${URL}/users/deleteUsers/${id}`;
  let resp = await fetch(url, {
    method: "DELETE",
  });
  window.location.reload();
}
