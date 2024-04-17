import ImagePreview from "./ImagePreview";
import { FileInput } from "@/core/ui";

export type UploadImageProps = {
    images?: File[];
    onImageChanges: (images?: File[]) => void;
};

const UploadImage = ({ images = [], onImageChanges }: UploadImageProps) => {
    const onRemoveImage = (fileName: string) => {
        const newImages = images.filter((image) => image.name !== fileName);
        onImageChanges(newImages);
    };

    return (
        <div className="max-w-[30%] w-full flex flex-col gap-1">
            {images?.map((file) => (
                <ImagePreview
                    key={file.name}
                    file={file}
                    onImageRemove={(fileName) => {
                        // TODO: implement
                        onRemoveImage(fileName);
                    }}
                />
            ))}
            <div className="flex-1 w-full">
                <FileInput
                    selectionMode="multiple"
                    onValueChange={(fs) => {
                        if (fs.length !== 0) {
                            onImageChanges([...images, ...fs]);
                        }
                    }}
                    showLabel={false}
                />
            </div>
        </div>
    );
};

export default UploadImage;
