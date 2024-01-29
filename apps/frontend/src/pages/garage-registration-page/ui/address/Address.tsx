import { useEffect, useState } from "react";
import { SelectItem } from "@nextui-org/react";

import { FieldRegister } from "@/core/hooks/useForm";
import { Input, Select } from "@/core/ui";
import RegistrationSection from "../registration-section";
import { GarageFormState } from "../../GarageRegistrationPage";

import provinces, { Province } from "./constants";

export type AddressProps = {
    register: FieldRegister<GarageFormState>;
};

function Address({ register }: AddressProps) {
    const [selectedProvince, setSelectedProvince] = useState<Province>();
    const [districts, setDistricts] = useState<Array<any>>([]);

    useEffect(() => {
        let isStale = false;
        // TODO: fetch api get districts by province
        const getDistricts = async () => {
            if (!selectedProvince?.code) return;
            
            const data = await fetch("").then((response) => response.json());
            if (isStale) {
                return;
            }
            setDistricts(data);
        };

        getDistricts()
        return () => {
            isStale = true;
        };
    }, [selectedProvince?.code]);

    console.log(selectedProvince);
    return (
        <RegistrationSection
            header={"Address"}
            description={
                "Pointing our the cursor on the map to locale your address"
            }
        >
            <div className="flex flex-wrap gap-3">
                <Select
                    items={provinces}
                    variant="bordered"
                    placeholder="Select province"
                    label="Province"
                    {...register("province", "combobox", {
                        required: "Garage's province must be provided",
                    })}
                    isRequired
                    altOnValueChange={(keys) => {
                        setSelectedProvince(
                            provinces.find(({ code }) => code === Number(keys)),
                        );
                    }}
                >
                    {(province) => (
                        <SelectItem key={province.code}>
                            {province.name}
                        </SelectItem>
                    )}
                </Select>
                <Input
                    items={districts}
                    variant="bordered"
                    placeholder="Enter district"
                    label="District"
                    {...register("district", "textbox", {
                        required: "Garage's district must be provided",
                    })}
                    isRequired
                />
                <Input
                    variant="bordered"
                    placeholder="Enter your street"
                    label="Street"
                    {...register("street", "textbox", {
                        required: "Garage's street address must be provided",
                    })}
                    isRequired
                />
            </div>
        </RegistrationSection>
    );
}

export default Address;
