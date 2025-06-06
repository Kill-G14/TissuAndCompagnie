function updateHeaderButtons() {

    const token = localStorage.getItem('token');
    console.log(token);
    const estConnecte = token;

    const btnInscription = document.getElementById('btnInscription');
    console.log(btnInscription);
    
    const btnConnexion = document.getElementById('btnModal');
    console.log(btnConnexion);
    
    const btnProfil = document.getElementById('btnProfil');
    console.log(btnProfil);
    

    if (btnInscription && btnConnexion && btnProfil) {
        if (estConnecte) {
            btnInscription.style.display = 'none';
            btnConnexion.style.display = 'none';
            btnProfil.style.display = 'inline-block';
        } else {
            btnProfil.style.display = 'none';
        }
    }
}
