import { GarageFilter } from "@/core/types";
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

export type FilterModalProps = {
    isOpen?: boolean;
    onDismiss: () => void;
    onSave: () => void;
};

function FilterModal({ isOpen = false, onDismiss, onSave }: FilterModalProps) {
    const [filters, setFilters] = useState<GarageFilter>({});
    const numberOfSelectedFilter = useMemo(
        () => Object.keys(filters).length || undefined,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Object.keys(filters).length],
    );

    return (
        <Modal isOpen={isOpen} onOpenChange={onDismiss} size="3xl">
            <ModalContent>
                <ModalHeader>
                    <span>Filter</span>
                </ModalHeader>
                <Divider />
                <ModalBody className="h-96"></ModalBody>
                <Divider />
                <ModalFooter className="flex items-center">
                    {numberOfSelectedFilter && (
                        <p className="font-semibold">
                            {numberOfSelectedFilter} items selected
                        </p>
                    )}
                    <div className="ml-auto">
                        <Button variant="light">
                            <span>Cancel</span>
                        </Button>
                        <Button
                            className="bg-black text-white"
                            onPress={onSave}
                        >
                            <span>Save</span>
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default FilterModal;
