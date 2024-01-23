import { Garage } from "@/core/types";
import { Textarea } from "@nextui-org/react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from '@/core/ui'


export type BasicInformationProps = {
    register: UseFormRegister<Garage>,
    errors: FieldErrors<Garage>,
    control: Control<Garage, any>
}

export default function BasicInformation({ register, errors, control }: BasicInformationProps) {
    
    return (
        <div className="col-start-4 col-span-4">
            <div className="mb-7">
                <h1 className="text-3xl font-semibold">Basic Information</h1>
                <p className="text-sm">
                    Some descriptive information about this part of registration
                </p>
            </div>
            <div >
                <div className="mb-5">
                    <div className="mb-2">
                        <p className="font-medium">Basic Information</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Input
                            name="name"
                            control={control}
                            variant="bordered"
                            placeholder="Enter Garage Name"
                            label="Garage Name"
                            isRequired
                            isInvalid={Boolean(errors?.name)}
                            errorMessage={errors?.name && "Garage's name is required"}
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
                </div>
            </div>
        </div>
    );
}
