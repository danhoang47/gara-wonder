import { getBrands } from "@/api";
import { Brand, Car } from "@/core/types";
import { useOrderContext } from "@/pages/garage-page/hooks";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";

import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import BrandInputModal from "./BrandInputModal";

export type BrandInputModalProps = {
    brands?: Brand[];
    isBrandLoading?: boolean;
};

export type Model = {
    model: string;
};

function BrandInput() {
    const {
        order: { car },
        setOrderValue,
    } = useOrderContext();

    const [isBrandOpen, setIsBrandOpen] = useState<boolean>(false);
    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );

    const onModalSave = (car: Car) => {
        setOrderValue("car", car);
        setIsBrandOpen(false);
    };

    const onModalDismiss = () => {
        setIsBrandOpen(false);
    };

    const getCarLabel = () => {
        const selectedBrand = brands?.find(
            (brand) => brand._id === car?.brandId,
        );
        if (selectedBrand?.name) {
            if (car?.model) {
                if (car.releaseYear) {
                    return `${selectedBrand?.name} ${car?.model} ${car?.releaseYear}`;
                }
                return `${selectedBrand?.name} ${car?.model}`;
            }
            return `${selectedBrand?.name}`;
        }
        return "Select your Car";
    };
    return (
        <>
            <Popover
                placement="bottom-end"
                triggerScaleOnOpen={false}
                offset={-2}
                triggerType="grid"
                isOpen={isBrandOpen}
                onClose={() => setIsBrandOpen(false)}
            >
                <PopoverTrigger onClick={() => setIsBrandOpen(true)}>
                    <div className="h-[56px] border-2 rounded-xl hover:border-default-400 transition-colors px-3 py-2">
                        <p className="text-sm text-primary">Date</p>
                        <p className="text-sm">
                            {getCarLabel() ? getCarLabel() : "Choose your car"}
                        </p>
                    </div>
                </PopoverTrigger>

                <PopoverContent>
                    <BrandInputModal
                        onDismiss={onModalDismiss}
                        onSave={onModalSave}
                        isBrandLoading={isBrandsLoading}
                        brands={brands}
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}

export default BrandInput;
