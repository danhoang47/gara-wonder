import { FileInput } from "@/core/ui";
import RegistrationSection from "../registration-section";
import { useState } from "react";

function Images() {
    const [backgroundImage, setBackgroundImage] = useState<File>();
    const [images, setImages] = useState<File[]>();

    return (
        <RegistrationSection
            header="Images"
            description="Insert images about your garages"
        >
            <div>
                <div className="mb-2">
                    <p className="font-medium">Background Image</p>
                </div>
                <FileInput />
            </div>
            <div>
                <div className="mb-2">
                    <p className="font-medium">Other Images</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-400">

                    </div>
                    <FileInput />
                </div>
            </div>
        </RegistrationSection>
    );
}

export default Images;
