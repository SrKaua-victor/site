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
function trocarRota(numero) {
    const titulo = document.querySelector("#title-section h1");
    const tempo = document.querySelector("#tempo p");

    // Altera título
    titulo.textContent = `Rota 0${numero}`;

    // Define tempo de espera fictício
    const tempos = {
        1: "5 minutos",
        2: "7 minutos",
        3: "3 minutos",
        4: "10 minutos"
    };

    // Atualiza texto
    tempo.innerHTML = `<span class="tempoespera">Tempo de espera:</span> ${tempos[numero]}`;

    // Define coordenadas fictícias das rotas
    const coordenadas = {
        1: [-23.55052, -46.633308], // São Paulo
        2: [-23.551, -46.630],      // Próximo
        3: [-23.553, -46.635],
        4: [-23.554, -46.637]
    };

    // Atualiza visualização do mapa e marcador
    let novaCoordenada = coordenadas[numero];
    marker.setLatLng(novaCoordenada);
    map.setView(novaCoordenada, 15);
}
