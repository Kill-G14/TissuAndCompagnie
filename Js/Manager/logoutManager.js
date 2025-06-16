async function disconnect() {
    const headers = {
      "Content-Type": "application/json",
    };
    const method = "POST";
    const body = JSON.stringify({
      token: localStorage.getItem("token"),
      action: "disconnect",
    });
  
    const result = await fetch(
      "http://localhost/TissuAndCompagnie-Backend/api/ConnexionBack.php",
      {
        method: method,
        headers: headers,
        body: body,
      }
    );
  
    if (result.ok) {
      localStorage.removeItem("token");
      const resultJson = await result.json();
      console.log(resultJson.message);
      window.location.href = "connexion.html";
    } else {
      console.error("Erreur lors de la déconnexion");
    }
  }