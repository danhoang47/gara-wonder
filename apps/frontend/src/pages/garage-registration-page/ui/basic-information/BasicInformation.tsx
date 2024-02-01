import { Textarea } from "@nextui-org/react";
import { Input } from "@/core/ui";
import { RegistrationSection } from "..";

export default function BasicInformation() {

    return (
        <RegistrationSection header="Basic Information" description="Some descriptive information about this part of registration">
            <div className="mb-2">
                <p className="font-medium">Basic Information</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Input
                    variant="bordered"
                    placeholder="Enter Garage Name"
                    label="Garage Name"
                />
                <Textarea
                    variant="bordered"
                    placeholder="Enter Description"
                    label="Description"
                    multiple
                    minRows={6}
                />
            </div>
        </RegistrationSection>
    );
}
