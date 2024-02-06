import { GarageFilter } from "@/core/types";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Slider,
} from "@nextui-org/react";
import clsx from "clsx";
import { useMemo, useState } from "react";

export type FilterModalProps = {
    filterParams: GarageFilter;
    isOpen?: boolean;
    onDismiss: () => void;
    onSave: (filters: GarageFilter) => void;
};

const supportedBrands = [
    "Mercedes",
    "BMW",
    "Porsche",
    "Toyota",
    "Honda",
    "Lexus",
];

const initialFilterState: GarageFilter = {
    priceRange: {
        from: undefined,
        to: undefined,
    },
    distance: undefined,
    additional: undefined,
    ratings: [],
    brands: [],
};

function FilterModal({
    filterParams,
    isOpen = false,
    onDismiss,
    onSave,
}: FilterModalProps) {
    const [filters, setFilters] = useState<GarageFilter>(
        filterParams || initialFilterState,
    );
    const numberOfSelectedFilter = useMemo(() => {
        return Object.keys(filters).reduce<number>((acc, filterKey) => {
            const filterValue = filters[filterKey as keyof GarageFilter];

            if (filterValue) {
                if (Array.isArray(filterValue)) {
                    return acc + (filterValue.length && 1);
                }
                if (typeof filterValue === "object") {
                    return (
                        acc +
                        (Object.values(filterValue).filter(
                            (v) => v !== undefined,
                        ).length && 1)
                    );
                }
            }

            return acc;
        }, 0);
    }, [filters]);

    const onFilterValueChange = <K extends keyof GarageFilter>(
        key: K,
        value: GarageFilter[K],
    ) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onClearFilterValue = () => {
        setFilters(initialFilterState);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onDismiss} size="3xl">
            <ModalContent>
                <ModalHeader>
                    <span className="text-base">Filter</span>
                </ModalHeader>
                <Divider />
                <ModalBody className="pb-4 overflow-auto sm:max-h-[400px] md:max-h-[600px] lg:max-h-[680px]">
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Price Range</h3>
                            <p className="text-zinc text-sm">
                                This is not include tax and other fees
                            </p>
                        </div>
                        <div className="flex">
                            <Slider
                                step={1}
                                minValue={0}
                                maxValue={1000}
                                defaultValue={[
                                    filters.priceRange?.from || 0,
                                    filters.priceRange?.to || 1000,
                                ]}
                                formatOptions={{
                                    style: "currency",
                                    currency: "USD",
                                }}
                                className="max-w px-12"
                                classNames={{
                                    filler: "bg-black",
                                    track: "h-1",
                                    thumb: "w-8 h-8 bg-white after:hidden",
                                }}
                                onChangeEnd={(values) => {
                                    if (Array.isArray(values)) {
                                        onFilterValueChange("priceRange", {
                                            from: values[0],
                                            to: values[1],
                                        });
                                    }
                                }}
                                aria-label="Price range slider"
                            />
                        </div>
                    </div>
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Rating</h3>
                            <p className="text-zinc text-sm">
                                This is not include tax and other fees
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <Button
                                    key={rating}
                                    endContent={
                                        <FontAwesomeIcon icon={faStar} />
                                    }
                                    variant={
                                        filters.ratings?.includes(rating)
                                            ? "solid"
                                            : "bordered"
                                    }
                                    radius="full"
                                    className="border"
                                    disableAnimation
                                    onPress={() => {
                                        if (
                                            filters.ratings &&
                                            filters.ratings.includes(rating)
                                        ) {
                                            onFilterValueChange(
                                                "ratings",
                                                filters.ratings.filter(
                                                    (r) => r !== rating,
                                                ),
                                            );
                                            return;
                                        }

                                        onFilterValueChange("ratings", [
                                            ...(filters.ratings || []),
                                            rating,
                                        ]);
                                    }}
                                >
                                    <span>{rating}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">
                                Supported Brands
                            </h3>
                            <p className="text-zinc text-sm">
                                This is not include tax and other fees
                            </p>
                        </div>
                        <div className="grid gap-3 grid-cols-3">
                            {supportedBrands.map((brand) => (
                                <Button
                                    key={brand}
                                    variant="bordered"
                                    radius="md"
                                    className={clsx(
                                        "py-8",
                                        filters.brands?.includes(brand) &&
                                            "border-black",
                                    )}
                                    disableAnimation
                                    onPress={() => {
                                        if (
                                            filters.brands &&
                                            filters.brands.includes(brand)
                                        ) {
                                            onFilterValueChange(
                                                "brands",
                                                filters.brands.filter(
                                                    (b) => b !== brand,
                                                ),
                                            );
                                            return;
                                        }

                                        onFilterValueChange("brands", [
                                            ...(filters.brands || []),
                                            brand,
                                        ]);
                                    }}
                                >
                                    <span className="font-medium text-medium">
                                        {brand}
                                    </span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">
                                Distances Radius
                            </h3>
                            <p className="text-zinc text-sm">
                                This is not include tax and other fees
                            </p>
                        </div>
                        <ButtonGroup className="flex bg-white" variant="solid">
                            <Button
                                className="grow h-auto py-6"
                                onPress={() => {
                                    if (
                                        filters.distance &&
                                        filters.distance === 1
                                    ) {
                                        onFilterValueChange("distance", 1);
                                        return;
                                    }

                                    onFilterValueChange("distance", undefined);
                                }}
                            >
                                <span className="font-semibold text-lg">
                                    1 Km
                                </span>
                            </Button>
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">
                                    5 Km
                                </span>
                            </Button>
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">
                                    10 Km
                                </span>
                            </Button>
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">
                                    10 Km+
                                </span>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="pb-8">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">
                                Additional Services
                            </h3>
                            <p className="text-zinc text-sm">
                                This is not include tax and other fees
                            </p>
                        </div>
                        <CheckboxGroup
                            onValueChange={(data) => {
                                const hasCafe = data.some(
                                    (v) => v === "hasCafe",
                                );
                                const hasSmokingArea = data.some(
                                    (v) => v === "hasSmokingArea",
                                );

                                onFilterValueChange("additional", {
                                    hasCafe,
                                    hasSmokingArea,
                                });
                            }}
                            value={Object.keys(filters.additional || {}).filter(
                                (key) =>
                                    filters?.additional?.[
                                        key as keyof GarageFilter["additional"]
                                    ],
                            )}
                        >
                            <Checkbox value={"hasCafe"}>
                                Has Cafe to waiting
                            </Checkbox>
                            <Checkbox value={"hasSmokingArea"}>
                                Has smoking area
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                </ModalBody>
                <Divider />
                <ModalFooter className="flex items-center">
                    {Boolean(numberOfSelectedFilter) && (
                        <Button variant="light" onPress={onClearFilterValue}>
                            <p className="font-semibold text-base">Clear all</p>
                        </Button>
                    )}
                    <div className="ml-auto gap-1 flex">
                        <Button variant="light" onPress={onDismiss}>
                            <span>Cancel</span>
                        </Button>
                        <Button
                            className="bg-black text-white"
                            onPress={() => onSave(filters)}
                        >
                            <span className="text-base">Save</span>
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default FilterModal;
