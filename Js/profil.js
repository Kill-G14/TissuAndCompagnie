document.addEventListener("DOMContentLoaded", () => {
  tokenVerif();

  btnDeconnexion.addEventListener("click", async () => {
      disconnect();
  })
  const btnModifier = document.getElementById("btnModifier");
  const btnDeconnexion = document.getElementById("btnDeconnexion");

  // Fonction de récupération des données
  async function chargerInformationsUtilisateur() {
      try {
          const response = await fetch('http://localhost/TissuAndCompagnie-Backend/api/ProfilBack.php', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json" + localStorage.getItem("token")
              },
              body: JSON.stringify({ action: "getUserInfos" })
          });

          const result = await response.json();

          if (result.success && result.data) {
              const spans = document.querySelectorAll(".coordoneesInfo span");
              spans[0].textContent = result.data.adresse || "Non renseignée";
              spans[1].textContent = result.data.adresseLivraison || "Non renseignée";
              spans[2].textContent = result.data.telephone || "Non renseigné";
              spans[3].textContent = result.data.email || "Non renseigné";
          } else {
              alert("Impossible de charger les informations de l'utilisateur.");
          }
      } catch (error) {
          console.error("Erreur lors du chargement des données :", error);
      }
  }

  //fonction de chargement au chargement de la page
  chargerInformationsUtilisateur();

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

  //Fonction deconnexion
  btnDeconnexion.addEventListener("click", async () => {
      try {
          const result = await fetch('http://localhost/TissuAndCompagnie-Backend/api/DeconnexionBack.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: localStorage.getItem('token') })
          });

          const response = await result.json();

          if (response.success) {
              localStorage.removeItem('token');
              window.location.href = '/index.html';
          } else {
              alert("Échec de la déconnexion.");
          }
      } catch (error) {
          console.error("Erreur lors de la requête de déconnexion :", error);
      }
  });
});
