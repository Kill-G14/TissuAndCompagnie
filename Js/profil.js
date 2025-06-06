document.addEventListener("DOMContentLoaded", () => {
    tokenVerif();
    const btnModifier = document.getElementById("btnModifier");
    const btnDeconnexion = document.getElementById("btnDeconnexion");
  
    btnModifier.addEventListener("click", async () => {
      const spans = document.querySelectorAll(".coordoneesInfo span");
  
      const data = {
        adresse: spans[0]?.textContent.trim(),
        adresseLivraison: spans[1]?.textContent.trim(),
        telephone: spans[2]?.textContent.trim(),
        email: spans[3]?.textContent.trim(),
        action: "updateUserInfos"
      };
  
      try {
        const response = await fetch('http://localhost/TissuAndCompagnie-Backend/Api/ConnectionBack.php', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert("Informations mises à jour avec succès.");
        } else {
          alert("Erreur : " + result.message);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        alert("Une erreur est survenue.");
      }
    });
  
    btnDeconnexion.addEventListener("click", async () => {
      try {
        const result = await fetch('http://localhost/TissuAndCompagnie-Backend/api/DeconnexionBack.php', {
            method: 'POST',
            headers: {
              //envoye le token pour l'invalider coter serveur
              'Content-Type': 'application/json'+ localStorage.getItem('token'),
            }
        });
    
        const response = await result.json();
        console.log(response);
    
        if (response.success) {
            localStorage.removeItem('token');
            console.log("Déconnexion réussie.");
            window.location.href = '/index.html';
        } else {
            console.warn("Échec de la déconnexion.");
        }
    } catch (error) {
        console.error("Erreur lors de la requête de déconnexion :", error);
    }
    });
  });    