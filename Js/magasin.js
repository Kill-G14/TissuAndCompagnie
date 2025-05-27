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
