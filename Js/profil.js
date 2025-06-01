document.addEventListener("DOMContentLoaded", () => {
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
        const response = await fetch('http://localhost/TissuAndCompagnie-Backend/Api/ConnectionBack.php', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "logout" })
        });
  
        const result = await response.json();
  
        if (result.status === "success") {
          alert("Déconnexion réussie.");
          window.location.href = "index.html";
        } else {
          alert("Erreur lors de la déconnexion.");
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        alert("Une erreur est survenue.");
      }
    });
  });
  