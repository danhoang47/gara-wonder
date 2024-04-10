import { useEffect, lazy, Suspense } from "react";
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { useAppDispatch } from "@/core/hooks";
import { clearFilterValue } from "@/features/garage-filter/filter.slice";

const PriceRangeFilterSection = lazy(() => import("./PriceRangeFilterSection"));
const RatingFilterSection = lazy(() => import("./RatingFilterSection"));
const BrandFilterSection = lazy(() => import("./BrandFilterSection"));
const DistanceFilterSection = lazy(() => import("./DistanceFilterSection"));
const AdditionalServiceFilterSection = lazy(() => import("./AdditionalServiceFilterSection"));

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
    onClear,
}: FilterModalProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isOpen) {
            document.getElementById("root")!.classList.add("overflow-y-hidden")
        } else {
            document.getElementById("root")!.classList.remove("overflow-y-hidden")
        }
    }, [isOpen])

    return (
        <Modal isOpen={isOpen} onOpenChange={onDismiss} size="3xl" classNames={{
            wrapper: "overflow-y-hidden"
        }}>
            <ModalContent className="max-h-[90%]">
                <ModalHeader>
                    <p className="text-base flex-grow">Filter</p>
                </ModalHeader>
                <Divider />
                <ModalBody className="pb-4 overflow-auto">
                    <Suspense>
                        <PriceRangeFilterSection />
                        <RatingFilterSection />
                        <BrandFilterSection />
                        <DistanceFilterSection />
                        <AdditionalServiceFilterSection />
                    </Suspense>
                </ModalBody>
                <Divider />
                <ModalFooter className="flex items-center">
                    <Button
                        variant="light"
                        onPress={() => {
                            dispatch(clearFilterValue());
                            onClear();
                        }}
                    >
                        <p className="font-semibold text-base">Bỏ chọn tất cả</p>
                    </Button>
                    <div className="ml-auto gap-1 flex">
                        <Button variant="light" onPress={onDismiss}>
                            <span>Hủy bỏ</span>
                        </Button>
                        <Button
                            className="bg-black text-white"
                            onPress={onSave}
                        >
                            <span className="text-base">Tìm kiếm</span>
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default FilterModal;
