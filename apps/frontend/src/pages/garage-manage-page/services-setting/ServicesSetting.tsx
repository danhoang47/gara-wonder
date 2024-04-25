import {
    addNewService,
    getBrands,
    getCategories,
    getGarageServices,
    updateService,
} from "@/api";
import deleteService from "@/api/garages/deleteService";
import { WithCategoryService } from "@/api/garages/getGarageServices";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { Service } from "@/core/types";
import { notify } from "@/features/toasts/toasts.slice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import ServiceCard from "./ServiceCard";
import ServiceTemplateModal from "./ServiceTemplateModal";

export default function ServicesSetting() {
    const garageId = useAppSelector(state => state.user.value?.garageId)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isServiceTemplateModalOpen, setServiceTemplateModalOpen] =
        useState<boolean>(false);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        [],
    );
    const [serviceList, setServiceList] = useState<WithCategoryService[]>([]);
    const { data: servicesData, mutate: refetch } = useSWRImmutable(
        `service/${garageId}`,
        getGarageServices,
    );
    useEffect(() => {
        if (servicesData) {
            setServiceList(servicesData?.data);
            setSelectedCategoryIds(
                servicesData?.data.map((e) => e.categoryId) as string[],
            );

            // setSelectedCategoryIds()
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
            try {
                updateService(garageId, service._id, service).then((resp) => {
                    if (resp.statusCode === 200) {
                        refetch();
                        dispatch(
                            notify({
                                type: "success",
                                title: `Chỉnh sửa dịch vụ thành công`,
                                description: `Đã xác nhận chỉnh sửa dịch vụ thành công`,
                                delay: 4000,
                            }),
                        );
                        setSelectedCategoryIds((prev) => {
                            if (
                                service?.categoryId &&
                                !prev.includes(service.categoryId)
                            ) {
                                return [...prev, service.categoryId];
                            }

                            return prev;
                        });
                    }
                });
            } catch (error) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Xác nhận thất bại",
                        description: "Một số lỗi xảy ra khi xác nhận",
                        delay: 4000,
                    }),
                );
            }
        } else {
            try {
                addNewService(garageId, service).then((resp) => {
                    if (resp.statusCode === 200) {
                        refetch();
                        dispatch(
                            notify({
                                type: "success",
                                title: `Thêm dịch vụ thành công`,
                                description: `Đã xác nhận thêm dịch vụ thành công`,
                                delay: 4000,
                            }),
                        );
                        setSelectedCategoryIds((prev) =>
                            service?.categoryId
                                ? [...prev, service.categoryId]
                                : prev,
                        );
                    }
                });
            } catch (error) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Xác nhận thất bại",
                        description: "Một số lỗi xảy ra khi xác nhận",
                        delay: 4000,
                    }),
                );
            }
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
        try {
            deleteService(garageId, service?._id).then((resp) => {
                if (resp.statusCode === 200) {
                    refetch();
                    dispatch(
                        notify({
                            type: "success",
                            title: `Xóa dịch vụ thành công`,
                            description: `Đã xác nhận xóa dịch vụ thành công`,
                            delay: 4000,
                        }),
                    );
                    setServiceList(
                        serviceList?.filter(({ _id }) => _id !== service?._id),
                    );
                    setSelectedCategoryIds((prev) =>
                        prev.filter(
                            (serviceId) => serviceId !== service?.categoryId,
                        ),
                    );
                }
            });
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Xác nhận thất bại",
                    description: "Một số lỗi xảy ra khi xác nhận",
                    delay: 4000,
                }),
            );
        }
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
            <div className="absolute flex w-44 gap-4 bottom-[3rem] left-[calc((100%-11rem)/2)]">
                <Button
                    color="primary"
                    className="w-[10rem]"
                    radius="full"
                    onClick={() => {
                        navigate("..");
                    }}
                >
                    Quay lại
                </Button>
            </div>
        </div>
    );
}
