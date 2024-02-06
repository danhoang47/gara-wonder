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
import { useMemo, useState } from "react";

export type FilterModalProps = {
    isOpen?: boolean;
    onDismiss: () => void;
    onSave: () => void;
};

const supportedBrands = [
    "Mercedes",
    "BMW",
    "Porsche",
    "Toyota",
    "Honda",
    "Lexus"
]

function FilterModal({ isOpen = false, onDismiss, onSave }: FilterModalProps) {
    const [filters, setFilters] = useState<GarageFilter>({});
    const numberOfSelectedFilter = useMemo(
        () => Object.keys(filters).length || undefined,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Object.keys(filters).length],
    );

    const conFilterValueChange = <K extends keyof GarageFilter>(key: K, value: GarageFilter[K]) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onDismiss} size="3xl">
            <ModalContent>
                <ModalHeader>
                    <span className="text-base">Filter</span>
                </ModalHeader>
                <Divider/>
                <ModalBody className="pb-4 overflow-auto sm:max-h-[400px]">
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Price Range</h3>
                            <p className="text-zinc text-sm">This is not include tax and other fees</p>
                        </div>
                        <div className="flex"> 
                            <Slider 
                                step={1} 
                                minValue={0} 
                                maxValue={1000} 
                                defaultValue={[100, 500]} 
                                formatOptions={{style: "currency", currency: "USD"}}
                                className="max-w px-12"
                                classNames={{
                                    filler: "bg-black",
                                    track: "h-1",
                                    thumb: "w-8 h-8 bg-white after:hidden"
                                }}
                                onChangeEnd={(values) => {
                                    if (Array.isArray(values)) {
                                        conFilterValueChange("priceRange", {
                                            from: values[0],
                                            to: values[1]
                                        })
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Rating</h3>
                            <p className="text-zinc text-sm">This is not include tax and other fees</p>
                        </div>
                        <div className="flex gap-3"> 
                            {[1, 2, 3, 4, 5].map(rating => (
                                <Button 
                                    endContent={<FontAwesomeIcon icon={faStar}/>} 
                                    variant="bordered" 
                                    radius="full"
                                    className="border"
                                    disableAnimation
                                >
                                    <span>{rating}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Supported Brands</h3>
                            <p className="text-zinc text-sm">This is not include tax and other fees</p>
                        </div>
                        <div className="grid gap-3 grid-cols-3"> 
                            {supportedBrands.map(brand => (
                                <Button 
                                    variant="bordered" 
                                    radius="md"
                                    className="py-8 border"
                                    disableAnimation
                                >
                                    <span className="font-medium">{brand}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="pb-8 border-b">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Distances Radius</h3>
                            <p className="text-zinc text-sm">This is not include tax and other fees</p>
                        </div>
                        <ButtonGroup className="flex bg-white" variant="solid">
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">1 Km</span>
                            </Button>
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">5 Km</span>
                            </Button>
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">10 Km</span>
                            </Button>
                            <Button className="grow h-auto py-6">
                                <span className="font-semibold text-lg">10+ Km</span>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="pb-8">
                        <div className="mb-5">
                            <h3 className="text-xl font-bold">Additional Services</h3>
                            <p className="text-zinc text-sm">This is not include tax and other fees</p>
                        </div>
                        <CheckboxGroup>
                            <Checkbox value={"cafe"}>
                                Has Cafe to waiting
                            </Checkbox>
                            <Checkbox value={"smokingArea"}>
                                Has smoking area 
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                </ModalBody>
                <Divider />
                <ModalFooter className="flex items-center">
                    {numberOfSelectedFilter && (
                        <p className="font-semibold">
                            {numberOfSelectedFilter} items selected
                        </p>
                    )}
                    <div className="ml-auto gap-1 flex">
                        <Button variant="light" onPress={onDismiss}>
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
