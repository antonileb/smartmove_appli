// Initialise la carte Google Maps et les services Directions
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 48.767, lng: 2.266 } 
    });

    const directionsService = new google.maps.DirectionsService();
    
    // Crée deux rendus d'itinéraire
    const drivingRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: 'blue' }, // Ligne bleue pour voiture
        suppressMarkers: false
    });
    const transitRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: 'green' }, // Ligne verte pour transports en commun
        suppressMarkers: false
    });

    drivingRenderer.setMap(map);
    transitRenderer.setMap(map);

    // Afficher les résultats dans deux sections différentes
    drivingRenderer.setPanel(document.getElementById('drivingDirectionsPanel'));
    transitRenderer.setPanel(document.getElementById('transitDirectionsPanel'));

    document.getElementById('getDirections').addEventListener('click', () => {
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;

        if (origin && destination) {
            calculateAndDisplayRoute(directionsService, drivingRenderer, origin, destination, 'DRIVING');
            calculateAndDisplayRoute(directionsService, transitRenderer, origin, destination, 'TRANSIT');
        } else {
            alert("Veuillez entrer une adresse d'origine et de destination.");
        }
    });
}



// Fonction pour calculer et afficher l'itinéraire
function calculateAndDisplayRoute(directionsService, renderer, origin, destination, mode) {
    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: mode,  // Mode de transport
            provideRouteAlternatives: false,
        },
        (response, status) => {
            if (status === 'OK') {
                renderer.setDirections(response);
            } else {
                alert('Impossible de récupérer l\'itinéraire pour ' + mode + ' : ' + status);
            }
        }
    );
}

// Charger la carte et les services Directions lorsque la page est prête
window.onload = initMap;
