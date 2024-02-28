import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    SelectItem,
    Select,
    SelectedItems,
    Input,
    Modal,
    ModalContent,
    ModalFooter,
    Button,
    ModalHeader,
    ModalBody,
    Divider,
    Switch,
} from "@nextui-org/react";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { Brand, Category, EstimateType, Service } from "@/core/types";
import EstimateDurationGroup from "./EstimateDurationGroup";

export type ServiceTemplateModalProps = {
    isOpen: boolean;
    categories?: Category[];
    isCategoriesLoading?: boolean;
    isBrandsLoading?: boolean;
    brands?: Brand[];
    onModalSave: (data: Partial<Service>) => void;
    onModalClose: () => void;
    type?: "edit" | "create";
    service?: Partial<Service>;
    selectedCategoryIds: string[];
};

export default function ServiceTemplateModal({
    isOpen,
    categories,
    isCategoriesLoading,
    isBrandsLoading,
    brands,
    onModalSave,
    onModalClose,
    type = "create",
    service = undefined,
    selectedCategoryIds,
}: ServiceTemplateModalProps) {
    const [localService, setLocalService] = useState<Partial<Service>>({
        _id: nanoid(),
        highestPrice: 100,
        lowestPrice: 0,
        estimationType: EstimateType.Exact,
        estimateDuration: undefined,
        brandIds: "all",
        categoryId: undefined
    });
    const { categoryId, brandIds } = localService;
    const isSaveButtonDisabled = useMemo<boolean>(
        () => !categoryId || !brandIds,
        [categoryId, brandIds],
    );

    useEffect(() => {
        if (type === "edit" && service) {
            setLocalService(service);
        } else {
            setLocalService({
                _id: nanoid(),
                highestPrice: 100,
                lowestPrice: 0,
            });
        }
    }, [type, service]);

    const resetLocalService = () =>
        setLocalService({
            _id: nanoid(),
            highestPrice: 100,
            lowestPrice: 0,
        });

    const renderBrandSelectValue = (
        brs: SelectedItems<Brand>,
    ): React.ReactNode => {
        const allIndex = brs.findIndex(({ key }) => key === "all");

        if (allIndex !== -1) {
            return (
                <p>
                    {brs
                        .splice(allIndex, 1)
                        .map(({ textValue }) => textValue)
                        .join(", ")}
                </p>
            );
        }

        return <p>{brs.map(({ textValue }) => textValue).join(", ")}</p>;
    };

    const onBrandSelectChange = (value: "all" | Array<string>) => {
        setLocalService((prev) => ({
            ...prev,
            brandIds: value,
        }));
    };

    useEffect(() => {
        if (isOpen) {
            document.getElementById("root")!.classList.add("overflow-y-hidden")
        } else {
            document.getElementById("root")!.classList.remove("overflow-y-hidden")
        }
    }, [isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onModalClose} size="lg">
            <ModalContent className="max-h-[90%] flex-col flex-nowrap">
                <ModalHeader className="px-6 justify-center">
                    <p className="text-base">Add Service</p>
                </ModalHeader>
                <Divider className="mb-4" />
                <ModalBody className="flex flex-column gap-4 flex-wrap pb-6 px-6">
                    <Select
                        items={categories}
                        isLoading={isCategoriesLoading}
                        placeholder="Select category"
                        label="Category"
                        variant="bordered"
                        classNames={{
                            trigger: "border",
                        }}
                        onSelectionChange={(keys) => {
                            const selectedId = Array.from(keys)[0] as string;

                            setLocalService((prev) => ({
                                ...prev,
                                categoryId: selectedId,
                            }));
                        }}
                        isRequired
                        disabledKeys={selectedCategoryIds.filter(
                            (id) => id !== service?.categoryId,
                        )}
                        selectedKeys={
                            localService?.categoryId
                                ? [localService?.categoryId]
                                : undefined
                        }
                    >
                        {(category) => (
                            <SelectItem key={category._id}>
                                {category.name}
                            </SelectItem>
                        )}
                    </Select>
                    <Select
                        items={[
                            {
                                _id: "all",
                                createdAt: 0,
                                updatedAt: 0,
                                name: "Select All",
                            },
                            ...(brands || []),
                        ]}
                        isLoading={isBrandsLoading}
                        placeholder="Select supported brands"
                        label="Supported Brands"
                        selectionMode="multiple"
                        variant="bordered"
                        classNames={{
                            trigger: "border",
                        }}
                        selectedKeys={localService.brandIds}
                        renderValue={renderBrandSelectValue}
                        onSelectionChange={(keys) => {
                            const arrayOfKeys = Array.from(
                                keys,
                            ) as Array<string>;

                            if (arrayOfKeys.includes("all")) {
                                if (localService.brandIds !== "all") {
                                    onBrandSelectChange("all");
                                    return;
                                }
                                if (arrayOfKeys.length > 1) {
                                    onBrandSelectChange(
                                        arrayOfKeys.filter(
                                            (v) => String(v) !== "all",
                                        ),
                                    );
                                    return;
                                }
                            } else if (localService.brandIds === "all") {
                                onBrandSelectChange([]);
                            } else {
                                onBrandSelectChange(arrayOfKeys);
                            }
                        }}
                        isRequired
                    >
                        {(brand) => (
                            <SelectItem key={brand._id}>
                                {brand.name}
                            </SelectItem>
                        )}
                    </Select>
                    <div className="flex gap-2 w-full items-center">
                        <Input
                            variant="bordered"
                            placeholder="Enter lowest price"
                            label="Lowest Price"
                            isRequired
                            type="number"
                            value={String(localService.lowestPrice)}
                            endContent={"$"}
                            onValueChange={(price) =>
                                setLocalService((prev) => ({
                                    ...prev,
                                    lowestPrice: Number(price),
                                }))
                            }
                            classNames={{
                                inputWrapper: "border",
                            }}
                        />
                        <div className="w-12 text-center">
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                        <Input
                            variant="bordered"
                            placeholder="Enter highest price"
                            label="Highest Price"
                            isRequired
                            type="number"
                            value={String(localService.highestPrice)}
                            endContent="$"
                            onValueChange={(price) =>
                                setLocalService((prev) => ({
                                    ...prev,
                                    highestPrice: Number(price),
                                }))
                            }
                            classNames={{
                                inputWrapper: "border",
                            }}
                        />
                    </div>
                    <div className="flex space-between items-center gap-2 p-3 border-2 rounded-medium">
                        <div>
                            <p className="font-medium">Provided Evaluation</p>
                            <span className="text-sm text-default-400">
                                Evaluation will send to customer to provide
                                information about the service
                            </span>
                        </div>
                        <div>
                            <Switch
                                defaultSelected
                                onValueChange={(isSelected) =>
                                    setLocalService((prev) => ({
                                        ...prev,
                                        isProvidedEvaluation: isSelected,
                                    }))
                                }
                                isSelected={Boolean(
                                    localService.isProvidedEvaluation,
                                )}
                            />
                        </div>
                    </div>
                    <EstimateDurationGroup
                        estimateType={localService.estimationType}
                        estimateDuration={localService.estimateDuration}
                        onChange={(et, ed) =>
                            setLocalService((prev) => ({
                                ...prev,
                                estimationType: et,
                                estimateDuration: ed,
                            }))
                        }
                    />
                </ModalBody>
                <Divider />
                <ModalFooter className="mt-auto px-6">
                    <Button
                        color="default"
                        variant="light"
                        onPress={() => {
                            onModalClose();
                            resetLocalService();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={() => {
                            onModalSave(localService);
                            resetLocalService();
                        }}
                        isDisabled={isSaveButtonDisabled}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
