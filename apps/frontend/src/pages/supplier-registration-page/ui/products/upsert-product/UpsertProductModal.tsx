import { Stepper } from "@/core/ui";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Divider,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { ProductCategory } from "@/core/types";
import UploadImage from "./UploadImage";
import { useEffect, useMemo, useState } from "react";
import { useSupplierRegistrationContext } from "@/pages/supplier-registration-page/hooks";
import { ObjectId } from "bson";
import useSWR from "swr";
import { getBrands } from "@/api";
import { getProductTypes } from "@/api/supplier";
import { RegistrationProduct } from "@/pages/supplier-registration-page/contexts";

export type UpsertProductModalProps = {
    isOpenUpsertProduct: boolean;
    onOpenChangeUpsertProduct: (isOpen: boolean) => void;
    product?: RegistrationProduct;
};

const DEFAULT_PRODUCT: RegistrationProduct = {
    _id: undefined,
    brandId: undefined,
    category: undefined,
    description: undefined,
    images: [],
    name: "",
    price: 100000,
    quantity: 10,
    series: undefined,
    type: undefined,
    year: 2022,
};

const UpsertProductModal = ({
    product,
    isOpenUpsertProduct,
    onOpenChangeUpsertProduct,
}: UpsertProductModalProps) => {
    const { supplierRegistrationState, setSupplierRegistrationStateValue } =
        useSupplierRegistrationContext();

    const [localProduct, setLocalProduct] = useState<RegistrationProduct>();

    const onChangeValue = <K extends keyof RegistrationProduct>(
        key: K,
        value: RegistrationProduct[K],
    ) => {
        setLocalProduct((prev) => {
            if (!prev) {
                return {
                    [key]: value,
                };
            }

            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const isSaveButtonEnabled = useMemo(() => {
        if (!localProduct) return false;

        return (
            Object.keys(localProduct) as (keyof RegistrationProduct)[]
        ).every((key) => {
            if (key === "createdAt" || key === "updatedAt" || key === "_id")
                return true;

            const value = localProduct[key];
            if (Array.isArray(value)) {
                return value.length !== 0;
            }

            return value !== undefined && value !== "";
        });
    }, [localProduct]);

    const onAddProduct = () => {
        const oldData = supplierRegistrationState.products;
        const _id = new ObjectId();
        const newData: RegistrationProduct[] = [];
        if (!product) {
            newData.push(...[...(oldData || []), { ...localProduct, _id }]);
        } else {
            newData.push(
                ...oldData.map((item) => {
                    if (localProduct?._id?.equals(item._id)) {
                        return { ...item, ...localProduct };
                    }

                    return item;
                }),
            );
        }
        setLocalProduct(undefined);

        setSupplierRegistrationStateValue("products", newData);
    };

    const { isLoading: isBrandsLoading, data: brands } = useSWR(
        "brands",
        getBrands,
    );

    const { isLoading: isProductTypesLoading, data: productTypes } = useSWR(
        "productTypes",
        getProductTypes,
    );

    useEffect(() => {
        if (product) {
            setLocalProduct(product);
        } else {
            setLocalProduct(DEFAULT_PRODUCT);
        }
    }, [product]);

    return (
        <Modal
            isOpen={isOpenUpsertProduct}
            onOpenChange={onOpenChangeUpsertProduct}
            size="3xl"
        >
            <ModalContent className="h-[90vh]">
                {(onClose) => (
                    <>
                        <ModalHeader className="justify-center">
                            <p>Thêm sản phẩm</p>
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="py-4 flex flex-row justify-between overflow-auto">
                            <UploadImage
                                images={localProduct?.images}
                                onImageChanges={(images) => {
                                    onChangeValue("images", images);
                                }}
                            />

                            <div className="flex flex-1 flex-col gap-3">
                                <Input
                                    variant="bordered"
                                    placeholder="Nhập tên sản phẩm"
                                    label="Tên sản phẩm"
                                    onValueChange={(value) => {
                                        onChangeValue("name", value);
                                    }}
                                    value={localProduct?.name}
                                    isRequired
                                    classNames={{
                                        inputWrapper: "border",
                                    }}
                                />

                                <Input
                                    variant="bordered"
                                    placeholder="Nhập mô tả"
                                    label="Mô tả"
                                    onValueChange={(value) => {
                                        onChangeValue("description", value);
                                    }}
                                    value={localProduct?.description}
                                    isRequired
                                    classNames={{
                                        inputWrapper: "border",
                                    }}
                                />

                                <Select
                                    items={brands}
                                    isLoading={isBrandsLoading}
                                    placeholder="Chọn hãng xe"
                                    label="Hãng xe"
                                    variant="bordered"
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(
                                            keys,
                                        )[0] as string;

                                        onChangeValue("brandId", selectedId);
                                    }}
                                    classNames={{
                                        trigger: "border",
                                    }}
                                    isRequired
                                    selectedKeys={
                                        localProduct?.brandId
                                            ? [localProduct?.brandId]
                                            : undefined
                                    }
                                >
                                    {(brand) => (
                                        <SelectItem key={brand._id}>
                                            {brand.name}
                                        </SelectItem>
                                    )}
                                </Select>

                                <Select
                                    items={[
                                        {
                                            key: ProductCategory.Interior,
                                            type: ProductCategory.Interior,
                                        },
                                        {
                                            key: ProductCategory.Exterior,
                                            type: ProductCategory.Exterior,
                                        },
                                    ]}
                                    isLoading={false}
                                    placeholder="Chọn danh mục"
                                    label="Danh mục"
                                    variant="bordered"
                                    classNames={{
                                        trigger: "border",
                                    }}
                                    isRequired
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(
                                            keys,
                                        )[0] as string;

                                        onChangeValue(
                                            "category",
                                            selectedId
                                                ? Number(selectedId)
                                                : undefined,
                                        );
                                        onChangeValue("type", undefined);
                                    }}
                                    selectedKeys={
                                        localProduct?.category !== undefined
                                            ? [String(localProduct?.category)]
                                            : []
                                    }
                                    disabledKeys={
                                        localProduct?.category !== undefined
                                            ? [
                                                  String(
                                                      localProduct?.category ===
                                                          ProductCategory.Exterior
                                                          ? ProductCategory.Interior
                                                          : ProductCategory.Exterior,
                                                  ),
                                              ]
                                            : []
                                    }
                                >
                                    {(category) => (
                                        <SelectItem key={category.key}>
                                            {category.type ===
                                            ProductCategory.Interior
                                                ? "Nội thất"
                                                : "Ngoại thất"}
                                        </SelectItem>
                                    )}
                                </Select>

                                <Select
                                    items={
                                        localProduct?.category === undefined
                                            ? productTypes?.data
                                            : productTypes?.data.filter(
                                                  (item) =>
                                                      item.category ===
                                                      Number(
                                                          localProduct?.category,
                                                      ),
                                              )
                                    }
                                    isLoading={isProductTypesLoading}
                                    placeholder="Chọn loại sản phẩm"
                                    label="Loại sản phẩm"
                                    variant="bordered"
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(
                                            keys,
                                        )[0] as string;

                                        const item = productTypes?.data.find(
                                            (productType) =>
                                                productType.code ===
                                                Number(selectedId),
                                        );

                                        onChangeValue(
                                            "type",
                                            selectedId
                                                ? Number(selectedId)
                                                : undefined,
                                        );
                                        onChangeValue(
                                            "category",
                                            item?.category,
                                        );
                                    }}
                                    classNames={{
                                        trigger: "border",
                                    }}
                                    isRequired
                                    selectedKeys={
                                        localProduct?.type !== undefined
                                            ? [String(localProduct?.type)]
                                            : []
                                    }
                                >
                                    {(productType) => (
                                        <SelectItem key={productType.code}>
                                            {productType.name}
                                        </SelectItem>
                                    )}
                                </Select>

                                <Select
                                    items={[]}
                                    isLoading={false}
                                    placeholder="Chọn dòng xe"
                                    label="Dòng xe"
                                    variant="bordered"
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(
                                            keys,
                                        )[0] as string;

                                        onChangeValue("series", [selectedId]);
                                    }}
                                    classNames={{
                                        trigger: "border",
                                    }}
                                    isRequired
                                >
                                    <SelectItem key={1}>Dòng 1</SelectItem>
                                    <SelectItem key={2}>Dòng 2</SelectItem>
                                </Select>

                                <Input
                                    variant="bordered"
                                    placeholder="Nhập Năm"
                                    label="Năm"
                                    type="number"
                                    isRequired
                                    onValueChange={(value) => {
                                        onChangeValue("year", Number(value));
                                    }}
                                    value={String(localProduct?.year)}
                                    classNames={{
                                        inputWrapper: "border",
                                    }}
                                />
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Giá tiền</p>
                                    </div>
                                    <Stepper
                                        onChange={(value) => {
                                            onChangeValue("price", value);
                                        }}
                                        allowKeyboard
                                        value={localProduct?.price || 1}
                                    />
                                </div>

                                <div className="flex justify-between items-center pb-4">
                                    <div>
                                        <p className="font-medium">Số lượng</p>
                                    </div>
                                    <Stepper
                                        onChange={(value) => {
                                            onChangeValue("quantity", value);
                                        }}
                                        allowKeyboard
                                        value={localProduct?.quantity || 1}
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <Divider />
                        <ModalFooter>
                            <Button
                                variant="light"
                                onPress={() => {
                                    onClose();
                                    setLocalProduct(undefined);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    onAddProduct();
                                    onClose();
                                }}
                                isDisabled={!isSaveButtonEnabled}
                            >
                                {product ? "Sửa" : "Thêm"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UpsertProductModal;
