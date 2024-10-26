import { defineStore } from 'pinia';

const accessToken = 'pk.eyJ1Ijoicm9tYXF1ZSIsImEiOiJjbGx4NmZoYjIwdW1iM2NwanJ0cHlhdng0In0.NJ-N1lV1FOUFxcJB_t0bUQ';

export const mapBoxDistancia = defineStore('mapbox-distacia', {
    actions: {
        async geocodeConvert(address) {
            try {
                const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + accessToken);
                const data = await response.json();
                const coordinates = data.features[0].center;
                return coordinates;
            } catch (error) {
                console.error('Erro ao converter endereço:', error);
                throw error;
            }
        },
        async getDistance(startAddress, endAddress) {
            try {
                const startCoords = await this.geocodeConvert(startAddress);
                const endCoords = await this.geocodeConvert(endAddress);

                const response = await fetch('https://api.mapbox.com/directions-matrix/v1/mapbox/driving/' + startCoords[0] + ',' + startCoords[1] + ';' + endCoords[0] + ',' + endCoords[1] + '?sources=all&destinations=all&annotations=distance&access_token=' + accessToken);
                const data = await response.json();

                return data;
            } catch (error) {
                console.error('Erro ao atualizar o mapa:', error);
                throw error; // lançar o erro novamente para que possa ser tratado no chamador
            }
        }
    }
});
