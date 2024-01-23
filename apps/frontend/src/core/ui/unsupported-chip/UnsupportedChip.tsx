import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UnsupportedChip() {
    return (
        <div className="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full scale-75">
            <FontAwesomeIcon icon={faX} size="xs" className="text-white " />
        </div>
    );
}

export default UnsupportedChip;
