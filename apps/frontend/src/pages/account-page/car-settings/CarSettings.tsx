import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CarCard from "./CarCard";
import { useState } from "react";
import CarTemplateModal from "./CarTemplateModal";
import { getBrands } from "@/api";
import useSWRImmutable from "swr/immutable";
import { PersonalCar } from "@/core/types";

function CarSettings() {
    const [modalType, setModalType] = useState<"edit" | "create">("create");
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );
    const [selectedCar, setSelectedCar] = useState<Partial<PersonalCar>>({
        _id: "1",
        brandId: "65d7904e18cc32995f33ede3",
        memo: "xe thu 1",
        model: "S80 FWD",
        releaseYear: 2022
    })

    const onModalClose = () => {
        setModalOpen(false)
    }

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
                                setModalType("create")
                                setModalOpen(true)
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
                            onSave={(car) => {
                                console.log(car)
                            }}
                            car={selectedCar}
                        />
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <CarCard 
                            car={{
                                memo: "Xe thứ nhất"
                            }}
                            onRemove={() => {
                                // TODO: implement
                            }}
                            onUpdate={() => {
                                // TODO: implement
                                setModalType("edit")
                                setModalOpen(true)
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CarSettings;
