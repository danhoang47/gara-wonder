import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useGarageRegistrationContext } from "../../hooks";
import RegistrationSection from "../registration-section";

import providedAdditionalServices from "./constants";
import TimeInput from "./TimeInput";

function AdditionalServices() {
    const { garageRegistrationState, setGarageRegistrationStateValue } =
        useGarageRegistrationContext();

    return (
        <RegistrationSection
            header="Dịch vụ đi kèm"
            description="Những dịch vụ tiện ích kèm theo trong garage của bạn"
        >
            <CheckboxGroup
                label={
                    "Hãy chọn những dịch vụ đi kèm mà garage của bạn có"
                }
                classNames={{
                    label: "text-foreground font-bold text-lg",
                }}
                defaultValue={garageRegistrationState.additionalServices}
                onValueChange={(value) => {
                    setGarageRegistrationStateValue(
                        "additionalServices",
                        value,
                    );
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
                    Cung cấp một số thông tin hữu ích cho khách hàng
                </p>
                <ul className="pl-8">
                    <li className="list-disc">
                        <div className="flex justify-between items-center">
                            <p>Thời gian mở cửa</p>
                            <TimeInput
                                className="font-semibold text-xl"
                                onValueChange={(time) =>
                                    setGarageRegistrationStateValue(
                                        "openAt",
                                        time,
                                    )
                                }
                            />
                        </div>
                    </li>
                    <li className="list-disc">
                        <div className="flex justify-between items-center">
                            <p>Thời gian đóng cửa</p>
                            <TimeInput
                                className="font-semibold text-xl"
                                onValueChange={(time) =>
                                    setGarageRegistrationStateValue(
                                        "closeAt",
                                        time,
                                    )
                                }
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </RegistrationSection>
    );
}

export default AdditionalServices;
