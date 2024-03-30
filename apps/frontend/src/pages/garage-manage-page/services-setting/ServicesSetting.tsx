import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ServiceTemplateModal from "./ServiceTemplateModal";
import { useEffect, useMemo, useState } from "react";
import { Service } from "@/core/types";
import ServiceCard from "./ServiceCard";
import useSWR from "swr";
import { getBrands, getCategories, getGarageServices } from "@/api";
import useSWRImmutable from "swr/immutable";
import { useNavigate, useParams } from "react-router-dom";
import { WithCategoryService } from "@/api/garages/getGarageServices";

export default function ServicesSetting() {
    const { garageId } = useParams();
    const navigate = useNavigate();

    const [isServiceTemplateModalOpen, setServiceTemplateModalOpen] =
        useState<boolean>(false);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        [],
    );
    const [serviceList, setServiceList] = useState<WithCategoryService[]>([]);
    const { isLoading, data: servicesData } = useSWRImmutable(
        `service/${garageId}`,
        getGarageServices,
    );
    useEffect(() => {
        if (servicesData) {
            setServiceList(servicesData?.data);
        }
    }, [servicesData]);
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
                ? serviceList?.find(({ _id }) => _id === editedServiceId)
                : undefined,
        [editedServiceId, serviceList],
    );

    const onModalSave = (service: Partial<Service>) => {
        if (modalActionType === "edit") {
            setServiceList(
                serviceList?.map((s) => (s._id === service._id ? service : s)),
            );
            setSelectedCategoryIds((prev) => {
                if (service?.categoryId && !prev.includes(service.categoryId)) {
                    return [...prev, service.categoryId];
                }

                return prev;
            });
        } else {
            setServiceList(serviceList ? [...serviceList, service] : [service]);
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
        setServiceList(serviceList?.filter(({ _id }) => _id !== service?._id));
        setSelectedCategoryIds((prev) =>
            prev.filter((serviceId) => serviceId !== service?.categoryId),
        );
    };

    return (
        <div className=" max-w-[40rem] m-auto pt-10">
            <Breadcrumbs>
                <BreadcrumbItem
                    onClick={() => {
                        navigate("..");
                    }}
                >
                    Chung
                </BreadcrumbItem>
                <BreadcrumbItem className="font-bold">
                    Chỉnh sửa dịch vụ
                </BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex justify-between items-center pt-2">
                <div>
                    <span className="text-2xl font-semibold">Dịch vụ</span>
                    <p className="text-sm text-foreground font-normal">
                        Cung cấp cài đặt chỉnh sửa dịch vụ
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
                        selectedCategoryIds.length === (categories?.length || 0)
                    }
                >
                    Thêm dịch vụ
                </Button>
            </div>
            <div className="pt-4">
                {serviceList?.map((service) => (
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
            </div>
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
            <div className="absolute flex w-44 gap-4 bottom-[5rem] left-[calc((100%-11rem)/2)]">
                <Button
                    variant="light"
                    radius="full"
                    onClick={() => {
                        navigate("..");
                    }}
                >
                    Hủy
                </Button>
                <Button className="" color="primary" radius="full">
                    Lưu
                </Button>
            </div>
        </div>
    );
}
