import { Brand, Car } from "@/core/types";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export type BrandInputModalProps = {
    onSave?: (car: Car) => void;
    onDismiss?: () => void;
    car?: Car;
    brands?: Brand[];
    isBrandLoading?: boolean;
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

function BrandInputModal({
    onSave,
    onDismiss,
    car = {} as Car,
    brands,
    isBrandLoading,
}: BrandInputModalProps) {
    const [localCar, setLocalCar] = useState<Car>(car);
    const [isModelLoading, setModelLoading] = useState<boolean>();
    const [models, setModels] = useState<Model[]>([]);
    const selectedBrand = useMemo(
        () => brands?.find((brand) => brand._id === localCar.brandId),
        [brands, localCar.brandId],
    );

    const disabledSaveButton = useMemo(
        () =>
            Object.keys(localCar).length < 3 &&
            !Object.values(localCar).includes(null) &&
            !Object.values(localCar).includes(NaN),
        [localCar],
    );

    useEffect(() => {
        if (!localCar?.brandId || !selectedBrand) return;

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
    }, [localCar?.brandId, selectedBrand]);
    useEffect(() => {
        console.log(localCar, !Object.values(localCar).includes(NaN));
    }, [localCar]);

    return (
        <div className="w-[30rem] p-5">
            <p className="text-lg font-bold">Chọn xe của bạn</p>
            <div className="flex flex-col gap-3 pt-5">
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
                            const brandId = Array.from(keys)[0].toString();
                            setLocalCar((prev) => ({ ...prev, brandId }));
                        }
                    }}
                    selectedKeys={localCar?.brandId && [localCar.brandId]}
                >
                    {(brand) => (
                        <SelectItem key={brand._id}>{brand.name}</SelectItem>
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
                    isDisabled={Boolean(!localCar.brandId)}
                    onSelectionChange={(keys) => {
                        if (keys !== "all") {
                            const model = Array.from(keys)[0].toString();
                            setLocalCar((prev) => ({ ...prev, model }));
                        }
                    }}
                    selectedKeys={localCar.model && [localCar.model]}
                >
                    {(item) => (
                        <SelectItem key={item.model}>{item.model}</SelectItem>
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
                    value={localCar.releaseYear?.toString()}
                    isDisabled={Boolean(!localCar.brandId)}
                    onValueChange={(value) => {
                        console.log(value);
                        setLocalCar((prev) => ({
                            ...prev,
                            releaseYear: Number.parseInt(value),
                        }));
                    }}
                />
            </div>
            <div className="flex gap-2 pt-3 justify-end">
                <Button variant="light" onPress={onDismiss}>
                    <p className="text-default-400">Hủy</p>
                </Button>
                <Button
                    className="bg-foreground"
                    disabled={disabledSaveButton}
                    onPress={() => onSave && onSave(localCar)}
                    isDisabled={disabledSaveButton}
                >
                    <p className="text-background">Lưu</p>
                </Button>
            </div>
        </div>
    );
}

export default BrandInputModal;
