import axios from "axios"

export type PlacePrediction = {
    place: string,
    placeId: string,
    text: {
        text: string,
        matches: Array<{ endOffset: number }>
    }
}

export type Suggestions = Array<Record<"placePrediction", PlacePrediction>>

export type PlaceResponse = {
    suggestions: Suggestions
}

export default async function getPlaceSuggestions(input: string) {
    try {
        const result = await axios.post<PlaceResponse>("https://places.googleapis.com/v1/places:autocomplete", {
            input,
        }, {
            headers: {
                "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }
        })

        return result.data.suggestions.map(suggestion => suggestion.placePrediction)
    } catch (error) {
        return Promise.reject(error)
    }
}