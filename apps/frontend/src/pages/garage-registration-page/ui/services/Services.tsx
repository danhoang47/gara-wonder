import { Button } from "@nextui-org/react";
import RegistrationSection from "../registration-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServiceTemplateModal from "./ServiceTemplateModal";
import { useEffect, useMemo, useState } from "react";
import { Service } from "@/core/types";
import ServiceCard from "./ServiceCard";
import { useGarageRegistrationContext } from "../../hooks";
import useSWR from "swr";
import { getBrands, getCategories } from "@/api";

export default function Services() {
    const {
        garageRegistrationState: { services },
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();
    const [isServiceTemplateModalOpen, setServiceTemplateModalOpen] =
        useState<boolean>(false);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        [],
    );
    const [modalActionType, setModalActionType] = useState<"edit" | "create">(
        "create",
    );
    const [editedServiceId, setEditedServiceId] = useState<string | undefined>(
        undefined,
    );
    const { isLoading: isCategoriesLoading, data: categories } = useSWR(
        "category",
        getCategories,
    );
    const { isLoading: isBrandsLoading, data: brands } = useSWR(
        "brands",
        getBrands,
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
            setSelectedCategoryIds((prev) => {
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
            setSelectedCategoryIds((prev) =>
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
        setGarageRegistrationStateValue(
            "services",
            services?.filter(({ _id }) => _id !== service?._id),
        );
        setSelectedCategoryIds((prev) =>
            prev.filter((serviceId) => serviceId !== service?.categoryId),
        );
    };

    useEffect(() => {
        setGarageRegistrationStateValue("services", services?.length ? services : [])
    }, [])

    return (
        <>
            <RegistrationSection
                header={
                    <div className="flex justify-between items-center">
                        <div>
                            <span>Services</span>
                            <p className="text-sm text-foreground font-normal">
                                Provide the services your garage will serves
                            </p>
                        </div>
                        <Button
                            variant="bordered"
                            startContent={<FontAwesomeIcon icon={faPlus} />}
                            className="border"
                            onPress={() => {
                                setModalActionType("create");
                                setServiceTemplateModalOpen(true);
                                setEditedServiceId(undefined);
                            }}
                            isDisabled={
                                selectedCategoryIds.length ===
                                (categories?.length || 0)
                            }
                        >
                            Add Service
                        </Button>
                    </div>
                }
            >
                {services?.map((service) => (
                    <ServiceCard
                        key={service._id}
                        service={service}
                        categoryName={
                            categories?.find(
                                ({ _id }) => service.categoryId === _id,
                            )?.name
                        }
                        supportedBrands={
                            service.brandIds === "all"
                                ? "All"
                                : brands
                                      ?.filter(
                                          ({ _id }) =>
                                              service.brandIds?.includes(_id),
                                      )
                                      .map((brand) => brand.name)
                                      .join(", ")
                        }
                        onEditServiceButtonPress={onEditServiceButtonPress}
                        onRemoveServiceButtonPress={onRemoveServiceButtonPress}
                    />
                ))}
            </RegistrationSection>
            <ServiceTemplateModal
                isOpen={isServiceTemplateModalOpen}
                isCategoriesLoading={isCategoriesLoading}
                categories={categories}
                isBrandsLoading={isBrandsLoading}
                brands={brands}
                onModalClose={() => setServiceTemplateModalOpen(false)}
                onModalSave={onModalSave}
                type={modalActionType}
                selectedCategoryIds={selectedCategoryIds}
                service={editedService}
            />
        </>
    );
}
