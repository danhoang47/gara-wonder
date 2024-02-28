import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

function OpenImagesButton({ openGallery }: { openGallery: () => void }) {
    return (
        <div className="absolute right-2 bottom-2">
            <Button
                size="sm"
                className="bg-white rounded-md font-medium p-2 border-black border-1"
                radius="none"
                disableAnimation
                onClick={openGallery}
            >
                <FontAwesomeIcon icon={faList} />
                <p>View image</p>
            </Button>
        </div>
    );
}

export default OpenImagesButton;
