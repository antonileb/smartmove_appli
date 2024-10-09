// Fonction pour charger les adresses à partir du Local Storage
function loadAddresses() {
    const addressList = document.getElementById('addressList');
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];

    addresses.forEach(address => {
        createAddressItem(addressList, address); // Appel de la fonction pour créer un élément li
    });
}

// Fonction pour ajouter une adresse à la liste et au Local Storage
function addAddress() {
    const addressInput = document.getElementById('addressInput');
    const addressList = document.getElementById('addressList');

    if (addressInput.value.trim() !== '') {
        const newAddress = addressInput.value.trim();
        let addresses = JSON.parse(localStorage.getItem('addresses')) || [];

        // Vérification si l'adresse n'existe pas déjà
        if (!addresses.includes(newAddress)) {
            addresses.push(newAddress);
            localStorage.setItem('addresses', JSON.stringify(addresses));

            createAddressItem(addressList, newAddress); // Appel de la fonction pour créer un élément li
            addressInput.value = ''; // Vider l'input
        } else {
            alert('Cette adresse est déjà enregistrée.');
        }
    } else {
        alert('Veuillez entrer une adresse.');
    }
}

// Fonction pour créer un élément <li> avec une adresse et un bouton de suppression
function createAddressItem(addressList, address) {
    const li = document.createElement('li');
    
    // Création du texte de l'adresse
    const span = document.createElement('span');
    span.classList.add('address-text');
    span.textContent = address;

    // Création du bouton de suppression
    const button = document.createElement('button');
    button.classList.add('delete-icon');
    button.textContent = 'x';
    button.onclick = function() {
        deleteAddress(button, address);
    };

    // Ajout du texte et du bouton dans l'élément li
    li.appendChild(span);
    li.appendChild(button);

    // Ajout de l'élément li dans la liste des adresses
    addressList.appendChild(li);

    // Ajoute une action de clic sur l'élément pour calculer l'itinéraire
    li.onclick = function() {
        if (event.target.tagName !== 'BUTTON') { // S'assurer que le bouton de suppression n'active pas ce clic
            alert(`Calcul des moyens d'accès pour: ${address}`);
        }
    };
}

// Fonction pour supprimer une adresse de la liste et du Local Storage
function deleteAddress(button, address) {
    const li = button.parentElement;
    li.remove(); // Supprime l'élément <li> de la liste

    // Mise à jour du Local Storage
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses = addresses.filter(a => a !== address); // Retirer l'adresse supprimée
    localStorage.setItem('addresses', JSON.stringify(addresses));
}







// COVOITURAGE 

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const carpoolList = document.getElementById('carpoolList');

    // Chargement initial des annonces enregistrées
    loadCarpools();

    addButton.addEventListener('click', function() {
        addCarpool();
    });

    function addCarpool() {
        const from = document.getElementById('from').value.trim();
        const to = document.getElementById('to').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Vérification que les champs sont remplis
        if (from && to && date && time) {
            const newCarpool = { from, to, date, time };
            let carpools = JSON.parse(localStorage.getItem('carpools')) || [];

            // Ajout de l'annonce dans localStorage
            carpools.push(newCarpool);
            localStorage.setItem('carpools', JSON.stringify(carpools));

            // Ajout de l'annonce dans l'UI
            createCarpoolItem(newCarpool);

            // Réinitialiser les champs du formulaire
            document.getElementById('carpoolForm').reset();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }

    function createCarpoolItem(carpool) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <span><strong>Départ :</strong> ${carpool.from}</span><br>
                <span><strong>Destination :</strong> ${carpool.to}</span><br>
                <span><strong>Date :</strong> ${carpool.date} à ${carpool.time}</span>
            </div>
            <button class="delete-btn">Supprimer</button>
        `;

        // Ajout de la fonctionnalité de suppression
        li.querySelector('.delete-btn').addEventListener('click', function() {
            deleteCarpool(li, carpool);
        });

        carpoolList.appendChild(li);
    }

    function deleteCarpool(li, carpool) {
        // Suppression de l'élément visuellement
        li.remove();

        // Suppression de l'annonce dans localStorage
        let carpools = JSON.parse(localStorage.getItem('carpools'));
        carpools = carpools.filter(c => c.from !== carpool.from || c.to !== carpool.to || c.date !== carpool.date || c.time !== carpool.time);
        localStorage.setItem('carpools', JSON.stringify(carpools));
    }

    function loadCarpools() {
        const carpools = JSON.parse(localStorage.getItem('carpools')) || [];
        carpools.forEach(carpool => {
            createCarpoolItem(carpool);
        });
    }
});


// IA 

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    sendBtn.addEventListener('click', async () => {
        const userMessage = userInput.value.trim();

        if (userMessage) {
            // Afficher le message de l'utilisateur dans le chat
            appendMessage('user', userMessage);

            // Envoyer la requête à l'API via notre serveur Flask
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();

            // Afficher la réponse du chatbot
            appendMessage('assistant', data.response);

            // Effacer l'input utilisateur
            userInput.value = '';
        }
    });

    function appendMessage(role, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role === 'user' ? 'user-message' : 'assistant-message');
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroller automatiquement vers le bas
    }
});

// Charger les adresses lorsque la page est chargée
window.onload = loadAddresses;
// // Charger les annonces de covoiturage au chargement de la page
// window.onload = loadCarpoolList;
