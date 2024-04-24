import { Textarea } from "@nextui-org/react";
import { Input } from "@/core/ui";
import { RegistrationSection } from "..";
import { useSupplierRegistrationContext } from "../../hooks";
import { useEffect, useState } from "react";

export default function BasicInformation() {
    const {
        supplierRegistrationState,
        supplierRegistrationErrors,
        setSupplierRegistrationStateValue,
    } = useSupplierRegistrationContext();
    const [isNameInputTouched, setNameInputTouched] = useState<boolean>(false);

    useEffect(() => {
        setSupplierRegistrationStateValue(
            "name",
            supplierRegistrationState.name || "",
        );
        setSupplierRegistrationStateValue(
            "description",
            supplierRegistrationState.description || "",
        );
    }, [
        supplierRegistrationState.description,
        supplierRegistrationState.name,
        setSupplierRegistrationStateValue,
    ]);

    return (
        <RegistrationSection
            header="Thông tin cơ bản"
            description="Một số thông tin cơ bản về phần đăng ký này"
        >
            <div className="mb-2">
                <p className="font-medium">Thông tin cơ bản</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Input
                    variant="bordered"
                    placeholder="Tên nhà cung cấp..."
                    label="Tên nhà cung cấp"
                    value={supplierRegistrationState.name}
                    onValueChange={(name) => {
                        setSupplierRegistrationStateValue("name", name);
                    }}
                    onBlur={() => setNameInputTouched(true)}
                    errorMessage={
                        isNameInputTouched && supplierRegistrationErrors.name
                    }
                    isInvalid={
                        isNameInputTouched &&
                        Boolean(supplierRegistrationErrors.name)
                    }
                    isRequired
                />
                <Textarea
                    variant="bordered"
                    placeholder="Mô tả..."
                    label="Mô tả"
                    multiple
                    minRows={6}
                    value={supplierRegistrationState.description}
                    onValueChange={(description) => {
                        setSupplierRegistrationStateValue(
                            "description",
                            description,
                        );
                    }}
                    errorMessage={supplierRegistrationErrors.description}
                    isInvalid={Boolean(supplierRegistrationErrors.description)}
                />
            </div>
        </RegistrationSection>
    );
}
