fetch('http://localhost/Api/connectionBack.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        action: 'connect',
        email: 'test@example.com',
        password: 'monmotdepasse'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erreur :', error));
