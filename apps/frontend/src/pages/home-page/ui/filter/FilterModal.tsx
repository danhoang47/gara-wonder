import { GarageFilter } from "@/core/types";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import PriceRangeFilterSection from "./PriceRangeFilterSection";
import RatingFilterSection from "./RatingFilterSection";
import { clearFilterValue } from "@/features/filter/filter.slice";
import { useAppDispatch } from "@/core/hooks";
import BrandFilterSection from "./BrandFilterSection";
import DistanceFilterSection from "./DistanceFilterSection";

export type FilterModalProps = {
    filterParams: GarageFilter;
    isOpen?: boolean;
    onDismiss: () => void;
    onSave: (filters: GarageFilter) => void;
};

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
    const dispatch = useAppDispatch()

    const onFilterValueChange = <K extends keyof GarageFilter>(
        key: K,
        value: GarageFilter[K],
    ) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onDismiss} size="3xl">
            <ModalContent>
                <ModalHeader>
                    <span className="text-base">Filter</span>
                </ModalHeader>
                <Divider />
                <ModalBody className="pb-4 overflow-auto sm:max-h-[400px] md:max-h-[428px] lg:max-h-[680px]">
                    <PriceRangeFilterSection />
                    <RatingFilterSection />
                    <BrandFilterSection />
                    <DistanceFilterSection />
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
                    <Button variant="light" onPress={() => dispatch(() => clearFilterValue())}>
                            <p className="font-semibold text-base">Clear all</p>
                    </Button>
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
