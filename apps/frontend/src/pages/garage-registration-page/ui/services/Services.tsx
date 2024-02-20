import { Button } from "@nextui-org/react";
import RegistrationSection from "../registration-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServiceTemplateModal from "./ServiceTemplateModal";
import { useMemo, useState } from "react";
import { brands } from "./constants";
import { Service } from "@/core/types";
import ServiceCard from "./ServiceCard";
import { useGarageRegistrationContext } from "../../hooks";

export default function Services() {
    const {
        garageRegistrationState: { services },
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();
    const [isServiceTemplateModalOpen, setServiceTemplateModalOpen] =
        useState<boolean>(false);
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
                ? services?.find(({ _id }) => _id === editedServiceId)
                : undefined,
        [editedServiceId, services],
    );

    const onModalSave = (service: Partial<Service>) => {
        if (modalActionType === "edit") {
            setGarageRegistrationStateValue(
                "services",
                services?.map((s) => (s._id === service._id ? service : s)),
            );
            setSelectedServiceIds((prev) => {
                if (service?.categoryId && !prev.includes(service.categoryId)) {
                    return [...prev, service.categoryId];
                }

                return prev;
            });
        } else {
            setGarageRegistrationStateValue(
                "services",
                services ? [...services, service] : [service],
            );
            setSelectedServiceIds((prev) =>
                service?.categoryId ? [...prev, service.categoryId] : prev,
            );
        }

        setServiceTemplateModalOpen(false);
        setEditedServiceId(undefined);
    };

    const onEditServiceButtonPress = (id: string | undefined) => {
        setEditedServiceId(id);
        setServiceTemplateModalOpen(true);
        setModalActionType("edit");
    };

    const onRemoveServiceButtonPress = (
        service: Partial<Service> | undefined,
    ) => {
        setGarageRegistrationStateValue("services", services?.filter(({ _id }) => _id !== service?._id));
        setSelectedServiceIds((prev) =>
            prev.filter((serviceId) => serviceId !== service?.categoryId),
        );
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
                                setEditedServiceId(undefined);
                            }}
                            isDisabled={
                                selectedServiceIds.length === brands.length
                            }
                        >
                            Add Service
                        </Button>
                    </div>
                }
                description="Provide the services your garage will serves"
            >
                {services?.map((service) => (
                    <ServiceCard
                        key={service._id}
                        service={service}
                        onEditServiceButtonPress={onEditServiceButtonPress}
                        onRemoveServiceButtonPress={onRemoveServiceButtonPress}
                    />
                ))}
            </RegistrationSection>
            <ServiceTemplateModal
                isOpen={isServiceTemplateModalOpen}
                onModalClose={() => setServiceTemplateModalOpen(false)}
                onModalSave={onModalSave}
                type={modalActionType}
                selectedCategoryIds={selectedServiceIds}
                service={editedService}
            />
        </>
    );
}
