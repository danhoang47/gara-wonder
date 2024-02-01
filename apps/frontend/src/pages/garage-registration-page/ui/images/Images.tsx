import { FileInput } from "@/core/ui";
import RegistrationSection from "../registration-section";
import { useState } from "react";
import ImagePreview from "./ImagePreview";

function Images() {
    const [backgroundImage, setBackgroundImage] = useState<File>();
    const [images, setImages] = useState<File[]>();

    const onImageRemove = (fileName: string) => {
        setImages((imgs) => imgs?.filter(({ name }) => name !== fileName));
    };

    const onMultipleFileInputValueChange = (fs: File[]) => {
        if (!images) {
            setImages(fs);
            return;
        }

        setImages((prev) =>
            prev
                ? [
                      ...prev,
                      ...fs.filter(({ name }) =>
                          prev.some(({ name: n }) => n === name),
                      ),
                  ]
                : fs,
        );
    };

    return (
        <RegistrationSection
            header="Images"
            description="Insert images about your garages"
            className="pb-20"
        >
            <div className="mb-4">
                <div className="mb-2">
                    <p className="font-medium">Background Image</p>
                </div>
                {backgroundImage ? (
                    <ImagePreview
                        file={backgroundImage}
                        onImageRemove={() => setBackgroundImage(undefined)}
                    />
                ) : (
                    <FileInput
                        selectionMode="single"
                        onValueChange={(f) => setBackgroundImage(f)}
                    />
                )}
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <p className="font-medium">Other Images</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {images?.map((file) => (
                        <ImagePreview
                            key={file.name}
                            file={file}
                            onImageRemove={onImageRemove}
                        />
                    ))}
                    <FileInput
                        selectionMode="multiple"
                        onValueChange={onMultipleFileInputValueChange}
                        showLabel={false}
                    />
                </div>
            </div>
        </RegistrationSection>
    );
}

export default Images;
