document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value.trim()
    const name = document.getElementById('Nom').value.trim()
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.')
        return
    }

    const userData = {
        action: 'registerNewUser',
        email: email,
        userName: name,
        password: password
    }

    // Champs facultatifs
    const optionalFields = ['Prenom', 'telephone', 'Adresse', 'Adresse2', 'Pays']
    optionalFields.forEach(field => {
        const value = document.getElementById(field)?.value.trim()
        if (value) {
            userData[field.toLowerCase()] = value
        }
    })

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
            alert('Inscription réussie !')
        } else {
            alert(`Erreur : ${result.message}`)
        }
    } catch (error) {
        console.error('Erreur lors de la requête d’inscription :', error)
        alert('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
})
