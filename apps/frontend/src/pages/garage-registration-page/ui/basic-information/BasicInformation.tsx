import { Textarea } from "@nextui-org/react";
import { Input } from "@/core/ui";
import { RegistrationSection } from "..";
import { useGarageRegistrationContext } from "../../hooks";
import { useEffect, useState } from "react";

export default function BasicInformation() {
    const {
        garageRegistrationState,
        garageRegistrationErrors,
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();
    const [isNameInputTouched, setNameInputTouched] = useState<boolean>(false);

    useEffect(() => {
        setGarageRegistrationStateValue(
            "name",
            garageRegistrationState.name || "",
        );
        setGarageRegistrationStateValue(
            "description",
            garageRegistrationState.description || "",
        );
    }, [
        garageRegistrationState.description,
        garageRegistrationState.name,
        setGarageRegistrationStateValue,
    ]);

    return (
        <RegistrationSection
            header="Thông tin cơ bản"
            description="Cung cấp một vài thông tin cơ bản về garage của bạn"
        >
            <div className="mb-2">
                <p className="font-medium">Thông tin cơ bản</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Input
                    variant="bordered"
                    placeholder="Nhập vào tên garage"
                    label="Tên garage"
                    value={garageRegistrationState.name}
                    onValueChange={(name) => {
                        setGarageRegistrationStateValue("name", name);
                    }}
                    onBlur={() => setNameInputTouched(true)}
                    errorMessage={
                        isNameInputTouched && garageRegistrationErrors.name
                    }
                    isInvalid={
                        isNameInputTouched &&
                        Boolean(garageRegistrationErrors.name)
                    }
                    isRequired
                />
                <Textarea
                    variant="bordered"
                    placeholder="Nhập vào giới thiệu..."
                    label="Giới thiệu chung"
                    multiple
                    minRows={6}
                    value={garageRegistrationState.description}
                    onValueChange={(description) => {
                        setGarageRegistrationStateValue(
                            "description",
                            description,
                        );
                    }}
                    errorMessage={garageRegistrationErrors.description}
                    isInvalid={Boolean(garageRegistrationErrors.description)}
                />
            </div>
        </RegistrationSection>
    );
}
