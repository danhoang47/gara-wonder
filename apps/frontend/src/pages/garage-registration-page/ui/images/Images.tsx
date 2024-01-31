import { FileInput } from "@/core/ui";
import RegistrationSection from "../registration-section";
import { useState } from "react";
import ImagePreview from "./ImagePreview";

function Images() {
    const [backgroundImage, setBackgroundImage] = useState<File>();
    const [images, setImages] = useState<File[]>();

    return (
        <RegistrationSection
            header="Images"
            description="Insert images about your garages"
        >
            <div className="mb-4">
                <div className="mb-2">
                    <p className="font-medium">Background Image</p>
                </div>
                {backgroundImage ? 
                    <ImagePreview file={backgroundImage}/> : 
                    <FileInput 
                        selectionMode="single" 
                        onValueChange={(f) => setBackgroundImage(f)}
                    />
                }
            </div>
            <div className="mb-4">
                <div className="mb-2">
                    <p className="font-medium">Other Images</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {images?.map(file => <ImagePreview file={file}/>)}
                    <FileInput selectionMode="multiple" onValueChange={(fs) => setImages(prev => prev ? [...prev, fs] : fs)}/>
                </div>
            </div>
        </RegistrationSection>
    );
}

export default Images;
