import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useGarageRegistrationContext } from "../../hooks";
import RegistrationSection from "../registration-section";

import providedAdditionalServices from "./constants";
import TimeInput from "./TimeInput";

function AdditionalServices() {
    const {
        garageRegistrationState,
        garageRegistrationErrors,
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();

    return (
        <RegistrationSection
            header="Additional Services"
            description="Provide the services your garage will serves"
        >
            <CheckboxGroup
                label={
                    "Let us know if your garage have the following additional services"
                }
                classNames={{
                    label: "text-foreground font-bold text-lg",
                }}
            >
                {providedAdditionalServices.map((service) => (
                    <Checkbox key={service.id} value={service.id}>
                        <span>{service.text}</span>
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <div className="mt-6 flex flex-col gap-0.5">
                <p className="text-foreground font-bold text-lg">
                    Provide some useful information for customers
                </p>
                <ul className="pl-8">
                    <li className="list-disc">
                        <div className="flex justify-between">
                            <p>Opening time</p>
                            <TimeInput className="font-semibold text-xl" />
                        </div>
                    </li>
                    <li className="list-disc">
                        <div className="flex justify-between">
                            <p>Closing time</p>
                            <TimeInput className="font-semibold text-xl" />
                        </div>
                    </li>
                </ul>
            </div>
        </RegistrationSection>
    );
}

export default AdditionalServices;
