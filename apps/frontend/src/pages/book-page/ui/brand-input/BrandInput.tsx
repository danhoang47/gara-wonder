import { useState } from "react";
import useSWRImmutable from "swr/immutable";

import { Car } from "@/core/types";
import { getBrands } from "@/api";
import { useOrderContext } from "../../hooks";
import BrandInputModal from "./BrandInputModal";

export default function BrandInput() {
    const {
        order: { car },
        setOrderValue,
    } = useOrderContext();

    const [isBrandModalOpen, setBrandModalOpen] = useState<boolean>(false);
    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );

    const onModalSave = (car: Partial<Car>) => {
        setOrderValue("car", car);
        setBrandModalOpen(false);
    };

    const onModalDismiss = () => {
        setBrandModalOpen(false);
    };

    const getCarLabel = () => {
        const selectedBrand = brands?.find((brand) => brand._id === car?.brandId);
        return `${selectedBrand?.name} ${car?.model} ${car?.releaseYear}`
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-default-600 after:content-['*'] after:text-danger after:ml-0.5">
                        Your Car
                    </p>
                    <p className="">{getCarLabel()}</p>
                </div>
                <button
                    className="text-medium underline font-medium"
                    onClick={() => setBrandModalOpen(true)}
                >
                    Edit
                </button>
            </div>
            <BrandInputModal
                isOpen={isBrandModalOpen}
                onDismiss={onModalDismiss}
                onSave={onModalSave}
                isBrandLoading={isBrandsLoading}
                brands={brands}
            />
        </>
    );
}
