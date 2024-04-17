import { PlacePrediction } from "@/api/garages/getPlaceSuggestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export type SuggestionAddressProps = {
    placePrediction: PlacePrediction;
    onPress: (place: PlacePrediction) => void;
};

function SuggestionAddress({
    placePrediction,
    onPress,
}: SuggestionAddressProps) {
    return (
        <div
            className="w-full flex gap-4 p-4 hover:bg-foreground-100 cursor-pointer"
            onMouseDown={() => {
                onPress(placePrediction)
            }}
            tabIndex={0}
            role="listitem"
        >
            <div>
                <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <p>{placePrediction.text.text}</p>
        </div>
    );
}

export default SuggestionAddress;
