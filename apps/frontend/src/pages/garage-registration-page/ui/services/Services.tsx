import { Button, Tooltip } from "@nextui-org/react";
import RegistrationSection from "../registration-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import ServiceTemplateModal from "./ServiceTemplateModal";
import { useMemo, useState } from "react";
import { brands, getBrandNamesByIds, getServiceNameById } from "./constants";

export type ServiceRegister = {
    id: string;
    serviceId?: string;
    brandIds?: Array<string> | "all";
    lowestPrice: number;
    highestPrice: number;
};

export default function Services() {
    const [isServiceTemplateModalOpen, setServiceTemplateModalOpen] =
        useState<boolean>(false);
    const [services, setServices] = useState<Array<ServiceRegister>>([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
    const [modalActionType, setModalActionType] = useState<"edit" | "create">(
        "create",
    );
    const [editedServiceId, setEditedServiceId] = useState<string | undefined>(
        undefined,
    );
    const editedService = useMemo(
        () =>
            editedServiceId
                ? services.find(({ id }) => id === editedServiceId)
                : undefined,
        [editedServiceId, services],
    );

    const onModalSave = (service: ServiceRegister) => {
        if (modalActionType === "edit") {
            setServices((prev) =>
                prev.map((s) => (s.id === service.id ? service : s)),
            );
            setSelectedServiceIds((prev) => {
                if (service?.serviceId && !prev.includes(service.serviceId)) {
                    return [...prev, service.serviceId];
                }

                return prev;
            });
        } else {
            setServices((prev) => [...prev, service]);
            setSelectedServiceIds((prev) =>
                service?.serviceId ? [...prev, service.serviceId] : prev,
            );
        }

        setServiceTemplateModalOpen(false);
        setEditedServiceId(undefined);
    };

    const onEditServiceButtonPress = (id: string) => {
        setEditedServiceId(id);
        setServiceTemplateModalOpen(true);
        setModalActionType("edit");
    };

    return (
        <>
            <RegistrationSection
                header={
                    <div className="flex justify-between">
                        <span>Services</span>
                        <Button
                            variant="bordered"
                            startContent={<FontAwesomeIcon icon={faPlus} />}
                            onPress={() => {
                                setModalActionType("create");
                                setServiceTemplateModalOpen(true);
                                setEditedServiceId(undefined)
                            }}
                            isDisabled={selectedServiceIds.length === brands.length}
                        >
                            Add Service
                        </Button>
                    </div>
                }
                description="Provide the services your garage will serves"
            >
                {services.map((service) => (
                    <div className="flex items-center mb-3 border rounded-xl p-4" key={service.id}>
                        <div>
                            <h3 className="font-medium">
                                {getServiceNameById(service?.serviceId)}
                            </h3>
                            <p className="text-sm">
                                Supported Brands:{" "}
                                {getBrandNamesByIds(service?.brandIds)}
                            </p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <Tooltip content="Edit">
                                <Button
                                    isIconOnly
                                    radius="full"
                                    variant="bordered"
                                    onPress={() =>
                                        onEditServiceButtonPress(service.id)
                                    }
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                            </Tooltip>
                            <Tooltip content="Remove">
                                <Button
                                    isIconOnly
                                    radius="full"
                                    variant="bordered"
                                    onPress={() => {
                                        setServices(prev => prev.filter(({ id }) => id !== service.id))
                                        setSelectedServiceIds(prev => prev.filter(serviceId => serviceId !== service.serviceId))
                                    }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </RegistrationSection>
            <ServiceTemplateModal
                isOpen={isServiceTemplateModalOpen}
                onModalClose={() => setServiceTemplateModalOpen(false)}
                onModalSave={onModalSave}
                type={modalActionType}
                selectedServiceIds={selectedServiceIds}
                service={editedService}
            />
        </>
    );
}
