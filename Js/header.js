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

async function tokenVerif() {
    const token = localStorage.getItem('token');
    if (token) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const body = JSON.stringify({
            action: 'checkToken',
            token: token
        });
    
        const result = await fetch('http://localhost/TissuAndCompagnie-Backend/api/ConnectionBack.php', {
            method: 'POST',
            headers: headers,
            body: body,
        });
    
        const response = await result.json();
        console.log(response);
    
        if (response.success) {
            updateHeaderButtons();
            console.log("Token valide.");    
        } else {
            localStorage.removeItem('token');
        }
    }
}

