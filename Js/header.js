// Vérifie si l'utilisateur est connecté
const estConnecte = localStorage.getItem('isConnected') === 'true';

// Récupération des éléments du DOM
const btnInscription = document.getElementById('btnInscription');
const btnConnexion = document.getElementById('btnConnexion');
const btnProfil = document.getElementById('btnProfil');

// Affiche/Masque les bons boutons
if (estConnecte) {
    btnInscription.style.display = 'none';
    btnConnexion.style.display = 'none';
    btnProfil.style.display = 'inline-block';
} else {
    btnInscription.style.display = 'inline-block';
    btnConnexion.style.display = 'inline-block';
    btnProfil.style.display = 'none';
}
