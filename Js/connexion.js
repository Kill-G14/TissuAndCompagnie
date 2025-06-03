// connexionModal.js
const templateObjects = {};
const modalContainer = document.getElementById('modalContainer');
const connexionBtn = document.getElementById('btnModal');
let modalElement = null;

loadTemplate('./components/modal.html');

async function loadTemplate(path) {
    try {
        const response = await fetch(path);
        const htmlContent = await response.text();
        const parser = new DOMParser();
        const templateDoc = parser.parseFromString(htmlContent, 'text/html');
        const templates = templateDoc.querySelectorAll('template');

        templates.forEach((template) => {
            const templateId = template.id;
            templateObjects[templateId] = template.content;
        });

        initModalBehavior();
    } catch (error) {
        console.error('Erreur de chargement du template :', error);
    }
}

function initModalBehavior() {
    if (!connexionBtn) return;

    connexionBtn.addEventListener('click', (event) => {
        event.stopPropagation();

        if (!modalElement) {
            const clone = templateObjects.modal.cloneNode(true);
            modalElement = clone.querySelector('.modalOverlay');

            modalElement.style.position = 'absolute';
            modalElement.style.zIndex = '100';

            modalElement.addEventListener('click', () => closeModal());

            const modalContent = modalElement.querySelector('.modalContent');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => e.stopPropagation());
            }

            modalContainer.appendChild(modalElement);

            // Attacher le submit ici
            const loginForm = modalElement.querySelector('#loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const email = loginForm.querySelector('#email').value.trim();
                    const password = loginForm.querySelector('#password').value.trim();

                    if (email === '' || password === '') {
                        console.warn('Veuillez remplir tous les champs.');
                        return;
                    }

                    connect(email, password);
                });
            }
        } else {
            closeModal();
        }
    });

    document.addEventListener('click', () => {
        if (modalElement && modalContainer.contains(modalElement)) {
            closeModal();
        }
    });
}

function closeModal() {
    if (modalElement && modalContainer.contains(modalElement)) {
        modalContainer.removeChild(modalElement);
        modalElement = null;
    }
}

async function connect (email, password) {
  const headers = {
    'Content-Type': 'application/json'
  };
  const method = 'POST';
  const body = JSON.stringify(
    {
      action: 'connect',
      email: email,
      password: password
    }
  );

  const result = await fetch('http://localhost/TissuAndCompagnie-Backend/Api/ConnectionBack.php', {
    method: method,
    headers: headers,
    body: body,
  });

  const response = await result.json();
  console.log(response);

  if (response.succes && response.token) {
    localStorage.setItem('token', response.token);
    console.log("connexion reussie" + response.token);
  } else {
    console.warn("Erreur de connexion.");
  }
}