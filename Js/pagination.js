const produits = document.querySelectorAll('.produit');
const produitsParPage = 28;
const totalPages = Math.ceil(produits.length / produitsParPage);
const pagination = document.getElementById('pagination');

let pageActuelle = 1;

function afficherProduits(page) {
    const start = (page - 1) * produitsParPage;
    const end = start + produitsParPage;

    produits.forEach((produit, index) => {
        produit.style.display = (index >= start && index < end) ? 'block' : 'none';
    });

    pageActuelle = page;
    mettreAJourPagination();
}

function mettreAJourPagination() {
    pagination.innerHTML = '';

    // Flèche gauche <
    const btnPrecedent = document.createElement('button');
    btnPrecedent.innerHTML = '&lt;';
    btnPrecedent.disabled = pageActuelle === 1;
    btnPrecedent.addEventListener('click', () => afficherProduits(pageActuelle - 1));
    pagination.appendChild(btnPrecedent);

    // Pages numérotées
    for (let i = 1; i <= totalPages; i++) {
        const bouton = document.createElement('button');
        bouton.innerText = i;
        if (i === pageActuelle) bouton.classList.add('active');
        bouton.addEventListener('click', () => afficherProduits(i));
        pagination.appendChild(bouton);
    }

    // Flèche droite >
    const btnSuivant = document.createElement('button');
    btnSuivant.innerHTML = '&gt;';
    btnSuivant.disabled = pageActuelle === totalPages;
    btnSuivant.addEventListener('click', () => afficherProduits(pageActuelle + 1));
    pagination.appendChild(btnSuivant);
}

afficherProduits(1);

