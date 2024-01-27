import { FieldRegister } from "@/core/hooks/useForm";
import { GarageFormState } from "../../GarageRegistrationPage";
import RegistrationSection from "../registration-section";
import { Input } from "@/core/ui";

export type AddressProps = {
    register: FieldRegister<GarageFormState>;
};

function Address({ register }: AddressProps) {
    return (
        <RegistrationSection
            header={"Address"}
            description={
                "Pointing our the cursor on the map to locale your address"
            }
        >
            <div className="flex flex-wrap gap-3">
                <Input
                    variant="bordered"
                    placeholder="Enter your street"
                    label="Street"
                    {...register("street", "textbox", {
                        required: "Garage's name must be provided",
                    })}
                />
                <div className="flex gap-3 grow">
                    <Input
                        variant="bordered"
                        placeholder="Enter district"
                        label="District"
                        {...register("district", "textbox", {
                            required: "Garage's name must be provided",
                        })}
                        className="grow"
                    />
                    <Input
                        variant="bordered"
                        placeholder="Enter province"
                        label="province"
                        {...register("province", "textbox", {
                            required: "Garage's name must be provided",
                        })}
                        className="grow"
                    />
                </div>
            </div>
        </RegistrationSection>
    );
}

export default Address;
