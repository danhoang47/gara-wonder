import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import deepEqual from "deep-equal";
import clsx from "clsx";

import { useAppSelector } from "@/core/hooks";
import { Brand, Car, PersonalCar } from "@/core/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";

export type BrandInputModalProps = {
    onSave: (car: Car) => void;
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
    const [localCar, setLocalCar] = useState<Partial<PersonalCar>>(car);
    const [isModelLoading, setModelLoading] = useState<boolean>();
    const [models, setModels] = useState<Model[]>([]);
    const selectedBrand = useMemo(
        () => brands?.find((brand) => brand._id === localCar.brandId),
        [brands, localCar.brandId],
    );
    const personalCars = useAppSelector((state) => state.user.value?.cars);

    const isYearValid: boolean = useMemo(() => {
        if (localCar.releaseYear)
            return (
                localCar.releaseYear > new Date().getFullYear() ||
                localCar.releaseYear < new Date(0).getFullYear()
            );
        return false;
    }, [localCar.releaseYear]);

    const disabledSaveButton = useMemo(() => {
        const isValid =
            Object.keys(localCar).length >= 3 &&
            // @ts-expect-error check null
            !Object.values(localCar).includes(null) &&
            !Object.values(localCar).includes(NaN);
        return isValid && !isYearValid;
    }, [localCar, isYearValid]);

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
        <div className="w-[24rem]">
            <p className="text-lg font-bold px-4 py-3 border-b">
                Chọn xe của bạn
            </p>
            <div className="p-4">
                <div className="flex flex-col gap-2 mb-4">
                    <div>
                        <p className="font-medium text-small text-default-500">
                            Xe đã lưu
                        </p>
                    </div>
                    <div>
                        {personalCars?.map((car) => {
                            const isSelected = deepEqual(car, localCar);

                            return (
                                <Button
                                    endContent={
                                        <span
                                            className={clsx(
                                                "text-default-400",
                                                isSelected && "text-foreground",
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    isSelected
                                                        ? faCircleDot
                                                        : faCircle
                                                }
                                                size="lg"
                                            />
                                        </span>
                                    }
                                    className={clsx(
                                        "w-full relative h-auto py-3 gap-3 justify-between",
                                        isSelected && "border-2 border-black",
                                    )}
                                    variant="bordered"
                                    onPress={() => {
                                        if (localCar?._id === car?._id) {
                                            setLocalCar({});
                                        } else {
                                            setLocalCar(car);
                                        }
                                    }}
                                    disableRipple
                                >
                                    <div className="">
                                        <p className="text-left font-semibold">
                                            {car.memo}
                                        </p>
                                        <p className="text-default-500">
                                            {
                                                brands?.find(
                                                    ({ _id }) =>
                                                        _id === car.brandId,
                                                )?.name
                                            }
                                            , {car.model}, {car.releaseYear}
                                        </p>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="font-medium text-small text-default-500">
                            Tạo mới xe
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
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
                            isDisabled={Boolean(!localCar.brandId)}
                            onSelectionChange={(keys) => {
                                if (keys !== "all") {
                                    const model =
                                        Array.from(keys)[0].toString();
                                    setLocalCar((prev) => ({ ...prev, model }));
                                }
                            }}
                            selectedKeys={localCar.model && [localCar.model]}
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
                            value={localCar.releaseYear?.toString()}
                            isDisabled={Boolean(!localCar.brandId)}
                            onValueChange={(value) => {
                                setLocalCar((prev) => ({
                                    ...prev,
                                    releaseYear: Number.parseInt(value),
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex gap-2 pt-3 justify-end">
                    <Button variant="light" onPress={onDismiss}>
                        <p className="text-default-400">Hủy</p>
                    </Button>
                    <Button
                        className="bg-foreground"
                        onPress={() => onSave(localCar as Car)}
                        isDisabled={!disabledSaveButton}
                    >
                        <p className="text-background">Lưu</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BrandInputModal;
