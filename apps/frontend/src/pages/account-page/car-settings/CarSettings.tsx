import { useState } from "react";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWRImmutable from "swr/immutable";

import { getBrands } from "@/api";
import { Car, FetchStatus, PersonalCar } from "@/core/types";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import CarCard from "./CarCard";
import CarTemplateModal from "./CarTemplateModal";
import { createCars, removeCar, updateCar } from "@/features/user/user.slice";

function CarSettings() {
    const dispatch = useAppDispatch();
    const cars = useAppSelector((state) => state.user.value?.cars);
    const updateStatus = useAppSelector((state) => state.user.updateStatus);
    const [modalType, setModalType] = useState<"edit" | "create">("create");
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );
    const [selectedCar, setSelectedCar] = useState<Partial<PersonalCar>>({});

    const onModalClose = () => {
        setSelectedCar({});
        setModalOpen(false);
    };

    const onSave = async (car: Partial<Car>) => {
        try {
            if (modalType === "create") {
                await dispatch(createCars(car));
            } else {
                await dispatch(updateCar(car));
            }
        } finally {
            onModalClose()
        } 
    };

    const onRemove = (carId: string) => {
        dispatch(removeCar(carId));
    };

    return (
        <div className="w-full max-w-[1024px] mx-auto px-10 pb-12">
            <div className="pt-12 sticky top-0 bg-white pb-6">
                <Breadcrumbs>
                    <BreadcrumbItem href="/account">Tài khoản</BreadcrumbItem>
                    <BreadcrumbItem>Xe của bạn</BreadcrumbItem>
                </Breadcrumbs>
                <p className="font-bold text-[28px]">Xe của bạn</p>
            </div>
            <div className="w-1/2 flex flex-col gap-6">
                <section>
                    <div className="flex">
                        <div>
                            <h1 className="font-semibold text-large">
                                Danh sách xe đã lưu
                            </h1>
                            <p className="font-medium text-small text-default-500">
                                Xem và lưu trữ các thông tin về xe của bạn
                            </p>
                        </div>
                        <Button
                            variant="bordered"
                            size="sm"
                            startContent={<FontAwesomeIcon icon={faPlus} />}
                            className="ml-auto border"
                            disableRipple
                            onPress={() => {
                                setModalType("create");
                                setModalOpen(true);
                            }}
                        >
                            <span className="font-medium">Thêm xe</span>
                        </Button>
                        <CarTemplateModal
                            onClose={onModalClose}
                            isOpen={isModalOpen}
                            isBrandLoading={isBrandsLoading}
                            brands={brands}
                            type={modalType}
                            onSave={onSave}
                            car={selectedCar}
                            isLoading={updateStatus === FetchStatus.Fetching}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {cars?.map((car) => (
                            <CarCard
                                key={car._id}
                                car={car}
                                onRemove={() => onRemove(car._id)}
                                onUpdate={() => {
                                    setSelectedCar(car);
                                    setModalType("edit");
                                    setModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CarSettings;
