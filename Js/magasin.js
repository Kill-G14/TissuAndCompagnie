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
        // const products = result.data.products
        // const pagination = result.data.pagination
        // const productsContainer = document.querySelector('.containerGrille')
        // productsContainer.innerHTML = ''
        // products.forEach((product) => { 
        //     const productTemplate = templateObjects['cardProduct'].cloneNode(true)
        //     const typeProduit = productTemplate.querySelector('#typeProduit')
        //     const couleurProduit = productTemplate.querySelector('#couleurProduit')
        //     const matiereProduit = productTemplate.querySelector('#matiereProduit')
        //     const quantiteProduit = productTemplate.querySelector('#quantiteProduit')
        //     typeProduit.textContent = 'Type : ' + product.type
        //     couleurProduit.textContent = 'Couleur : ' + product.couleur
        //     matiereProduit.textContent = 'Matière : ' + product.matiere
        //     quantiteProduit.textContent = 'Quantité disponible : ' + product.quantite
        //     productsContainer.appendChild(productTemplate)
        //     }
        // )
    }
}   

