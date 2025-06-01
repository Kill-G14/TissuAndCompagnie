const templateObjects = {}
loadTemplate('./components/product.html')
async function loadTemplate (path){
    // récuperer le contenu d'un fichier html
    const response = await fetch(path)
    // recupérer le contenu texte du fichier
    const htmlContent = await response.text()
    // on apelle l'outil de conversion
    const convertisseur = new DOMParser()
    // on met le contenu html dans une variable et on le convertie en texte html
    const templateDoc = convertisseur.parseFromString(htmlContent, 'text/html')
    // on recupère les templates
    const templates = templateDoc.querySelectorAll('template')

    templates.forEach((template) => {
        const templateId = template.id
        templateObjects[templateId] = template.content
    })
    console.log(templateObjects);
}
async function getProducts(){
    const response = await fetch(' http://localhost/TissuAndCompagnie-Backend/Api/ProductsController.php')
    const result = await response.json()
    console.log(result.data.products);
    console.log(result.data.pagination);
    console.log(result);
    if (result.status === 'success') {
        const products = result.data.products
        const pagination = result.data.pagination
        const productsContainer = document.querySelector('.containerGrille')
        productsContainer.innerHTML = ''
    
        products.forEach((product) => { 
            const productTemplate = templateObjects['cardProduct'].cloneNode(true)
    
            const typeProduit = productTemplate.querySelector('#typeProduit')
            const couleurProduit = productTemplate.querySelector('#couleurProduit')
            const matiereProduit = productTemplate.querySelector('#matiereProduit')
            const quantiteProduit = productTemplate.querySelector('#quantiteProduit')
            const imageProduit = productTemplate.querySelector('.imgProduit img')
            const prixProduit = productTemplate.querySelector('.prixProduit span')
            const boutonAjouter = productTemplate.querySelector('#buttonAddProduct')
    
            typeProduit.textContent = 'Type : ' + product.type
            couleurProduit.textContent = 'Couleur : ' + product.couleur
            matiereProduit.textContent = 'Matière : ' + product.matiere
            quantiteProduit.textContent = 'Quantité disponible : ' + product.quantite
            imageProduit.src = product.image || '/images/produit-par-defaut.jpg'
            prixProduit.textContent = product.prix + '€ / Metre'
    
            boutonAjouter.addEventListener('click', () => {
                ajouterAuPanier(product)
            })
    
            productsContainer.appendChild(productTemplate)
        })
    }
    
} 

async function ajouterAuPanier(produit) {
    try {
        const response = await fetch('http://localhost/TissuAndCompagnie-Backend/Api/BasketController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: produit.id,
                quantity: 1
            })
        })

        const result = await response.json()

        if (result.status === 'success') {
            alert("Produit ajouté au panier !");
        } else {
            alert("Erreur : " + result.message);
        }
    } catch (error) {
        console.error("Erreur réseau : ", error);
        alert("Erreur de communication avec le serveur.");
    }
}



window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const filtre = params.get('filtre');

    if (filtre) {
        // Coche la case correspondant au filtre
        const checkbox = document.querySelector(`input[name="enVedette"][value="${filtre}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    }
});



