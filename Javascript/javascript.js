let map = L.map('map').setView([-23.55052, -46.633308], 15); // Posição inicial (São Paulo)

// Adiciona o mapa do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Adiciona um marcador inicial
let marker = L.marker([-23.55052, -46.633308]).addTo(map);

// Função para atualizar o mapa com a posição do usuário
function updateLocation(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    
    marker.setLatLng([lat, lng]); // Atualiza a posição do marcador
    map.setView([lat, lng], 17); // Centraliza no usuário (zoom maior para mais precisão)
}

// Se houver erro ao obter localização
function locationError(error) {
    console.error("Erro ao obter localização:", error);
}

// Tenta pegar a localização do usuário com alta precisão
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, locationError, {
        enableHighAccuracy: true, // Usa GPS se disponível
        timeout: 10000, // Tempo máximo para obter a posição
        maximumAge: 0 // Sempre pega a posição mais recente
    });
} else {
    console.log("Geolocalização não suportada pelo navegador.");
}
