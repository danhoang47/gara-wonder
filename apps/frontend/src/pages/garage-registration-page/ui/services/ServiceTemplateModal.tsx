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
} from "@nextui-org/react";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { brands } from "./constants";
import { Category, Service } from "@/core/types";

export type Brand = (typeof brands)[number];

export type ServiceTemplateModalProps = {
    isOpen: boolean;
    categories?: Category[],
    isCategoriesLoading?: boolean,
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
    });

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

    return (
        <Modal isOpen={isOpen} onClose={onModalClose} size="lg">
            <ModalContent className="min-h-96 flex-col">
                <ModalHeader className="px-6">Add Service</ModalHeader>
                <Divider className="mb-4" />
                <ModalBody className="flex flex-column gap-4 flex-wrap pb-20 px-6">
                    <Select
                        items={categories}
                        isLoading={isCategoriesLoading}
                        placeholder="Select category"
                        label="Category"
                        variant="bordered"
                        onSelectionChange={(keys) => {
                            const selectedId = Array.from(keys)[0] as string

                            setLocalService((prev) => ({
                                ...prev,
                                categoryId: selectedId,
                            }));
                        }}
                        isRequired
                        disabledKeys={selectedCategoryIds.filter(
                            (id) => id !== service?.categoryId,
                        )}
                        selectedKeys={[localService.categoryId] as Iterable<string>}
                    >
                        {(category) => (
                            <SelectItem key={category._id}>
                                {category.name}
                            </SelectItem>
                        )}
                    </Select>
                    <Select
                        items={brands}
                        placeholder="Select supported brands"
                        label="Supported Brands"
                        selectionMode="multiple"
                        variant="bordered"
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
                            <SelectItem key={brand.key}>
                                {brand.title}
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
                        />
                    </div>
                </ModalBody>
                <Divider />
                <ModalFooter className="mt-auto px-6">
                    <Button
                        color="danger"
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
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
