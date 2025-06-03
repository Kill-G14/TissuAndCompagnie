document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();
  
      if (email === '' || password === '') {
        console.warn('Veuillez remplir tous les champs.');
        return;
      }
      connect(email, password);
    });
  });

  async function connect (email, password) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const method = 'POST';
    const body = JSON.stringify(
      {
        action: 'connect',
        email: email,
        password: password
      }
    );

    const result = await fetch('http://localhost/TissuAndCompagnie-Backend/Api/ConnectionBack.php', {
      method: method,
      headers: headers,
      body: body,
    });

    const response = await result.json();
    console.log(response);

    if (response.succes && response.token) {
      localStorage.setItem('token', response.token);
      console.log("connexion reussie" + response.token);
    } else {
      console.warn("Erreur de connexion.");
    }
  }