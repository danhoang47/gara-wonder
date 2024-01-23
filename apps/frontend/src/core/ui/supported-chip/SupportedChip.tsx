import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SupportedChip() {
    return (
        <div className="w-6 h-6 flex justify-center items-center bg-primary rounded-full scale-75">
            <FontAwesomeIcon icon={faCheck} size="sm" className="text-white" />
        </div>
    );
}

export default SupportedChip;
