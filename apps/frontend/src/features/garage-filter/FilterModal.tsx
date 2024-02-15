import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import PriceRangeFilterSection from "./PriceRangeFilterSection";
import RatingFilterSection from "./RatingFilterSection";
import { clearFilterValue } from "@/features/garage-filter/filter.slice";
import { useAppDispatch } from "@/core/hooks";
import BrandFilterSection from "./BrandFilterSection";
import DistanceFilterSection from "./DistanceFilterSection";
import AdditionalServiceFilterSection from "./AdditionalServiceFilterSection";

export type FilterModalProps = {
    isOpen?: boolean;
    onDismiss: () => void;
    onSave: () => void;
    onClear: () => void;
};

function FilterModal({
    isOpen = false,
    onDismiss,
    onSave,
    onClear
}: FilterModalProps) {
    const dispatch = useAppDispatch()

    return (
        <Modal isOpen={isOpen} onOpenChange={onDismiss} size="3xl" scrollBehavior="inside">
            <ModalContent className="max-h-[90%]">
                <ModalHeader>
                    <span className="text-base">Filter</span>
                </ModalHeader>
                <Divider />
                <ModalBody className="pb-4 overflow-auto">
                    <PriceRangeFilterSection />
                    <RatingFilterSection />
                    <BrandFilterSection />
                    <DistanceFilterSection />
                    <AdditionalServiceFilterSection />
                </ModalBody>
                <Divider />
                <ModalFooter className="flex items-center">
                    <Button variant="light" onPress={() => {
                        dispatch(clearFilterValue())
                        onClear()
                    }}>
                            <p className="font-semibold text-base">Clear all</p>
                    </Button>
                    <div className="ml-auto gap-1 flex">
                        <Button variant="light" onPress={onDismiss}>
                            <span>Cancel</span>
                        </Button>
                        <Button
                            className="bg-black text-white"
                            onPress={onSave}
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
