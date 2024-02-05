import { FileInput } from "@/core/ui";
import RegistrationSection from "../registration-section";
import ImagePreview from "./ImagePreview";
import { useGarageRegistrationContext } from "../../hooks";

function Images() {
    const { garageRegistrationState: {
        backgroundImage,
        images
    }, setGarageRegistrationStateValue } = useGarageRegistrationContext();

    const onImageRemove = (fileName: string) => {
        setGarageRegistrationStateValue("images", images?.filter(({ name }) => name !== fileName));
    };

    const onMultipleFileInputValueChange = (fs: File[]) => {
        if (!images) {
            setGarageRegistrationStateValue("images", fs);
            return;
        }

        setGarageRegistrationStateValue("images", 
            images
                ? [
                      ...images,
                      ...fs.filter(({ name }) =>
                      images.some(({ name: n }) => n === name),
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
                        onImageRemove={() => setGarageRegistrationStateValue("backgroundImage", undefined)}
                    />
                ) : (
                    <FileInput
                        selectionMode="single"
                        onValueChange={(f) => setGarageRegistrationStateValue("backgroundImage", f)}
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
