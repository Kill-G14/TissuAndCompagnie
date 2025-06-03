const templateObjects = {}
const modalContainer = document.getElementById('modalContainer')
const connexionBtn = document.getElementById('btnModal')
let modalElement = null


loadTemplate('./components/modal.html')

async function loadTemplate(path) {
    try {
        const response = await fetch(path)
        const htmlContent = await response.text()
        const convertisseur = new DOMParser()
        const templateDoc = convertisseur.parseFromString(htmlContent, 'text/html')
        const templates = templateDoc.querySelectorAll('template')

        templates.forEach((template) => {
            const templateId = template.id
            templateObjects[templateId] = template.content
        })

        console.log('Templates chargés :', templateObjects)

        // Initialise les interactions après le chargement
        initModalBehavior()
    } catch (error) {
        console.error('Erreur de chargement du template :', error)
    }
}

function initModalBehavior() {
    if (!connexionBtn) {
        console.warn('Bouton Connexion introuvable.');
        return;
    }

    connexionBtn.addEventListener('click', (event) => {
        event.stopPropagation();

        if (!modalElement) {
            const clone = templateObjects.modal.cloneNode(true);
            modalElement = clone.querySelector('.modalOverlay');

            // Positionner et styliser la modal
            modalElement.style.position = 'absolute';
            modalElement.style.zIndex = '100';

            // Fermer la modal si on clique sur l'overlay
            modalElement.addEventListener('click', () => {
                closeModal();
            });

            // Empêcher la fermeture si on clique dans le contenu interne
            const modalContent = modalElement.querySelector('.modalContent');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            modalContainer.appendChild(modalElement);

            attachLoginBehavior(modalElement);
        } else {
            closeModal();
        }
    });

    // Fermer la modal si on clique ailleurs
    document.addEventListener('click', () => {
        if (modalElement && modalContainer.contains(modalElement)) {
            closeModal();
        }
    });
}

// Fonction utilitaire pour fermer proprement la modal
function closeModal() {
    if (modalElement && modalContainer.contains(modalElement)) {
        modalContainer.removeChild(modalElement);
        modalElement = null;
    }
}
