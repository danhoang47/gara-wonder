import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

function OpenImagesButton({ onClick }: { onClick: () => void }) {
    return <div onClick={onClick} className="absolute right-2 bottom-2">
        <Button size="sm" className="bg-white rounded-md font-medium p-2 border-black border-1" radius="none" disableAnimation><FontAwesomeIcon icon={faList}/> View image</Button>
    </div>
}

export default OpenImagesButton;