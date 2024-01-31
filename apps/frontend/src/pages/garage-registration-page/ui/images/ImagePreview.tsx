import { useEffect, useState } from "react";

export type ImagePreviewProps = {
    file: File;
    readonly?: boolean;
    selectable?: boolean;
    onImageRemove?: () => void;
    onImageSelect?: () => void
}

export default function ImagePreview({ 
    file,
    readonly = false,
    selectable = false,
    onImageRemove,
    onImageSelect
}: ImagePreviewProps) {
    const [imageURL, setImageURL] = useState<string>()

    useEffect(() => {
        let objectURL: string;
        if (file) {
            objectURL = URL.createObjectURL(file)
            setImageURL(objectURL)
        }

        return () => URL.revokeObjectURL(objectURL)
    }, [])

    return (
        <div className="block">
            <img src={imageURL}/>
        </div>
    )
}