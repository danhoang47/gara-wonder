
export default async function getDistance(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
) {
    try {
        const service = new google.maps.DistanceMatrixService();
        const response = await service.getDistanceMatrix({
            destinations: [destination],
            origins: [origin],
            travelMode: google.maps.TravelMode.DRIVING
        });

        return response.rows[0].elements[0].distance;
    } catch (error) {
        return Promise.reject(error);
    }
}
