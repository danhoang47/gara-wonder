import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

export type FileInputProps = {
    selectionMode?: "single" | "multiple";
    // TODO: add accept attribute for input
    type?: "all" | "image" | "excel";
};

function FileInput({ selectionMode = "single" }: FileInputProps) {
    const id = useId();

    return (
        <label
            htmlFor={id}
            className="bg-[#F6F7FB] aspect-video rounded-xl flex items-center"
        >
            <input
                id={id}
                hidden
                multiple={selectionMode === "multiple"}
                type="file"
            />
            <div className="mx-auto flex gap-2 items-center px-4 py-2 border-2 rounded-lg cursor-pointer">
                <FontAwesomeIcon icon={faImage} />
                <p>Image Upload</p>
            </div>
        </label>
    );
}

export default FileInput;
