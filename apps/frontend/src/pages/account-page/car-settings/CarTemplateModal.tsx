import { Brand, PersonalCar } from "@/core/types";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export type CarTemplateModalProps = {
    onSave?: (car: Partial<PersonalCar>) => void;
    car?: Partial<PersonalCar>;
    brands?: Brand[];
    isBrandLoading?: boolean;
    isOpen?: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading?: boolean;
};

export type Model = {
    model: string;
};

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getModalUrl = (brandName: string) => {
    return `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=20&refine=make:"${capitalize(
        brandName.toLowerCase(),
    )}"`;
};

function CarTemplateModal({
    onSave,
    car = {},
    brands,
    isBrandLoading,
    isOpen,
    onClose,
    isLoading = false,
    type = "create"
}: CarTemplateModalProps) {
    const [localCar, setLocalCar] = useState<Partial<PersonalCar>>({});
    const [isModelLoading, setModelLoading] = useState<boolean>();
    const [models, setModels] = useState<Model[]>([]);
    const selectedBrand = useMemo(
        () => brands?.find((brand) => brand._id === localCar?.brandId),
        [brands, localCar?.brandId],
    );

    const isYearValid: boolean = useMemo(() => {
        if (localCar?.releaseYear)
            return (
                localCar?.releaseYear > new Date().getFullYear() ||
                localCar?.releaseYear < new Date(0).getFullYear()
            );
        return false;
    }, [localCar?.releaseYear]);

    const disabledSaveButton = useMemo(() => {
        if (!localCar) return false;

        const isValid =
            Object.keys(localCar).length === 4 &&
            // @ts-expect-error check null
            !Object.values(localCar).includes(null) &&
            !Object.values(localCar).includes(NaN);
        return isValid && !isYearValid;
    }, [localCar, isYearValid]);

    useEffect(() => {
        if (type === "edit") {
            setLocalCar(car)
        } else {
            setLocalCar({})
        }
    }, [type, car])

    useEffect(() => {
        if (!localCar?.brandId || !selectedBrand) {
            return;
        }
        if (localCar.brandId !== car.brandId) {
            const { ...newCar } = localCar;
            setLocalCar(newCar);
        }

        let isStale = false;

        const getBrandModels = async () => {
            setModelLoading(true);
            const models: Model[] = (
                await axios.get(getModalUrl(selectedBrand?.name))
            ).data?.results;
            if (!isStale) {
                setModelLoading(false);
                setModels(models);
            }
        };

        getBrandModels();
        return () => {
            isStale = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCar?.brandId, selectedBrand]);

    return (
        <Modal isOpen={isOpen} onClose={() => { setLocalCar({}), onClose() }}>
            <ModalContent>
                <ModalHeader className="border-b">
                    <p className="font-semibold text-center text-medium">
                        {type === "create" ? "Thêm xe" : "Chỉnh sửa xe"}
                    </p>
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-3 pt-4 pb-4">
                        <Input
                            variant="bordered"
                            label="Tên gợi nhớ"
                            placeholder="Nhập vào tên gợi nhớ"
                            value={localCar?.memo}
                            onValueChange={(memo) =>
                                setLocalCar((prev) => ({ ...prev, memo }))
                            }
                            isDisabled={isLoading}
                        />
                        <Select
                            items={brands || []}
                            selectionMode="single"
                            label="Hãng"
                            placeholder="Chọn Hãng xe"
                            variant="bordered"
                            isLoading={isBrandLoading}
                            disallowEmptySelection
                            onSelectionChange={(keys) => {
                                if (keys !== "all") {
                                    const brandId =
                                        Array.from(keys)[0].toString();
                                    setLocalCar((prev) => ({
                                        ...prev,
                                        brandId,
                                    }));
                                }
                            }}
                            selectedKeys={
                                localCar?.brandId && [localCar.brandId]
                            }
                            isDisabled={isLoading}
                        >
                            {(brand) => (
                                <SelectItem key={brand._id}>
                                    {brand.name}
                                </SelectItem>
                            )}
                        </Select>
                        <Select
                            items={models}
                            selectionMode="single"
                            label="Model"
                            placeholder="Chọn Model xe"
                            variant="bordered"
                            isLoading={isModelLoading}
                            disallowEmptySelection
                            isDisabled={Boolean(!localCar?.brandId)}
                            onSelectionChange={(keys) => {
                                if (keys !== "all") {
                                    const model =
                                        Array.from(keys)[0].toString();
                                    setLocalCar((prev) => ({
                                        ...prev,
                                        model,
                                    }));
                                }
                            }}
                            selectedKeys={localCar?.model && [localCar.model]}
                        >
                            {(item) => (
                                <SelectItem key={item.model}>
                                    {item.model}
                                </SelectItem>
                            )}
                        </Select>

                        <Input
                            label="Năm phát hành"
                            placeholder="Năm phát hành"
                            variant="bordered"
                            type="number"
                            min={0}
                            classNames={{
                                input: " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            }}
                            max={new Date().getFullYear()}
                            isInvalid={isYearValid}
                            errorMessage={`Nhập sai thông tin năm. Xin vui lòng nhập từ năm
                            1970 đến ${new Date().getFullYear()}`}
                            value={localCar?.releaseYear?.toString()}
                            onValueChange={(value) => {
                                setLocalCar((prev) => ({
                                    ...prev,
                                    releaseYear: Number.parseInt(value),
                                }));
                            }}
                            isDisabled={isLoading}
                        />
                    </div>
                </ModalBody>
                <ModalFooter className="border-t">
                    <Button
                        variant="light"
                        onPress={onClose}
                        isDisabled={isLoading}
                    >
                        <p className="text-default-400">Hủy</p>
                    </Button>
                    <Button
                        className="bg-foreground"
                        onPress={() => onSave && onSave(localCar || {})}
                        isDisabled={!disabledSaveButton}
                        isLoading={isLoading}
                    >
                        <p className="text-background">Lưu</p>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CarTemplateModal;
