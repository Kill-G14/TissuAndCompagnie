document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value.trim()
    const name = document.getElementById('Nom').value.trim()
    const prenom = document.getElementById('Prenom').value.trim()
    const telephone = document.getElementById('telephone').value.trim()
    const adresse = document.getElementById('Adresse').value.trim()
    const adresse2 = document.getElementById('Adresse2').value.trim()
    const pays = document.getElementById('Pays').value.trim()
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.')
        return
    }

    const userData = {
        action: 'registerNewUser',
        email: email,
        userName: `${prenom} ${name}`,// concaténer pour correspondre au champ `name` attendu
        password: password,
        telephone: telephone,
        adresse: adresse,
        adresse2: adresse2,
        pays: pays
    }

    try {
        const response = await fetch('http://localhost/TissuAndCompagnie-Backend/Api/inscriptionBack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const result = await response.json()

        if (result.success) {
            alert(result.message)
            window.location.href = 'connexion.html'
        } else {
            alert('Erreur : ' + result.message)
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error)
        alert('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
})
