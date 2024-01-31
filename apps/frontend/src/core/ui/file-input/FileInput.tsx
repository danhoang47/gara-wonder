import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

export type BaseFileInputProps = {
    // TODO: add accept attribute for input
    type?: "all" | "image" | "excel";
    aspect?: "video" | "square";

};

export type SingleFileInputProps = BaseFileInputProps & {
    selectionMode: "single";
    onValueChange: (f: File) => void;
}

export type MultipleFileInputProps = BaseFileInputProps & {
    selectionMode: "multiple";
    onValueChange: (f: File[]) => void;
}

export type FileInputProps = SingleFileInputProps | MultipleFileInputProps

function FileInput({ selectionMode, aspect = "video", onValueChange }: FileInputProps) {
    const id = useId();

    return (
        <label
            htmlFor={id}
            className={`bg-[#F6F7FB] aspect-${aspect} rounded-xl flex items-center`}
        >
            <input
                id={id}
                hidden
                multiple={selectionMode === "multiple"}
                type="file"
                onChange={(e) => {
                    const { files } = e.target

                    if (!files) return

                    if (selectionMode === "multiple") {
                        onValueChange(Array.from(files))
                    } else {
                        onValueChange(files[0])
                    }
                }}
            />
            <div className="mx-auto flex gap-2 items-center px-4 py-2 border-2 rounded-lg cursor-pointer">
                <FontAwesomeIcon icon={faImage} />
                <p>Image Upload</p>
            </div>
        </label>
    );
}

export default FileInput;
