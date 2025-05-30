function getProduct() {
    fetch('http://localhost/TissuAndCompagnie-Backend/Api/ProductsController.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'getProducts'
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success' && result.data.products.length > 0) {
            const product = result.data.products[0];
            renderProduct(product);
        } else {
            console.warn("Aucun produit trouvé.");
        }
    });
}

function renderProduct(product) {
    const categorie = product.categorie?.toLowerCase();

    // Définir le Nom du produit
    const h3 = document.querySelector('h3');
    if (categorie === 'other') {
        h3.textContent = product.nom || 'Produit';
    } else {
        h3.textContent = `${capitalize(categorie)} – ${product.type || 'Type inconnu'}`;
    }

    // Description
    setValueOrHide('descriptionProduit', product.description);

    // Infos communes
    setValueOrHide('prixProduit', product.prix, true);
    setValueOrHide('prixTotalProduit', product.prix, true);
    setValueOrHide('referenceProduit', product.reference);
    setValueOrHide('typeProduit', product.type);

    resetLabel('typeLabel', 'Type :');
    resetLabel('couleurLabel', 'Couleur :');
    resetLabel('matiereLabel', 'Matière :');
    resetLabel('largeurLabel', 'Largeur :');

    hideElement('matiereRow');
    hideElement('trouRow');
    hideElement('largeurRow');

    // Logique par catégorie
    switch (categorie) {
        case 'cloth':
            showElement('matiereRow');
            showElement('largeurRow');
            resetLabel('typeLabel', 'Tissu :');
            resetLabel('largeurLabel', 'Laize/Largeur :');

            setValueOrHide('matiereProduit', product.matiere);
            setValueOrHide('largeurProduit', product.largeur);
            break;

        case 'button':
            showElement('matiereRow');
            showElement('largeurRow');
            showElement('trouRow');
            resetLabel('typeLabel', 'Bouton :');
            resetLabel('largeurLabel', 'Diamètre :');

            setValueOrHide('matiereProduit', product.matiere);
            setValueOrHide('largeurProduit', product.diametre);
            setValueOrHide('nbTrousProduit', product.trous);
            break;

        case 'zip':
            showElement('largeurRow');
            resetLabel('typeLabel', 'Fermeture :');
            resetLabel('largeurLabel', 'Longueur :');

            setValueOrHide('largeurProduit', product.longueur);
            break;

        case 'other':
            if (product.matiere) {
                showElement('matiereRow');
                setValueOrHide('matiereProduit', product.matiere);
            }
            if (product.largeur || product.longueur || product.diametre) {
                showElement('largeurRow');
                resetLabel('largeurLabel', 'Détail dimension :');
                setValueOrHide('largeurProduit', product.largeur || product.longueur || product.diametre);
            }
            if (product.trous) {
                showElement('trouRow');
                setValueOrHide('nbTrousProduit', product.trous);
            }
            break;

        default:
            console.warn("Catégorie non reconnue :", categorie);
            break;
    }

    setValueOrHide('couleurProduit', product.couleur);
}

// Utilitaires
function setValueOrHide(id, value, isPrice = false) {
    const el = document.getElementById(id);
    if (value !== undefined && value !== null && value !== "") {
        el.textContent = isPrice ? `${value} €` : value;
        showElement(getRowId(id));
    } else {
        hideElement(getRowId(id));
    }
}

function resetLabel(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function showElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
}

function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function getRowId(fieldId) {
    return fieldId.replace('Produit', 'Row');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Lancer au chargement
getProduct();
