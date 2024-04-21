import { getBasicGarageInfo, getInvitations } from "@/api";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import useSWR from "swr";
import InvitationCard from "./InvitationCard";
import useSWRImmutable from "swr/immutable";
import { useAppSelector, useAuthLoading } from "@/core/hooks";
import { Role } from "@/core/types";

function PersonalBusiness() {
    const { data: invitations, mutate } = useSWR("invitations", getInvitations, {
        revalidateOnFocus: false,
    });
    useAuthLoading(PersonalBusiness.name);
    const user = useAppSelector((state) => state.user.value);
    const { data: result } = useSWRImmutable(
        user?.garageId,
        getBasicGarageInfo,
    );
    const garage = result?.data[0];

    return (
        <div className="w-full max-w-[1024px] mx-auto px-10 pb-12">
            <div className="pt-12 sticky top-0 bg-white pb-6">
                <Breadcrumbs>
                    <BreadcrumbItem href="/account">Tài khoản</BreadcrumbItem>
                    <BreadcrumbItem>Quản lý kinh doanh</BreadcrumbItem>
                </Breadcrumbs>
                <p className="font-bold text-[28px]">Quản lý kinh doanh</p>
            </div>
            <div className="w-1/2 flex flex-col gap-6">
                <section>
                    <div className="flex">
                        <div>
                            <h1 className="font-semibold text-large">
                                Các hộ kinh doanh bạn đang sở hữu
                            </h1>
                            <p className="font-medium text-small text-default-500">
                                Xem và lưu trữ các thông tin về hộ kinh doanh
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {Boolean(garage) && (
                            <div className="w-2/3 flex flex-col gap-2 p-4 rounded-large border">
                                <div className="square">
                                    <div className="">
                                        <img
                                            className="object-cover h-full w-full rounded-medium"
                                            src={garage?.backgroundImage.url}
                                            alt="entity image"
                                        />
                                    </div>
                                </div>
                                <div className="w-full overflow-hidden">
                                    <p className="font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                        {garage?.name}
                                    </p>
                                    <p className="text-small text-default-500 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                        Chức vụ:{" "}
                                        {user?.role === Role.GarageOwner ||
                                        user?.role ===
                                            Role.GarageOwnerAndSupplier
                                            ? "Chủ sở hữu"
                                            : "Nhân viên"}
                                    </p>
                                    <Button
                                        className="w-full border mt-2 hover:bg-danger hover:text-white"
                                        variant="bordered"
                                    >
                                        <span className="font-medium">
                                            Rời Garage
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                <section>
                    <div className="flex">
                        <div>
                            <h1 className="font-semibold text-large">
                                Các đơn đang chờ
                            </h1>
                            <p className="font-medium text-small text-default-500">
                                Tổng hợp các đơn mời được gửi trong thời gian
                                gần đây
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {invitations?.map((invitation) => (
                            <InvitationCard
                                key={invitation._id}
                                invitation={invitation}
                                onActionCompleted={() => mutate()}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PersonalBusiness;
