import { Textarea } from "@nextui-org/react";
import { Input } from "@/core/ui";
import { RegistrationSection } from "..";
import { FieldRegister } from "@/core/hooks/useForm";
import { GarageFormState } from "../../GarageRegistrationPage";

export type BasicInformationProps = {
    register: FieldRegister<GarageFormState>
}

export default function BasicInformation({ register }: BasicInformationProps) {

    return (
        <RegistrationSection heading="Basic Information" description="Some descriptive information about this part of registration">
            <div className="mb-2">
                <p className="font-medium">Basic Information</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Input
                    variant="bordered"
                    placeholder="Enter Garage Name"
                    label="Garage Name"
                    {...register("name", "textbox", { required: "Garage's name must be provided" })}
                />
                <Textarea
                    variant="bordered"
                    placeholder="Enter Description"
                    label="Description"
                    multiple
                    minRows={6}
                    {...register("description")}
                />
            </div>
        </RegistrationSection>
    );
}
