import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export type ImagePreviewProps = {
    file: File;
    readonly?: boolean;
    selectable?: boolean;
    onImageRemove?: (fileName: string) => void;
    onImageSelect?: () => void;
};

export default function ImagePreview({
    file,
    readonly = false,
    onImageRemove,
}: ImagePreviewProps) {
    const [imageURL, setImageURL] = useState<string>();

    useEffect(() => {
        let objectURL: string;
        if (file) {
            objectURL = URL.createObjectURL(file);
            setImageURL(objectURL);
        }

        return () => URL.revokeObjectURL(objectURL);
    }, []);

    return (
        <div className="relative">
            <img src={imageURL} className="aspect-video object-cover rounded" alt=""/>
            {readonly || (
                <div className="absolute top-1 right-1 flex gap-2">
                    <Button
                        size="sm"
                        variant="bordered"
                        isIconOnly
                        radius="full"
                        className="border-foreground-50"
                        onPress={() =>
                            onImageRemove && onImageRemove(file.name)
                        }
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            size="sm"
                            color="#fff"
                        />
                    </Button>
                </div>
            )}
        </div>
    );
}
