import { useEffect, useState } from "react";
import { SelectItem } from "@nextui-org/react";
import { Input, Select } from "@/core/ui";
import RegistrationSection from "../registration-section";

import provinces, { Province } from "./constants";

function Address() {
    const [selectedProvince, setSelectedProvince] = useState<Province>();
    const [districts, setDistricts] = useState<Array<string>>([]);

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
                    isRequired
                />
                <Input
                    variant="bordered"
                    placeholder="Enter your street"
                    label="Street"
                    isRequired
                />
            </div>
        </RegistrationSection>
    );
}

export default Address;
