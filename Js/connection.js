document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      const data = {
        action: 'connect',
        email: email,
        password: password
      };
  
      fetch('http://localhost/TissuAndCompagnie-Backend/Api/ConnectionBack.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau : ' + response.status);
        }
        return response.json();
      })
      .then(result => {
        if (result.success) {
          alert('Connexion réussie. Bienvenue ' + result.user.name + ' !');

        } else {
          alert('Erreur : ' + result.message);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      });
    });
  });