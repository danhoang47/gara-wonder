import { useSupplierRegistrationContext } from "@/pages/supplier-registration-page/hooks";
import React from "react";
import ImagePreview from "./ImagePreview";
import { FileInput } from "@/core/ui";

const UploadImage = () => {
    const {
        supplierRegistrationState: { images },
        setSupplierRegistrationStateValue,
    } = useSupplierRegistrationContext();

    const onImageRemove = (fileName: string) => {
        setSupplierRegistrationStateValue(
            "images",
            images?.filter(({ name }) => name !== fileName),
        );
    };

    const onMultipleFileInputValueChange = (fs: File[]) => {
        if (!images) {
            setSupplierRegistrationStateValue("images", fs);
            return;
        }

        setSupplierRegistrationStateValue(
            "images",
            images
                ? [
                      ...images,
                      ...fs.filter((file) => {
                          return images.filter((imageFile) => {
                              return file !== imageFile;
                          });
                      }),
                  ]
                : fs,
        );
    };

    return (
        <div className="max-w-[30%] w-[300px] flex flex-col gap-1">
            {images?.map((file) => (
                <ImagePreview
                    key={file.name}
                    file={file}
                    onImageRemove={onImageRemove}
                />
            ))}
            <div className="flex-1 w-full w-[300px]">
                <FileInput
                    selectionMode="multiple"
                    onValueChange={onMultipleFileInputValueChange}
                    showLabel={false}
                />
            </div>
        </div>
    );
};

export default UploadImage;
