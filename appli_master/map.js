// La fonction initMap sera appelée une fois l'API Google Maps chargée
function initMap() {
    // Initialiser la carte
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 48.767, lng: 2.266 } 
    });

    // Initialiser Autocomplete pour le champ "origin"
    const originInput = document.getElementById("origin");
    const autocompleteOrigin = new google.maps.places.Autocomplete(originInput, {
        componentRestrictions: { country: "fr" },
        fields: ["address_components", "geometry", "icon", "name"]
    });

    // Initialiser Autocomplete pour le champ "destination"
    const destinationInput = document.getElementById("destination");
    const autocompleteDestination = new google.maps.places.Autocomplete(destinationInput, {
        componentRestrictions: { country: "fr" },
        fields: ["address_components", "geometry", "icon", "name"]
    });

    // Configuration des services Directions
    const directionsService = new google.maps.DirectionsService();

    const drivingRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: 'blue' }
    });
    const transitRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: 'green' }
    });

    drivingRenderer.setMap(map);
    transitRenderer.setMap(map);

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
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: mode,
        provideRouteAlternatives: false,
    }, (response, status) => {
        if (status === 'OK') {
            renderer.setDirections(response);
        } else {
            alert('Impossible de récupérer l\'itinéraire pour ' + mode + ' : ' + status);
        }
    });
}
