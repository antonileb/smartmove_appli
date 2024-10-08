document.getElementById('generateBtn').addEventListener('click', function() {
    const currentLocation = document.getElementById('currentLocation').value;
    const userInput = document.getElementById('userInput').value;

    // Vérifie si l'utilisateur a entré du texte
    if (currentLocation === "" || userInput === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Préparer la requête avec l'input de l'utilisateur
    const prompt = `Je me trouve ici : "${currentLocation}" et j'aimerais aller à "${userInput}". Peux-tu me dire tous les moyens pour s'y rendre, s'il te plaît ? fait moi une reponse courte en me donnant l'itinéraire en transport en commun ou celle de la voiture, précise moi la durée de chaque trajet, pas plus de 20 ligne !`;
    // Envoi de la requête POST au serveur Flask
    fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            // Formater la réponse en supprimant les caractères indésirables
            const formattedResponse = formatResponse(data.response);
            // Affiche la réponse dans le conteneur
            document.getElementById('responseContainer').innerHTML = `<p class='reponse_bot'>${formattedResponse}</p>`;
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});

// Fonction pour formater la réponse
function formatResponse(response) {
    // Supprime les astérisques et les hashtags, et remplace les sauts de ligne par des <br>
    return response
        .replace(/\*/g, '')   // Supprime les astérisques
        .replace(/#/g, '')    // Supprime les hashtags
        .replace(/\*\*/g, '') // Supprime les doubles astérisques
        .replace(/<\/?strong>/g, '') // Supprime les balises strong
        .replace(/<\/?h\d>/g, '') // Supprime les balises h1, h2, etc.
        .replace(/\n/g, '<br>'); // Remplace les sauts de ligne par <br>
}


