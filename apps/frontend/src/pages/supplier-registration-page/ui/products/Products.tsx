import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, useDisclosure } from "@nextui-org/react";
import RegistrationSection from "../registration-section";
import ProductsTable from "./ProductsTable";
import ImportCsvModal from "./import-file";

import { useSupplierRegistrationContext } from "../../hooks";
import UpsertProductModal from "./upsert-product";
import { useState } from "react";
import { Product } from "@/core/types";
import { RegistrationProduct } from "../../contexts";

export default function Products() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isOpenUpsertProduct,
        onOpen: onOpenUpSertProduct,
        onOpenChange: onOpenChangeUpsertProduct,
    } = useDisclosure();
    const { supplierRegistrationState, setSupplierRegistrationStateValue } =
        useSupplierRegistrationContext();

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const hasShowEditButton = selectedProducts.length === 1;
    const hasShowDeleteButton = selectedProducts.length > 0;

    const onRemoveProducts = () => {
        const products = supplierRegistrationState.products;
        const test = selectedProducts.map((item) => item._id.toString());
        const newProducts = products.filter(
            (product) => !test.includes(product._id?.toString() as string),
        );
        setSelectedProducts([]);
        setSupplierRegistrationStateValue("products", newProducts);
    };

    return (
        <>
            <RegistrationSection
                className="!col-span-full !col-start-1 "
                header={
                    <div className="flex justify-between items-center">
                        <div>
                            <span>Danh sách sản phẩm</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="bordered"
                                startContent={<FontAwesomeIcon icon={faPlus} />}
                                className="border"
                                onPress={onOpenUpSertProduct}
                            >
                                Thêm
                            </Button>
                            {hasShowEditButton && (
                                <Button
                                    variant="bordered"
                                    startContent={
                                        <FontAwesomeIcon icon={faPlus} />
                                    }
                                    className="border"
                                    onPress={onOpenUpSertProduct}
                                >
                                    Chỉnh sửa
                                </Button>
                            )}
                            {hasShowDeleteButton && (
                                <Button
                                    variant="bordered"
                                    startContent={
                                        <FontAwesomeIcon icon={faPlus} />
                                    }
                                    className="border"
                                    onPress={onRemoveProducts}
                                >
                                    Xóa
                                </Button>
                            )}
                            <Button
                                variant="bordered"
                                startContent={
                                    <FontAwesomeIcon icon={faFileImport} />
                                }
                                className="border"
                                onPress={onOpen}
                            >
                                Tải lên
                            </Button>
                        </div>
                    </div>
                }
            >
                <div className="h-full">
                    <ProductsTable
                        onRowSelected={(product) => {
                            if (Array.isArray(product)) {
                                setSelectedProducts(product);
                            } else {
                                setSelectedProducts((prev) => [
                                    ...prev,
                                    product,
                                ]);
                            }
                        }}
                        products={supplierRegistrationState.products || []}
                    />
                </div>
            </RegistrationSection>

            <ImportCsvModal
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
            />

            <UpsertProductModal
                product={
                    selectedProducts.length === 1
                        ? selectedProducts[0]
                        : undefined
                }
                isOpenUpsertProduct={isOpenUpsertProduct}
                onOpenChangeUpsertProduct={onOpenChangeUpsertProduct}
            />
        </>
    );
}
