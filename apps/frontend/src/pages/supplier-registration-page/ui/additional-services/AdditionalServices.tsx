import { useSupplierRegistrationContext } from "../../hooks";
import RegistrationSection from "../registration-section";

import TimeInput from "./TimeInput";

function AdditionalServices() {
    const { supplierRegistrationState, setSupplierRegistrationStateValue } =
        useSupplierRegistrationContext();

    return (
        <RegistrationSection
            header="Bổ sung"
            description="Cung cấp các dịch vụ Garage của bạn"
        >
            <div className="mt-6 flex flex-col gap-0.5">
                <p className="text-foreground font-bold text-lg">
                    Cung cấp một số thông tin hữu ích cho khách hàng
                </p>
                <ul className="pl-8">
                    <li className="list-disc">
                        <div className="flex justify-between items-center">
                            <p>Giờ mở cửa</p>
                            <TimeInput
                                className="font-semibold text-xl"
                                onValueChange={(time) =>
                                    setSupplierRegistrationStateValue(
                                        "openAt",
                                        time,
                                    )
                                }
                            />
                        </div>
                    </li>
                    <li className="list-disc">
                        <div className="flex justify-between items-center">
                            <p>Giờ đóng cửa</p>
                            <TimeInput
                                className="font-semibold text-xl"
                                onValueChange={(time) =>
                                    setSupplierRegistrationStateValue(
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
