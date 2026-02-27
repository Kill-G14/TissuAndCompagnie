class connexionManager {

    static async connect(email, password) {
        const headers = {
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            action: 'connect',
            email: email,
            password: password
        });
        try {
            const result = await fetch('http://localhost/TissuAndCompagnie-Backend/api/ConnexionBack.php', {
                method: 'POST',
                headers: headers,
                body: body,
            });
    
            const response = await result.json();
            console.log(response);
    
            if (response.success && response.token) {
                localStorage.setItem('token', response.token);
                console.log("Connexion réussie : " + response.token);
                closeModal();
                updateHeaderButtons();
            } else {
                console.warn("Échec de la connexion.");
            }
        } catch (error) {
            console.error("Erreur lors de la requête de connexion :", error);
        }
    }
    
}